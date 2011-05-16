task :build do
  ["config.rb", "blu.rb"].each do |file|
    FileUtils.cd(File.join(File.dirname(__FILE__), "public", "mobi", "resources", "scss")) do
      sh("compass compile --force -c #{file}")
    end
  end
end
