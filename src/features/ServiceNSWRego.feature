@serviceNSW
Feature: Service NSW vehicle registration check
  @regoCheck
  Scenario Outline: Checking registration for invalid plate numbers
    Given I open the Service NSW homepage
    When I click the Check Rego link
    And I click the Check Online button
    And I enter "<plateNumber>" as the plate number
    And I select the terms and conditions checkbox
    And I click the Check registration button
    Then I should see an "<error>" message

    Examples:
      | plateNumber | error                        |
      | ABC123      | No vehicles found for ABC123 |