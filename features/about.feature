@wip
@javascript
Feature: Show About Panel

  Background:
    Given I open the app

  Scenario: Show the mavigex logo
    When I tap the "about" panel
    Then I should see the "mavigex.png" image

  Scenario: Show the Mavigex description
    When I tap the "about" panel
    Then I should see "Mavigex Srl"
