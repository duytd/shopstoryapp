class AddTransformedContentToTemplates < ActiveRecord::Migration[4.2]
  def change
    add_column :templates, :transformed_content, :text
  end
end
