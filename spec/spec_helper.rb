require 'rubygems'
require 'bundler'
Bundler.setup(:default, :test)
require 'rspec'
require 'rack/test'

require File.join(File.dirname(__FILE__), '../application')

# set test environment
Sinatra::Base.set :environment, :test
Sinatra::Base.set :run, false
Sinatra::Base.set :raise_errors, true
Sinatra::Base.set :logging, false

Mongoid.configure do |config|
  config.master = Mongo::Connection.new.db("georeview_test")
  config.persist_in_safe_mode = true
end

Rspec.configure do |config|
  # reset database before each example is run
  
  mongo_setup = lambda do
    Mongoid.database.collections.select { |c| c.name !~ /system/ }.each(&:drop)
  end
  
  config.before :all, &mongo_setup
  config.before :each, &mongo_setup
end
