Feature: User can list all episodes of the podcast
  As a user
  So I can find the podcast episode I want to listen to
  I want to see the list of all the episodes in a podcast

Background: Podcasts have been added to the database
  Given the following podcasts exist:
  | title                 |  
  | Hello Internet        |  
  | Stuff You Should Know |  
  And the following episodes exist:
  | title                       | podcast               | mp3_link             |  
  | 2 Dudes Talking             | Hello Internet        | http://google.com/1/ |  
  | Star Wars Christmas Special | Hello Internet        | http://google.com/2/ |  
  | How puberty works           | Stuff You Should Know | http://google.com/3/ |  
  | How blind rabbits work      | Stuff You Should Know | http://google.com/4/ |  

Scenario: See the list of episodes for Hello Internet
  Given I am on the PonyPod home page
  And I click on "Hello Internet"
  Then I should see "2 Dudes Talking"
  And I should see "Star Wars Christmas Special"
  And I should not see "How puberty works"
  And I should not see "How blind rabbits work"

Scenario: See the list of episodes for Stuff You Should Know
  Given I am on the PonyPod home page
  And I click on "Stuff You Should Know"
  Then I should see "How puberty works"
  And I should see "How blind rabbits work"
  And I should not see "2 Dudes Talking"
  And I should not see "Star Wars Christmas Special"