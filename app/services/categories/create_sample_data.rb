class Categories::CreateSampleData < ApplicationInteraction
  def execute
    i = 0
    3.times do
      Category.find_or_create_by(name_en: "Category #{i}", name_ko: "카테고리 #{i}")
      i = i + 1
    end
  end
end
