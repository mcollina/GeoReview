require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'haml'
require 'system_timer'
require 'mongoid'

ROOT = File.dirname(__FILE__)

require ROOT + '/lib/review'

configure do
  Mongoid.configure do |config|
    config.master = Mongo::Connection.new.db("georeview_development")
  end
  Mongoid.autocreate_indexes = true
  Mongoid.logger = Logger.new($stdout)
end

get '/' do
  haml :app
end

post '/review' do
  content_type :json
  review = Review.create(params["review"])
  return { :status => false, :errors => review.errors.to_a}.to_json if review.new?
  { :status => true }.to_json
end

get '/reviews' do
  content_type :json
  reviews = Review.geo_search(params)
  result = { :status => true, :reviews => reviews }
  result.to_json
end
