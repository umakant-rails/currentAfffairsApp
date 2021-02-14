class Questionnaire < ApplicationRecord
  validates :questionnaire_category_id, :name, presence: true
  belongs_to :questionnaire_category
  has_many :questions
  #has_many :questionnaire_questions
  #has_many :questions, through: :questionnaire_questions

end
