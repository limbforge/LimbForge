class ComponentType < ActiveRecord::Base
  has_and_belongs_to_many :component
end
