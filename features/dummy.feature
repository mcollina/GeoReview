Feature: Show Hello World

  @javascript
  Scenario: Show Hello World in Javascript
    When I go to the home page
    Then I should see "Hello world with javascript"
