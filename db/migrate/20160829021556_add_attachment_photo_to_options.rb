class AddAttachmentPhotoToOptions < ActiveRecord::Migration
  def self.up
    change_table :options do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :options, :photo
  end
end
