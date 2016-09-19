class CreateTerminalDevices < ActiveRecord::Migration
  def change
    create_table :terminal_devices do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
