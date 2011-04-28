Given /^I open the app$/ do
  visit "/"
end

When /^I tap the "([^"]*)" panel$/ do |arg1|
  # TODO
end

Then /^I should see the "([^"]*)" image$/ do |image|
  page.should have_xpath("//img[contains(@src, \"#{image}\")]")
end
