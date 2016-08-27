json.extract! device, :id, :name, :icon, :orientations, :created_at, :updated_at
json.url device_url(device, format: :json)