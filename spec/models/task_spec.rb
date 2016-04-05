require 'rails_helper'

RSpec.describe Task, type: :model do
  before do
    @task = Task.new(attributes_for(:task))
  end

  subject { @task }

  it { should respond_to(:title) }
  it { should respond_to(:isCompleted) }

  describe "#title" do
    it "can't be empty" do
      expect(@task).to be_valid

     @task.title = ''
     expect(@task).not_to be_valid
    end
  end
end
