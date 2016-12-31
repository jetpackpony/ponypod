class AddDurationToEpisodes < ActiveRecord::Migration[5.0]
  def change
    add_column :episodes, :duration, :integer
  end
end
