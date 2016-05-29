module OmniauthMacros
  def mock_auth_hash(username='mockuser')
    # The mock_auth configuration allows you to set per-provider (or default)
    # authentication hashes to return during integration testing.
    OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
      'provider' => 'google',
      'uid' => '123545',
      'info' => {
        'name' => username
      },
      'credentials' => {
        'token' => 'mock_token',
        'secret' => 'mock_secret'
      }
    })
  end

  def mock_invalid_credentials
    OmniAuth.config.mock_auth[:google] = :invalid_credentials
  end

  def silence_omniauth
    previous_logger = OmniAuth.config.logger
    OmniAuth.config.logger = Logger.new("/dev/null")
    yield
  ensure
    OmniAuth.config.logger = previous_logger
  end
end
