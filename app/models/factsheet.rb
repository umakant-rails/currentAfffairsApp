class Factsheet < ApplicationRecord
  validates :title, :description, presence: true
  belongs_to :factsheet_folder, optional: :true
  belongs_to :user
end
