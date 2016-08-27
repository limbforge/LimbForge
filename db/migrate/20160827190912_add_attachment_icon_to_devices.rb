class AddAttachmentIconToDevices < ActiveRecord::Migration
  def self.up
    change_table :devices do |t|
      t.attachment :icon
    end
  end

  def self.down
    remove_attachment :devices, :icon
  end
end
