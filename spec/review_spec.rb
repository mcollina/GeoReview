require File.join(File.dirname(__FILE__), 'spec_helper')

describe Review do
  
  let(:valid_attributes) { { :name => 'Ted', :stars => 2, :comment => 'Cool app', :location => [44.23,11.6] } }
  subject { Review.new(valid_attributes) }
  
  it { should respond_to(:name) }
  it { should respond_to(:name=) }
  
  it { should respond_to(:stars) }
  it { should respond_to(:stars=) }

  it { should respond_to(:comment) }
  it { should respond_to(:comment=) }
  
  it { should respond_to(:location) }
  it { should respond_to(:location=) }
  
  it { should be_valid }
  
  it "should not be valid if it has no name" do
    subject.name = nil
    subject.should_not be_valid
  end
  
  it "should not be valid if the name is empty" do
    subject.name = ''
    subject.should_not be_valid
  end
  
  it "should not be valid if it has no stars" do
    subject.stars = nil
    subject.should_not be_valid
  end

  it "should not be valid if stars is lesser than 1" do
    subject.stars = 0
    subject.should_not be_valid
  end
  
  it "should not be valid if stars is greater than 5" do
    subject.stars = 6
    subject.should_not be_valid
  end
  
  it "should not be valid if it has no comment" do
    subject.comment = nil
    subject.should_not be_valid
  end
  
  it "should not be valid if the comment is empty" do
    subject.comment = ''
    subject.should_not be_valid
  end
  
  it "should not be valid if it has no location" do
    subject.location = nil
    subject.should_not be_valid
  end
  
  it "should not be valid if it's an empty array" do
    subject.location = []
    subject.should_not be_valid
  end
  
  it "should not be valid if it's a one element array" do
    subject.location = [44.23]
    subject.should_not be_valid
  end
  
  it "should not be valid if it's a three or more element array" do
    subject.location = [44.23, 5.2, 6.5]
    subject.should_not be_valid
  end
  
  it "should not be valid if it's a two element array of strings" do
    subject.location = ["a", "b"]
    subject.should_not be_valid
  end
  
  it "should be valid if it's a two element array of floats" do
    subject.location = ["11.405576475640828", "11.405576475640828"]
    subject.should be_valid
  end
  
  it "should parse a formatted location stirng" do
    subject.location = "11.4055;11.4055764"
    subject.location.should == [11.4055, 11.4055764]
  end
  
  it "should create succesfully" do
    Review.create(valid_attributes)
  end
end
