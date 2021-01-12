class Questionnaire < ApplicationRecord
  validates :questionnaire_category_id, :name, presence: true
  has_many :questions
  belongs_to :questionnaire_category
end
