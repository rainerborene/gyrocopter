require 'faye/websocket'
require 'thread'

Faye::WebSocket.load_adapter('thin')

module GyroCopter
  module Extensions
    class WebSocket
      def initialize(app)
        @app = app
        @clients = []
        @database = GyroCopter::App.database
        @mutex = Mutex.new
        @threaded = false
      end

      def setup_listener
        @mutex.synchronize do
          return if @threaded
          Thread.new do
            @threaded = true
            @database.listen :messages, loop: true do |_, _, payload|
              @clients.each {|ws| ws.send(payload) }
            end
            @threaded = false
          end
        end
      end

      def call(env)
        return @app.call(env) unless Faye::WebSocket.websocket?(env)

        setup_listener

        ws = Faye::WebSocket.new(env, nil, { ping: 15 })
        ws.on :open do |event|
          p [:open, ws.object_id]
          @clients << ws
        end

        ws.on :message do |event|
          p [:message, event.data]
          data = JSON.parse event.data, symbolize_names: true
          Message.create({
            id: data[:id],
            body: data[:body],
            author: data[:author],
            published_at: data[:published_at]
          })
        end

        ws.on :close do |event|
          p [:close, event.code, event.reason]
          @clients.delete(ws)
          ws = nil
       end

        ws.rack_response
      end
    end
  end
end
