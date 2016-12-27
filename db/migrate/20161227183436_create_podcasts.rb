class CreatePodcasts < ActiveRecord::Migration[5.0]
  def change
    create_table :podcasts do |t|
      t.string :title
      t.string :rss_link
      t.text :description
      t.string :image

      t.timestamps null: false
    end
    add_index :podcasts, :rss_link, :unique => true
  end
end
