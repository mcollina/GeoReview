require File.join(File.dirname(__FILE__), 'spec_helper')

describe Sinatra::Application do
  include Rack::Test::Methods
  
  def app
    Sinatra::Application
  end
  
  context "GET /" do
    
    it "should be succesful" do
      get '/'
      last_response.should be_ok
    end
    
  end
  
  context "POST /review" do
  
    let(:review) { double('Review', :new? => false, :errors => {}) }
  
    def do_request(params = { :review => { :name => 'Tod', :stars => 5, :comment => 'Hi' } })
      post '/review', params
    end
    
    before :each do
      Review.stub(:create).and_return(review)
    end
    
    it "should be succesful" do
      do_request
      last_response.should be_ok
    end
    
    it "should return a valid json" do
      do_request
      last_response.content_type.should == 'application/json'
    end
    
    it "should return a json with status true" do
      do_request
      JSON.parse(last_response.body)["status"].should == true
    end
    
    it "should return a json with status false if there are errors" do
      review.stub(:new?).and_return(true)
      do_request({})
      JSON.parse(last_response.body)["status"].should == false
    end
    
    it "should return a json with errors if there are errors" do
      review.stub(:new?).and_return(true)
      review.stub_chain(:errors, :to_a).and_return(["hello", "world"])
      do_request({})
      JSON.parse(last_response.body)["errors"].should == ["hello", "world"]
    end
    
    it "should create a Review" do
      Review.should_receive(:create).with({ 'lat' => "44.5", 'lng' => "11.6", 'stars' => "3", 'name' => 'Fred', 'comment' => 'Very nice place'}).and_return(review)
      do_request :review => { :lat => 44.5, :lng => 11.6, :stars => 3, :name => 'Fred', :comment => 'Very nice place'}
    end
    
  end
  
end
