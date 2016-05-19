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

end