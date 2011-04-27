Feature: Show Hello World

  Scenario: Show Hello World
    When I go to the home page
    Then I should see "Hello world!"
    
  @javascript
  Scenario: Show Hello World in Javascript
    When I go to the home page
    Then I should see "Hello world with javascript"
