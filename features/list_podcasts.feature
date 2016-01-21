Feature: User can list all the podcasts
  As a user
  So I can listen to my favorite podcasts
  I want to see the list of all the podcasts

Background: Podcasts have been added to the database
  Given the following podcasts exist:
  | title                 |  
  | Hello Internet        |  
  | Stuff You Should Know |  

Scenario: See the list of podcasts
  Given I am on the PonyPod home page
  Then I should see "Hello Internet"
  And I should see "Stuff You Should Know"
