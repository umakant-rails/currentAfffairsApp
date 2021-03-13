class QuestionnaireCategory < ApplicationRecord
  has_many :questionnaire
  has_many :factsheet_folders
end
