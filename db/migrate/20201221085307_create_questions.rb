class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.text :question
      t.string :option1
      t.string :option2
      t.string :option3
      t.string :option4
      t.string :answer
      t.text :keypoints
      t.text :facts
      t.string :state_id
      t.integer :question_category_id

      t.timestamps
    end
  end
end
