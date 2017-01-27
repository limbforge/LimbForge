class AddInfoToComponents < ActiveRecord::Migration
  def change
    add_column :components, :type, :string
    add_column :components, :description, :string
  end
end
