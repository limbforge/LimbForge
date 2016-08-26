class CreateDevicesMeasurementsJoinTable < ActiveRecord::Migration
  def self.up
      create_table :devices_measurements, :id => false do |t|
        t.integer :device_id
        t.integer :measurement_id
      end

      add_index :devices_measurements, [:device_id, :measurement_id]
    end

    def self.down
      drop_table :devices_measurements
    end
end
