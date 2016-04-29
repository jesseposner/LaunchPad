class Offering < ActiveRecord::Base
  belongs_to :company

  has_many :investments
end
