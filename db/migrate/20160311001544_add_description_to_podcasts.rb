class AddDescriptionToPodcasts < ActiveRecord::Migration
  def change
    add_column :podcasts, :description, :text
  end
end
