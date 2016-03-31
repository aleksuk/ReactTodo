require 'rails_helper'

RSpec.describe Todo, type: :model do
  before do 
    @todo = Todo.new(attributes_for(:todo))
  end
  
  subject { @todo }
  
  it { should respond_to(:title) }
end
