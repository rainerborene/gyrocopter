require 'bundler/setup'
Bundler.require

require './lib/realtime'

module Chat
  class App < Sinatra::Base
    set :sprockets, Sprockets::Environment.new(root)

    use Chat::Realtime

    configure do
      sprockets.append_path 'static/templates'
      sprockets.append_path 'static/javascripts'
      sprockets.append_path 'static/stylesheets'
      sprockets.append_path 'static/images'

      sprockets.append_path 'vendor/javascripts'
      sprockets.append_path 'vendor/stylesheets'
      sprockets.append_path 'vendor/images'

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
