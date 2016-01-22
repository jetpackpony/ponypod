class CreateEpisodes < ActiveRecord::Migration
  def change
    create_table :episodes do |t|
      t.string :title
      t.references :podcast, index: true, foreign_key: true
      t.string :mp3_link

      t.timestamps null: false
    end
  end
end
