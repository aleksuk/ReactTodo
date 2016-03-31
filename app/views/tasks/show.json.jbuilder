json.task do
  json.extract! @task, :id, :title, :isCompleted
end
