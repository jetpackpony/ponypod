require 'uri'
require 'cgi'
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "selectors"))

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

Given /I click on "(.*?)"/ do |link|
    click_link(link)
end

Then /^(?:|I )should see "([^\"]*)"$/ do |text|
	expect(page).to have_content(text)
end

Then /^(?:|I )should see \/([^\/]*)\/$/ do |regexp|
  regexp = Regexp.new(regexp)
  expect(page).to have_xpath('//*', :text => regexp)
end

Then /^(?:|I )should not see "([^\"]*)"$/ do |text|
	expect(page).to have_no_content(text)
end

Then /^(?:|I )should not see \/([^\/]*)\/$/ do |regexp|
  regexp = Regexp.new(regexp)
  expect(page).to have_no_xpath('//*', :text => regexp)
end

Then /I should see the audio player for "(.*?)"/ do |arg1|
  expect(page).to have_xpath("//audio[@src = '#{arg1}']")
end

When(/^(?:|I )add a podcast "(.*?)" with rss link "(.*?)"$/) do |title, rss_link|
  fill_in(:podcast_title, :with => title)
  fill_in(:podcast_rss_link, :with => rss_link)
  click_button("Save")
end

Then(/^I should be on (.*?)$/) do |page_name|
  expect(URI.parse(current_url).path).to eq(path_to(page_name))
end
