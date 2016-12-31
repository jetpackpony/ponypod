class AddSummaryToPodcasts < ActiveRecord::Migration[5.0]
  def change
    add_column :podcasts, :summary, :text
  end
end
