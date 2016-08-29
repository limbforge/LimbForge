class AddAttachmentIconToComponents < ActiveRecord::Migration
  def self.up
    change_table :components do |t|
      t.attachment :icon
    end
  end

  def self.down
    remove_attachment :components, :icon
  end
end
