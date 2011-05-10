class Review

  include Mongoid::Document
   
  field :name, :type => String
  field :stars, :type => Integer
  field :comment, :type => String
  
  validates_inclusion_of :stars, :in => (1..5).to_a, :message => "%{value}must be between 1 and 5."
  validates_length_of :name, :minimum => 1
  validates_length_of :comment, :minimum => 1
  
end
