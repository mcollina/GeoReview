require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'haml'

get '/' do
  haml :app
end
