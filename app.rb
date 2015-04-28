require 'bundler/setup'

# Setup load paths
$: << File.expand_path('../', __FILE__)
$: << File.expand_path('../lib', __FILE__)

require 'sinatra/sequel'
require 'logger'

require 'app/extensions'
require 'app/models'

module Messenger
  class App < Sinatra::Application
    configure do
      disable :method_override
      disable :static

      set :root, __dir__
      set :views, 'app/views'
      set :erb, escape_html: true
      set :protection, except: :session_hijacking
      set :database, lambda {
        ENV['DATABASE_URL'] || "postgres://postgres@localhost:5432/messenger_#{environment}"
      }

      database.loggers << Logger.new(STDOUT)
    end

    use Messenger::Extensions::WebSocket

    register Messenger::Extensions::Assets

    get '/' do
      erb :index
    end
  end
end

# To easily access models in the console
include Messenger::Models
