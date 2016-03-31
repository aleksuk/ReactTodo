json.tasks(@tasks) do |task|
  json.extract! task, :id, :title, :isCompleted, :todo_id
end