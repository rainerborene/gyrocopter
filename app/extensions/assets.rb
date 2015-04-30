require 'sprockets'
require 'bourbon'

module GyroCopter
  module Extensions
    module Assets extend self
      def registered(app)
        app.set :assets, assets = ::Sprockets::Environment.new(app.settings.root)

        assets.append_path 'app/assets/images'
        assets.append_path 'app/assets/javascripts'
        assets.append_path 'app/assets/stylesheets'
        assets.append_path 'app/assets/templates'

        assets.append_path 'vendor/assets/javascripts'
        assets.append_path 'vendor/assets/stylesheets'
        assets.append_path 'vendor/assets/images'

        app.configure :development do
          assets.cache = Sprockets::Cache::FileStore.new('./tmp')
        end

        app.get '/assets/*' do
          env['PATH_INFO'].sub!(%r{^/assets}, '')
          settings.assets.call(env)
        end
      end
    end
  end
end
