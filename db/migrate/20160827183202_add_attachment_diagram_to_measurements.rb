class AddAttachmentDiagramToMeasurements < ActiveRecord::Migration
  def self.up
    change_table :measurements do |t|
      t.attachment :diagram
    end
  end

  def self.down
    remove_attachment :measurements, :diagram
  end
end
