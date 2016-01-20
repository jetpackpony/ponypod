Feature: User can list all episodes of the podcast
  As a user
  So I can find the podcast episode I want to listen to
  I want to see the list of all the episodes in a podcast

Background: Podcasts have been added to the database
  Given the following podcasts exist:
  | title          |  
  | Hello Internet |  
  And the following episodes exist:
  | title                       | podcast        |  
  | 2 Dudes Talking             | Hello Internet |  
  | Star Wars Christmas Special | Hello Internet |  

Scenario: See the list of episodes
  Given I am on a podcast page for "Hello Internet"
  Then I should see "2 Dudes Talking"
  And I should see "Star Wars Christmas Special"
