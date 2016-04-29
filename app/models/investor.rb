class Investor < ActiveRecord::Base
  belongs_to :user
  belongs_to :company

  has_many :investments
end
