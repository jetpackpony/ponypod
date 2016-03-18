class AddIndexToSubscriptions < ActiveRecord::Migration
  def change
    add_index :subscriptions, [:user_id, :podcast_id], unique: true
  end
end
