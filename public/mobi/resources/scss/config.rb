# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, '..', '..', 'themes_source')

color = ENV["COLOR"] || "gray"

# Compass configurations
sass_path = dir
css_path = File.join(dir, "..", "css", color)

# Require any additional compass plugins here.
images_dir = File.join(dir, "..", "img")
# output_style = :compressed
# environment = :production

module VarAccessor
  Sass::Script::Functions.send :include, self
  def self.variables
    @variables ||= {}
  end

  def self.set(values = {})
    variables.merge! values
  end

  def string_variable(value)
    Sass::Script::String.new(VarAccessor.variables[:"#{value}"].to_s)
  end

  def color_variable(value)
    value = VarAccessor.variables[value.to_s.to_sym]
    scanned = value.scan(/^#(..?)(..?)(..?)$/).first
    if scanned
      value = scanned.map {|num| num.ljust(2, num).to_i(16)} 
      Sass::Script::Color.new(value)
    else
      raise "No such color: #{value}" unless Sass::Script::Color::HTML4_COLORS[value]
      Sass::Script::Color.new(Sass::Script::Color::HTML4_COLORS[value])
    end
  end
end

VarAccessor.set(:basecolor => color)
