class CategoryService
  def create_sample_data
    i = 0
    3.times do
      Category.create(name_en: "Category #{i}", name_ko: "카테고리 #{i}")
      i = i + 1
    end
  end
end
