class CreateMeasurements < ActiveRecord::Migration
  def change
    create_table :measurements do |t|
      t.string :name
      t.float :step
      t.string :measurement_unit
      t.string :diagram
      t.float :lower_range
      t.float :upper_range
      t.float :default
      t.string :instructions

      t.timestamps null: false
    end
  end
end
