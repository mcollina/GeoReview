require File.join(File.dirname(__FILE__), 'application')

if (ENV['RACK_ENV'] || :development).to_sym == :production
  FileUtils.mkdir_p 'log' unless File.exists?('log')
  log = File.new("log/sinatra.log", "a+")
  $stdout.reopen(log)
  $stderr.reopen(log)
end

run Sinatra::Application
