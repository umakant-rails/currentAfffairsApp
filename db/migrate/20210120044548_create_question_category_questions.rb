class CreateQuestionCategoryQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :question_category_questions do |t|
      t.integer :question_id
      t.integer :question_category_id
      t.timestamps
    end
  end
end
