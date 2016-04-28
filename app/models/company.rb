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
end