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
      raise RowLimitExceededException if spreadsheet.last_row >= 50

      (2..spreadsheet.last_row).each do |i|
        row = Hash[[header, spreadsheet.row(i)].transpose]
        object = @klass.constantize.find_by_id(row["id"]) || @klass.constantize.new
        object.attributes = row.to_hash.slice *@attributes
        object.save
        import_images(object, file_path, row["image_name"]) if image
      end
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
