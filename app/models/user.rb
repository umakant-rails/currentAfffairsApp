class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :questionnaires
  has_many :questions
  has_many :factsheet_folders
  has_many :factsheets

  def is_super_admin
    self.role_id == 1
  end
end
