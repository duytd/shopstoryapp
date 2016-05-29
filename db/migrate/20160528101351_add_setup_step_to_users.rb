class AddSetupStepToUsers < ActiveRecord::Migration
  def change
    add_column :users, :setup_step, :integer, index: true, default: 0
  end
end
