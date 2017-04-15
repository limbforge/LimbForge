class AddHassAccessToUsers < ActiveRecord::Migration
  def change
    add_column :users, :has_access, :boolean, default: false
  end
end
