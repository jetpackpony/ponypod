module Features
  def have_podcast(title)
    have_css ".podcast-title", text: title
  end

  def have_episode(title)
    have_css ".episode-title", text: title
  end

  def have_audio_player_for(mp3_path)
    have_css "audio source[src='#{mp3_path}']"
  end

  def have_logged_in_user(username)
    have_css ".nav-item", text: "Hi, #{username}"
  end

  def click_subscribe(podcast_title=nil)
    if podcast_title
      find("[data-podcast='#{podcast_title}'] a.subscribe").click
    else
      find("a.subscribe").click
    end
  end

  def click_unsubscribe(podcast_title=nil)
    if podcast_title
      find("[data-podcast='#{podcast_title}'] a.unsubscribe").click
    else
      find("a.unsubscribe").click
    end
  end

  def have_user_subscribed_to(podcast_title)
    have_css "[data-podcast='#{podcast_title}'] a.unsubscribe"
  end

  def display_viewed_episode(episode_title)
    have_css "[data-episode='#{episode_title}'] a.mark-as-new"
  end

  def display_new_episode(episode_title)
    have_css "[data-episode='#{episode_title}'] a.mark-as-viewed"
  end

  def have_viewed_episode(episode_title)
    have_css ".viewed-episodes [data-episode='#{episode_title}']"
  end

  def have_new_episode(episode_title)
    have_css ".new-episodes [data-episode='#{episode_title}']"
  end

  def have_notification(text)
    have_css ".alert", text: text
  end

  def have_error_message(text)
    have_css ".alert", text: text
  end

  def login_button
    find(login_button_css)
  end

  def have_login_button
    have_css login_button_css
  end

  def logout_button
    find("a", text: "Logout")
  end

  def login_button_css
    ".google-login"
  end
end
