Feature: User can add a podcast to the database
  As an administrator
  In order for users to be able to follow a podcast
  I want to be able to add a podcast to the database

Scenario: Successfully add a podcast
  Given I am on the new podcast page
  When I add a podcast "Cortex" with rss link "https://www.relay.fm/cortex/feed"
  Then I should be on the podcast page for "Cortex"
