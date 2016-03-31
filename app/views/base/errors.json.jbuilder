json.errors(@errors) do |error|
  @errors[error].map do |message|
    json.field error
    json.message message
  end
end