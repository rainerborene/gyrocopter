require 'bundler/setup'

# Setup load paths
$: << File.expand_path('../', __FILE__)
$: << File.expand_path('../lib', __FILE__)

require 'sinatra/sequel'
require 'logger'

require 'app/extensions'
require 'app/models'

module GyroCopter
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

      set :sessions,
        httponly: true,
        secure: production?,
        expire_after: 86400, # 1 day
        secret: ENV['SESSION_SECRET']
    end

    configure :development do
      database.loggers << Logger.new(STDOUT)
    end

    use Extensions::WebSocket

    register Extensions::Assets

    get '/' do
      @messages = Message.all
      erb :index
    end
  end
end

# To easily access models in the console
include GyroCopter::Models
