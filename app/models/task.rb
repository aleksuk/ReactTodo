class Task < ActiveRecord::Base
  belongs_to :todo

  validates :title, length: { in: 1..200 }

  # before_create :set_default_values
  #
  # private
  #   def set_default_values
  #     self.isCompleted = false
  #   end
end
