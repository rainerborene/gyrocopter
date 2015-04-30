Sequel.database_timezone = :utc

Sequel::Model.raise_on_save_failure = false
Sequel::Model.plugin :json_serializer
Sequel::Model.plugin :timestamps

module GyroCopter
  module Models
    autoload :Message, 'app/models/message'
  end
end
