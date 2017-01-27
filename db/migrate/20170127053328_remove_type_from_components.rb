class RemoveTypeFromComponents < ActiveRecord::Migration
  def change
    remove_column :components, :type
    add_column :components, :component_type, :string
  end
end
