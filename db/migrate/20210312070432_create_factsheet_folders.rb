class CreateFactsheetFolders < ActiveRecord::Migration[6.1]
  def change
    create_table :factsheet_folders do |t|
      t.string :name
	  t.integer :questionnaire_category_id
      t.timestamps
    end
  end
end
