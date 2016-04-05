class TasksController < ApplicationController

  before_action :find_task, only: [:show, :update, :destroy]

  def index
    @tasks = Todo.find(params[:todo_id]).tasks.all
  end

  def destroy
    @task.destroy
    render json: {}
  end

  def update
    if @task.update(task_params)
      render :show
    else
      @errors = @task.errors
      render 'base/errors', status: 400
    end
  end

  def create
    @task = Todo.find(params[:todo_id]).tasks.new(task_params)

    if @task.save
      render :show
    else
      @errors = @task.errors
      render 'base/errors', status: 400
    end
  end

  private
    def find_task
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task)
        .permit(
          :title,
          :isCompleted
        )
    end

end
