class CreateViewedEpisodes < ActiveRecord::Migration
  def change
    create_table :viewed_episodes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :episode, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
