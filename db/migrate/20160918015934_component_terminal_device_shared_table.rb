class ComponentTerminalDeviceSharedTable < ActiveRecord::Migration
  def self.up
    create_table :components_terminal_devices, :id => false do |t|
      t.integer :component_id
      t.integer :terminal_device_id
    end

    add_index :components_terminal_devices, [:component_id, :terminal_device_id], unique: true, name: 'components_terminal_devices_unique'
  end

  def self.down
    drop_table :components_terminal_devices
    remove_index :components_terminal_devices, name: 'components_terminal_devices_unique'
  end
end
