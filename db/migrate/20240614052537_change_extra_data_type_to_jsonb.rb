class ChangeExtraDataTypeToJsonb < ActiveRecord::Migration[5.2]
  def change
    change_column :payments, :extra_data, :jsonb, using: 'extra_data::text::jsonb'
  end
end
