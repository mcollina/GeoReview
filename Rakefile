task :build do
  { "blue" => "#0066CC", "red" => "#990000", "gray" => "#ccc", "yellow" => "#FFCC00", "green" => "#009900"}.each do |name, color|
    FileUtils.cd(File.join(File.dirname(__FILE__), "public", "mobi", "resources", "scss")) do
      sh("COLOR=#{color} NAME=#{name} compass compile;")
    end
  end
end
