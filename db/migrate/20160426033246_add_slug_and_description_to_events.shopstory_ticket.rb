class AddSlugAndDescriptionToEvents < ActiveRecord::Migration
  def change
    add_column :shopstory_ticket_events, :slug, :string
    add_column :shopstory_ticket_events, :description, :text
  end
end
