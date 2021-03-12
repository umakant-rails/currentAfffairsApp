class FactsheetFolder < ApplicationRecord
  has_many :factsheets
  scope :without_factsheet, -> { left_outer_joins(:factsheet).where(factsheet: { id: nil }) }
end
