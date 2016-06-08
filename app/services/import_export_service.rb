class InvalidExtensionException < StandardError
end

class RowLimitExceededException < StandardError
end

class SpreadSheetNotFoundException < StandardError
end

class ImportExportService
  def initialize params
    @klass = params[:klass]
    @attributes = params[:attributes]
  end

  def import file
    extension = File.extname(file.original_filename)

    case extension
    when ".csv", ".xlsx"
      import_spreadsheet file.path, extension, false
    when ".zip"
      import_zip file
    else
      raise InvalidExtensionException
    end
  end

  def export
    CSV.generate do |csv|
      csv << @attributes

      @klass.constantize.order(created_at: :desc).each do |object|
        csv << @attributes.map{ |attr| object.send(attr) }
      end
    end
  end

  private
  def import_zip file
    spreadsheet = nil

    Zip::File.open(file.path) do |zip_file|
      zip_file.each do |f|
        f_path = File.join("#{Rails.root}/tmp/product_import/#{Time.current}/", f.name)
        spreadsheet = f_path if [".csv", "xlsx"].include?(File.extname(f.name))
        FileUtils.mkdir_p(File.dirname(f_path))
        zip_file.extract(f, f_path) unless File.exist?(f_path)
      end
    end

    import_spreadsheet spreadsheet, File.extname(spreadsheet), true
    FileUtils.rm_rf Dir.glob(File.dirname(spreadsheet))
  end

  def import_spreadsheet file_path, extension, image=false
    raise SpreadSheetNotFoundException if file_path.nil?
    raise InvalidExtensionException unless [".csv", ".xlsx"].include?(extension)

    spreadsheet = (extension == ".csv") ? Roo::CSV.new(file_path) : Roo::Excelx.new(file_path)

    unless spreadsheet.nil?
      header = spreadsheet.row 1
      raise RowLimitExceededException if spreadsheet.last_row >= Settings.import.row_limit

      (2..spreadsheet.last_row).each do |i|
        row = Hash[[header, spreadsheet.row(i)].transpose]
        object = find_object(row) || @klass.constantize.new
        object.attributes = row.to_hash.slice *@attributes

        if object.save
          import_associations object, {file_path: file_path, row: row}
        end
      end
    end
  end

  def find_object row
    case @klass
    when "Product"
      Product.find_by_id(row["id"]) || Product.with_translations(:en).where("product_translations.name = #{ActiveRecord::Base.connection.quote(row['name_en'])}").first
    else
      nil
    end
  end

  def import_associations object, options={}
    case @klass
    when "Product"
      import_images(object, options[:file_path], options[:row]["image"]) if options[:row]["image"]
      import_categories(object, options[:row]["categories"]) if options[:row]["categories"]
    else
      nil
    end
  end

  def import_categories object, category_names
    category_names = category_names.split ", "

    category_names.each do |name|
      category = Category.with_translations(:en).where("category_translations.name = #{ActiveRecord::Base.connection.quote(name)}").first
      category = Category.create(name_en: name, name_ko: name) if category.nil?
      object.category_products.create category_id: category.id
    end
  end

  def import_images object, file_path, image_name
    file_path = File.join "#{File.dirname(file_path)}", "images/#{image_name}"

    if File.exist?(file_path)
      case object.class.name
      when "Product"
        import_product_images object, file_path
      end
    end
  end

  def import_product_images product, image_path
    product.product_images.create image: File.new(image_path), featured: true
  end
end
