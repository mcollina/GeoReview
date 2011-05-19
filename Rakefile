task :build do
  [ ["blue","#0066CC"] , ["red","#990000"], ["gray","#ccc"], ["yellow","#FFCC00"], ["green","#009900"]].each do |color|
    FileUtils.cd(File.join(File.dirname(__FILE__), "public", "mobi", "resources", "scss")) do
      sh("COLOR=#{color[1]} NAME=#{color[0]} compass compile;")
    end
  end
end
