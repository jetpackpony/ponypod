class AddGuidToEpisode < ActiveRecord::Migration
  def change
    add_column :episodes, :guid, :string
  end
end
