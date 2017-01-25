class AddMetaDataToComponents < ActiveRecord::Migration
  def change
    add_column :components, :creator, :string
    add_column :components, :uses, :string
    add_column :components, :print_time, :string
  end
end
