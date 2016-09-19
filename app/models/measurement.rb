class Measurement < ActiveRecord::Base
  has_and_belongs_to_many :components
  has_attached_file :diagram, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :diagram, :content_type => /\Aimage\/.*\Z/
end
