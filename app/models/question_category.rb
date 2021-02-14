class QuestionCategory < ApplicationRecord
  has_many :questions
  #has_many :question_category_questions
  #has_many :questions, through: :question_category_questions
end
