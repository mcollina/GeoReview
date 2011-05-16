class Review

  include Mongoid::Document
   
  field :name, :type => String
  field :stars, :type => Integer
  field :comment, :type => String
  field :location, :type => Array
  
  index [[ :location, Mongo::GEO2D ]], :min => -180, :max => 180
  
  validates_inclusion_of :stars, :in => (1..5).to_a, :message => "%{value}must be between 1 and 5."
  validates_length_of :name, :minimum => 1
  validates_length_of :comment, :minimum => 1
  validate :location_validation
  
  def location_validation
    return errors.add(:location, "must be an array") unless location.respond_to? :to_ary
    self.location = location.to_ary
    errors.add(:location, "must be an array of two element") unless location.size == 2
    errors.add(:location, "must be an array of floats") if location.inject(false) do |acc, i|
      acc or not ( (i.kind_of? Numeric) or i =~ /\d+(?:\.\d+)?/ )
    end
  end
  
  def location=(value)
    value = [$1.to_f, $2.to_f] if value =~ /(\d+.\d+);(\d+.\d+)/
    super(value)
  end

  def self.geo_search(params)
    lat = (params["lat"] || params[:lat]).to_f
    lng = (params["lng"] || params[:lng]).to_f
    radius = (params["radius"] || params[:radius]).to_f
    self.where(:location.within => { "$center" => [ [ lat, lng ], radius ] })
  end
end
