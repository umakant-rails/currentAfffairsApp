class FactsheetFolder < ApplicationRecord
  has_many :factsheets
  belongs_to :questionnaire_category
  belongs_to :user
  
  scope :without_factsheet, -> { left_outer_joins(:factsheets).where(factsheets: { id: nil }) }
end
