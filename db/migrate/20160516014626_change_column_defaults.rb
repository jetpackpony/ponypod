class ChangeColumnDefaults < ActiveRecord::Migration
  def change
    change_column_default :podcasts, :title, ""

  end
end
