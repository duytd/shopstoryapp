class AddSetupStepToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :setup_step, :integer, index: true, default: 0
  end
end
