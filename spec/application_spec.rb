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
  
  context "POST /reviews" do
  
    let(:review) { double('Review', :new? => false, :errors => {}) }
  
    def do_request(params = { :review => { :name => 'Tod', :stars => 5, :comment => 'Hi' } })
      post '/reviews', params
    end
    
    before :each do
      Review.stub(:create).and_return(review)
    end
    
    it "should be successful" do
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
  
  context "GET /reviews" do
    
    def do_request(params = {})
      get '/reviews', params
    end
    
    before :each do
      Review.stub(:geo_search).and_return([])
    end
    
    it "should be successful" do
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
    
    it "should call Review.geo_search" do
      Review.should_receive(:geo_search).with('lat' => "44.5", 'lng' => "11.6", 'radius' => "#{1/7.0}").and_return([])
      do_request(:lat => 44.5, :lng => 11.6, :radius => 1/7.0)
    end
    
    it "should return a json with one location review" do
      review = double('review', :name => 'Tod', :stars => 3, :comment => 'Cool review',
            :location => [44.5145, 11.6213])
      Review.stub(:geo_search).and_return([ review ])
      do_request
      JSON.parse(last_response.body)["reviews"].should == [ 
        { 'lat' => 44.5145, 'lng' => 11.6213, 'total' => 1, 
          'items' => [ 'name' => 'Tod', 'stars' => 3, 'comment' => 'Cool review' ] 
        } ]
    end
    
    it "should return a json with two location review" do
      review = double('review', :name => 'Tod', :stars => 3, :comment => 'Cool review', 
                      'location' => [44.5145, 11.6213] )
      review2 = double('review', :name => 'Frank', :stars => 2, :comment => 'Funny app', 
                      'location' => [43.5145, 12.6213] )
      Review.stub(:geo_search).and_return([ review, review2 ])
      do_request(:lat => 44.5, :lng => 11.6, :radius => 1/7.0)
      JSON.parse(last_response.body)["reviews"].should include( 
        { 'lat' => 44.5145, 'lng' => 11.6213, 'total' => 1, 
          'items' => [ 'name' => 'Tod', 'stars' => 3, 'comment' => 'Cool review' ] 
        }) 
      JSON.parse(last_response.body)["reviews"].should include( 
        { 'lat' => 43.5145, 'lng' => 12.6213, 'total' => 1, 
          'items' => [ 'name' => 'Frank', 'stars' => 2, 'comment' => 'Funny app' ] 
        })
    end
    
    it "should return a json with one location review and two comments" do
      review = double('review', :name => 'Tod', :stars => 3, :comment => 'Cool review', 
                      'location' => [44.5145, 11.6213] )
      review2 = double('review', :name => 'Frank', :stars => 2, :comment => 'Funny app', 
                      'location' => [44.5145, 11.6213] )
      Review.stub(:geo_search).and_return([ review, review2])
      do_request(:lat => 44.5, :lng => 11.6, :radius => 1/7.0)
      JSON.parse(last_response.body)["reviews"].should == [ 
        { 'lat' => 44.5145, 'lng' => 11.6213, 'total' => 2, 
          'items' => [ { 'name' => 'Tod', 'stars' => 3, 'comment' => 'Cool review' }, 
                       { 'name' => 'Frank', 'stars' => 2, 'comment' => 'Funny app'} ] 
        } ]
    end
  end
end
