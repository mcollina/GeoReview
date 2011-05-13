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
  reviews_hash = reviews.inject({}) do |hash, value|
    hash[value.location] ||= { :lat => value.location[0], :lng => value.location[1], :total => 0, :items => [] }
    hash[value.location][:total] += 1
    hash[value.location][:items] << { :name => value.name, :stars => value.stars, :comment => value.comment }
    hash
  end
  { :status => true, :reviews => reviews_hash.values }.to_json
end
