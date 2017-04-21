class AddRequestToUser < ActiveRecord::Migration
  def change
    add_column :users, :access_requested, :boolean, default: true
  end
end
