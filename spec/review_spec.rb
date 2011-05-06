require File.join(File.dirname(__FILE__), 'spec_helper')

describe Review do
  
  subject { Review.new }
  
  it { should respond_to(:name) }
  
  
end
