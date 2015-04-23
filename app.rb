require 'bundler/setup'
require 'sinatra/base'
require 'sprockets'
require 'bourbon'

class Chat < Sinatra::Base
  set :sprockets, Sprockets::Environment.new(root)

  configure do
    sprockets.append_path 'static/javascripts'
    sprockets.append_path 'static/stylesheets'
    sprockets.append_path 'static/images'
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
