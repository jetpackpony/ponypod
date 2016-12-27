class CreateEpisodes < ActiveRecord::Migration[5.0]
  def change
    create_table :episodes do |t|
      t.string     "title", default: ""
      t.references :podcast, index: true, foreign_key: true
      t.string     "mp3_link", default: ""
      t.string     "guid", default: ""
      t.text       "full_description", default: ""
      t.text       "summary", default: ""
      t.datetime   "published_at"

      t.timestamps null: false
    end
    add_index :episodes, :guid, :unique => true
  end
end
