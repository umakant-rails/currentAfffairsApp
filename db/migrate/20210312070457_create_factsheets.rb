class CreateFactsheets < ActiveRecord::Migration[6.1]
  def change
    create_table :factsheets do |t|
      t.string :title
      t.text :description
      t.integer :factsheet_folder_id
      t.integer :user_id
      t.timestamps
    end
  end
end
