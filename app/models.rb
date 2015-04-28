Sequel::Model.plugin :json_serializer
Sequel::Model.plugin :timestamps

module Messenger
  module Models
    autoload :Message, 'app/models/message'
  end
end
