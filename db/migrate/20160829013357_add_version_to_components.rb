class AddVersionToComponents < ActiveRecord::Migration
  def change
    add_column :components, :version, :float
  end
end
