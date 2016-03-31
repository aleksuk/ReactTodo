require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  before do
    @todo = create(:todo)
  end
  
  after do 
    @todo.destroy!
  end
    
  describe "GET #index" do 
    before do 
      5.times { create(:task, todo_id: @todo.id) }
    end
    
    it "should return list of todos" do 
      get :index, format: :json, todo_id: @todo.id
      
      expect(response).to be_success
    end
  end
  
  describe "POST #create" do
    it "should return success status after success creating record" do 
      post :create, format: :json, todo_id: @todo.id, task: attributes_for(:task)
      
      expect(response).to be_success
      expect(response).to render_template(:show)
    end
    
    it "should create new record" do
      expect(@todo.tasks.count).to be(0)
      
      post :create, format: :json, todo_id: @todo.id, task: attributes_for(:task)
      
      expect(@todo.tasks.count).to be(1)
    end
    
    it "should return 400 status for model with invalid attributes" do 
      post :create, format: :json, todo_id: @todo.id, task: attributes_for(:task, title: nil)
      
      expect(response).to have_http_status(400)
      expect(response).to render_template('base/errors')
    end
    
    it "shouldn't create new record for model with invalid attributes" do 
      expect(@todo.tasks.count).to be(0)
      
      post :create, format: :json, todo_id: @todo.id, task: attributes_for(:task, title: nil)
      
      expect(@todo.tasks.count).to be(0)
    end
  end
  
  describe "GET #show" do 
    before do
      @task = create(:task, todo_id: @todo.id)
    end
    
    it "should return success response" do
      get :show, format: :json, todo_id: @todo.id, id: @task.id
      
      expect(response).to be_success
      expect(response).to render_template(:show)
    end
  end
  
  describe "PUT #update" do 
    before do
      @task = create(:task, todo_id: @todo.id)
    end
    
    it "should return success response after success update" do 
      put :update, format: :json, todo_id: @todo.id,  id: @task.id, task: attributes_for(:task, title: 'some new titile')
      
      expect(response).to be_success
      expect(response).to render_template(:show)
    end
    
    it "should update record" do
      new_title = 'some new titile'
      put :update, format: :json, todo_id: @todo.id,  id: @task.id, task: attributes_for(:task, title: new_title)
      
      @task.reload
      expect(@task.title).to eq(new_title)
    end
    
    it "should return 400 status for models with invalid attributes" do 
      put :update, format: :json, todo_id: @todo.id,  id: @task.id, task: attributes_for(:task, title: nil)
      
      expect(response).to have_http_status(400)
      expect(response).to render_template('base/errors')
    end
    
    it "shouldn't update record for model with invalid attributes" do 
      put :update, format: :json, todo_id: @todo.id,  id: @task.id, task: attributes_for(:task, title: nil)
      
      @task.reload
      expect(@todo.title).not_to be(nil)
    end
  end
  
  describe "DELETE #destroy" do 
    before do 
      @task = create(:task, todo_id: @todo.id)
    end
    
    it "should return success response after destroying record" do
      delete :destroy, todo_id: @todo.id, id: @task.id
      
      expect(response).to be_success
    end
    
    it "should destroy record" do
      expect(@todo.tasks.count).to be(1)
      
      delete :destroy, todo_id: @todo.id, id: @todo.id
      
      expect(@todo.tasks.count).to be(0)
    end
  end
end
