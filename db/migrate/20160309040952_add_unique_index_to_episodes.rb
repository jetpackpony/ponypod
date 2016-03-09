class AddUniqueIndexToEpisodes < ActiveRecord::Migration
  def change
    add_index :episodes, :guid, :unique => true
  end
end
