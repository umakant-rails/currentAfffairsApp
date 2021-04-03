class Question < ApplicationRecord
  validates :question, :option1, :option2, :option3, :option4, :answer, :scrapping_datum_id, presence: true
  belongs_to :scrapping_datum
  #belongs_to :questionnaire, optional: true
  belongs_to :question_category, optional: true

  has_many  :question_category_questions, :dependent => :destroy
  has_many  :question_categories, through: :question_category_questions
  accepts_nested_attributes_for :question_category_questions, allow_destroy: true
  
  has_many :questionnaire_questions
  has_many :questionnaires, through: :questionnaire_questions
  
end
