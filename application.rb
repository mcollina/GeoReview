require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'haml'
require 'system_timer'
require 'mongoid'

ROOT = File.dirname(__FILE__)

require ROOT + '/lib/review'

configure do
  Mongoid.load!(ROOT + "/config/mongoid.yml")
  Mongoid.logger = Logger.new($stdout)
end

get '/' do
  haml :app
end

post '/review' do
  content_type :json
  Review.create(params["review"])
  { :status => true }.to_json
end
