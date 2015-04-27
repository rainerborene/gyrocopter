require 'bundler/setup'
Bundler.require

require './app/websocket'

module Messenger
  class App < Sinatra::Base
    set :sprockets, Sprockets::Environment.new(root)
    set :views, 'app/views'

    use Messenger::WebSocket

    configure do
      sprockets.append_path 'app/assets/templates'
      sprockets.append_path 'app/assets/javascripts'
      sprockets.append_path 'app/assets/stylesheets'
      sprockets.append_path 'app/assets/images'

      sprockets.append_path 'vendor/assets/javascripts'
      sprockets.append_path 'vendor/assets/stylesheets'
      sprockets.append_path 'vendor/assets/images'

      sprockets.cache = Sprockets::Cache::FileStore.new('./tmp')
    end

    get '/' do
      erb :index
    end

    get '/assets/*' do
      env['PATH_INFO'].sub!(%r{^/assets}, '')
      settings.sprockets.call(env)
    end
  end
end
