# Load DSL and Setup Up Stages
require "capistrano/setup"
require "capistrano/deploy"

require "capistrano/rails"
require "capistrano/bundler"
require "capistrano/rvm"
require "capistrano/puma"
require "capistrano/puma/nginx"
require "capistrano/linked_files"

# Loads custom tasks from `lib/capistrano/tasks" if you have any defined.
Dir.glob("lib/capistrano/tasks/*.cap").each { |r| import r }
Dir.glob("lib/capistrano/**/*.rb").each { |r| import r }
