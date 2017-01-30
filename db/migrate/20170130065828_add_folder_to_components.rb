class AddFolderToComponents < ActiveRecord::Migration
  def change
    add_column :components, :folder, :string
  end
end
