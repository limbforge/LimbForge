class ComponentAndMeasurementSharedTable < ActiveRecord::Migration
  def self.up
      create_table :components_measurements, :id => false do |t|
        t.integer :component_id
        t.integer :measurement_id
      end

      add_index :components_measurements, [:component_id, :measurement_id], unique: true, name: 'components_measurements_unique'
    end

    def self.down
      drop_table :components_measurements
      remove_index :components_measurements, name: 'components_measurements_unique'
    end
end
