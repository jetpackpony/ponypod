class RenameDescriptionOfEpisodes < ActiveRecord::Migration
  def change
    rename_column :episodes, :description, :full_description
    add_column :episodes, :summary, :text
  end
end
