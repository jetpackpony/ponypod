Feature: User can listen to an episode streaming
  As a user
  So I can do mindless work an not feel like my life was wasted
  I want to be able to play an episode of my favorite podcast

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

Scenario: See the audio tag on an episode page
  Given I am on the PonyPod home page
  And I click on "Hello Internet"
  And I click on "2 Dudes Talking"
  Then I should see "2 Dudes Talking"
  And I should see the audio player for "http://google.com/1/"

Scenario: See the audio tag on an episode page
  Given I am on the PonyPod home page
  And I click on "Stuff You Should Know"
  And I click on "How puberty works"
  Then I should see "How puberty works"
  And I should see the audio player for "http://google.com/3/"
