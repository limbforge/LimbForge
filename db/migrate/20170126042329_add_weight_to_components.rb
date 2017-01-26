class AddWeightToComponents < ActiveRecord::Migration
  def change
    add_column :components, :weight, :string
  end
end
