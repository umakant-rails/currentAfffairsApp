class Questionnaire < ApplicationRecord
  validates :questionnaire_category_id, :name, presence: true
  belongs_to :questionnaire_category
  belongs_to :user
  #has_many :questions
  has_many :questionnaire_questions, :dependent => :destroy
  has_many :questions, through: :questionnaire_questions

end
