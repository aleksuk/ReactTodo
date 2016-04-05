class TodosController < ApplicationController

  before_action :find_todo, only: [:show, :update, :destroy]

  def index
    @todos = Todo.all
  end

  def destroy
    @todo.destroy
    render json: {}
  end

  def update
    if @todo.update(todo_params)
      render :show
    else
      @errors = @todo.errors
      render 'base/errors', status: 400
    end
  end

  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render :show
    else
      @errors = @todo.errors
      render 'base/errors', status: 400
    end
  end

  private
    def find_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo)
        .permit(:title)
    end
end
