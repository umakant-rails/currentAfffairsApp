class Question < ApplicationRecord
  validates :question, :option1, :option2, :option3, :option4, :answer, :scrapping_datum_id, presence: true
  belongs_to :scrapping_datum
  belongs_to :questionnaire
end
