class AddTransformedContentToTemplates < ActiveRecord::Migration
  def change
    add_column :templates, :transformed_content, :text
  end
end
