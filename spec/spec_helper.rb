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
end

Rspec.configure do |config|
  # reset database before each example is run
  
  config.before :all do
    Mongoid.database.collections.each(&:drop)
  end
 
  config.after :all do
    Mongoid.database.collections.each(&:drop)
  end
end
