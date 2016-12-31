source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.1'
# Use sqlite3 as the database for Active Record
gem 'pg'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

# Use feedjira for RSS parsing
gem 'feedjira'

# Use sanitize gem for cleaning up HTML in the models
gem "sanitize"
gem "htmlentities"

# Use active model serializer to serialize
gem 'active_model_serializers'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  # Use rspec for testing
  gem 'rspec-rails', '>= 3.5.0'
  # Use Factory Girl for generating random test data
  gem 'factory_girl_rails'
  # Use assigns for testing controllers
  gem 'rails-controller-testing'
  # Use dotenv to load environment variables
  gem 'dotenv-rails'
end

group :development do
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Stub http requests for tests
  gem 'webmock'
end

ruby "2.2.3"
