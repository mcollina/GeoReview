task :build do
  %w{blue green gray red yellow}.each do |color|
    FileUtils.cd(File.join(File.dirname(__FILE__), "public", "mobi", "resources", "scss")) do
      sh("COLOR=#{color} compass compile;")
    end
  end
end
