class Todo < ActiveRecord::Base
  has_many :tasks, dependent: :destroy
  
  validates :title, length: { in: 1..200 }
end
