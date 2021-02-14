class CreateQuestionnaireQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questionnaire_questions do |t|
      t.integer :question_id
      t.integer :questionnaire_id
      t.timestamps
    end
  end
end
