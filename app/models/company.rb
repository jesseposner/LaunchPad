class Company < ActiveRecord::Base
  validates :name,
            :street_address,
            :city,
            :state,
            :zip,
            :media_url,
            :description,
            :business_plan,
            presence: true
  validates :name, uniqueness: true

  has_many :foundings
  has_many :founders, through: :foundings, source: :user
  has_many :investments, through: :offerings
  has_many :investors, through: :investments, source: :user
  has_many :offerings
end
