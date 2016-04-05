require 'rails_helper'

RSpec.describe Todo, type: :model do
  before do
    @todo = Todo.new(attributes_for(:todo))
  end

  subject { @todo }

  it { should respond_to(:title) }

  it "should save with valid attributes" do
    @todo.save!

    expect(@todo).to be_valid
  end

  describe "#title" do
    it "can't be empty" do
      expect(@todo).to be_valid

     @todo.title = ''
     expect(@todo).not_to be_valid
    end
  end

end
