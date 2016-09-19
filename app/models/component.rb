class Component < ActiveRecord::Base
  has_and_belongs_to_many :measurements
  has_and_belongs_to_many :amputation_levels
  has_and_belongs_to_many :terminal_devices
  has_and_belongs_to_many :component_types
  has_and_belongs_to_many :options
  has_attached_file :icon, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }
  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :icon, :content_type => /\Aimage\/.*\Z/
end
