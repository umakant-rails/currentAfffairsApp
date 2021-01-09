class Questionnaire < ApplicationRecord
  validates :questionnaire_category_id, :name, presence: true
end
