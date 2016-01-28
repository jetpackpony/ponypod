
# Populate the podcasts table
Given /the following podcasts exist/ do |podcasts_table|
	podcasts_table.hashes.each do |podcast|
		Podcast.create! podcast
	end
end

# Populate the episodes table
Given /the following episodes exist/ do |episodes_table|
	episodes_table.hashes.each do |episode|
		episode[:podcast] = Podcast.find_by_title episode[:podcast]
		Episode.create! episode
	end
end

Given /^(?:|I )am on (.+)$/ do |page_name|
  visit path_to(page_name)
end

When /^(?:|I )go to (.+)$/ do |page_name|
  visit path_to(page_name)
end

Given /I click on "(.*?)"/ do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then /I should see "(.*?)"/ do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then /I should not see "(.*?)"/ do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then /I should see the audio player for "(.*?)"/ do |arg1|
  pending # express the regexp above with the code you wish you had
end
