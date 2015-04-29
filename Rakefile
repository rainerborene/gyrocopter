task :app do
  require './app'
end

namespace :db do
  desc "Run DB migrations"
  task migrate: :app do
    require 'sequel/extensions/migration'
    Sequel::Migrator.apply(Messenger::App.database, 'db/migrations')
  end

  desc 'Drop the database'
  task drop: :app do
    database = Messenger::App.database
    database.tables.each do |table|
      database.run("DROP TABLE #{table} CASCADE")
    end
  end
end
