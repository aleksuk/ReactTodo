require 'rails_helper'

RSpec.describe Task, type: :model do
  before do 
    @task = Task.new(attributes_for(:task))
  end
  
  subject { @task }
  
  it { should respond_to(:title) }
  it { should respond_to(:isCompleted) }
end
