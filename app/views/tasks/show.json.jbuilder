json.task do
  json.extract! @task, :id, :title, :isCompleted, :todo_id
end
