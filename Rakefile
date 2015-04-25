namespace :assets do
  desc "Download JavaScript dependencies"
  task :dependencies do
    Dir.chdir('vendor/javascripts')

    javascripts = [
      'http://code.jquery.com/jquery-2.1.3.js',
      'http://underscorejs.org/underscore.js',
      'http://backbonejs.org/backbone.js',
      'http://marionettejs.com/downloads/backbone.marionette.js',
      'https://raw.githubusercontent.com/Dogfalo/materialize/master/dist/js/materialize.js',
      'https://raw.githubusercontent.com/rmm5t/jquery-timeago/master/jquery.timeago.js'
    ]

    javascripts.each {|url| system("curl #{url} -O") }
  end
end
