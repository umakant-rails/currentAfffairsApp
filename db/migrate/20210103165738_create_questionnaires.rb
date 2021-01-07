class CreateQuestionnaires < ActiveRecord::Migration[6.1]
  def change
    create_table :questionnaires do |t|
      t.string :name
      t.integer :questionnaire_category_id

      t.timestamps
    end
  end
end
