class CreateAmputationLevels < ActiveRecord::Migration
  def change
    create_table :amputation_levels do |t|
      t.string :name
      t.string :description

      t.timestamps null: false
    end
  end
end
