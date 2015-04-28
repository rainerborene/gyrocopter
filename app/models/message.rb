module Messenger
  module Models
    class Message < Sequel::Model
      unrestrict_primary_key

      def after_save
        db.notify :messages, payload: to_json(except: :created_at)
      end
    end
  end
end
