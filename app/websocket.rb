require 'faye/websocket'

Faye::WebSocket.load_adapter('thin')

module Messenger
  class WebSocket
    def initialize(app)
      @app = app
      @clients = []
    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        ws = Faye::WebSocket.new(env, nil, { ping: 15 })
        ws.on :open do |event|
          p [:open, ws.object_id]
          @clients << ws
        end

        ws.on :message do |event|
          p [:message, event.data]
          @clients.each {|client| client.send(event.data) }
        end

        ws.on :close do |event|
          p [:close, event.code, event.reason]
          @clients.delete(ws)
          ws = nil
        end

        ws.rack_response
      else
        @app.call(env)
      end
    end
  end
end
