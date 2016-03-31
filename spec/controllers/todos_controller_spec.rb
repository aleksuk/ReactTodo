require 'rails_helper'

RSpec.describe TodosController, type: :controller do 
  after do 
    Todo.destroy_all
  end
    
  describe "GET #index" do 
    before do 
      5.times { create(:todo) }
    end
    
    it "should return list of todos" do 
      get :index, format: :json
      
      expect(response).to be_success
    end
  end
  
  describe "POST #create" do
    it "should return success status after success creating record" do 
      post :create, format: :json, todo: attributes_for(:todo)
      
      expect(response).to be_success
      expect(response).to render_template(:show)
    end
    
    it "should create new record" do
      expect(Todo.count).to be(0)
      
      post :create, format: :json, todo: attributes_for(:todo)
      
      expect(Todo.count).to be(1)
    end
    
    it "should return 400 status for model with invalid attributes" do 
      post :create, format: :json, todo: attributes_for(:todo, title: nil)
      
      expect(response).to have_http_status(400)
      expect(response).to render_template('base/errors')
    end
    
    it "shouldn't create new record for model with invalid attributes" do 
      expect(Todo.count).to be(0)
      
      post :create, format: :json, todo: attributes_for(:todo, title: nil)
      
      expect(Todo.count).to be(0)
    end
  end
  
  describe "GET #show" do 
    before do
      @todo = create(:todo)
    end
    
    it "should return success response" do
      get :show, format: :json, id: @todo.id
      
      expect(response).to be_success
      expect(response).to render_template(:show)
    end
  end
  
  describe "PUT #update" do 
    before do 
      @todo = create(:todo)
    end
    
    it "should return success response after success update" do 
      put :update, format: :json,  id: @todo.id, todo: attributes_for(:todo, title: 'some new titile')
      
      expect(response).to be_success
      expect(response).to render_template(:show)
    end
    
    it "should update record" do
      new_title = 'some new titile'
      put :update, format: :json,  id: @todo.id, todo: attributes_for(:todo, title: new_title)
      
      @todo.reload
      expect(@todo.title).to eq(new_title)
    end
    
    it "should return 400 status for models with invalid attributes" do 
      put :update, format: :json,  id: @todo.id, todo: attributes_for(:todo, title: nil)
      
      expect(response).to have_http_status(400)
      expect(response).to render_template('base/errors')
    end
    
    it "shouldn't update record for model with invalid attributes" do 
      put :update, format: :json,  id: @todo.id, todo: attributes_for(:todo, title: nil)
      
      @todo.reload
      expect(@todo.title).not_to be(nil)
    end
  end
  
  describe "DELETE #destroy" do 
    before do 
      @todo = create(:todo)
    end
    
    it "should return success response after destroying record" do
      delete :destroy, id: @todo.id
      
      expect(response).to be_success
    end
    
    it "should destroy record" do
      expect(Todo.count).to be(1)
      
      delete :destroy, id: @todo.id
      
      expect(Todo.count).to be(0)
    end
  end
end
