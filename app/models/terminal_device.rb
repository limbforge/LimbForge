class TerminalDevice < ActiveRecord::Base
  has_and_belongs_to_many :components
end
