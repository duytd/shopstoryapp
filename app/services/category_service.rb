class CategoryService
  def create_sample_data
    i = 0
    categories = []
    3.times do
      categories << Category.new(name_en: "Category #{i}", name_ko: "카테고리 #{i}")
      i = i + 1
    end

    Category.import categories
  end
end
