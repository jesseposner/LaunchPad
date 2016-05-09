class Investment < ActiveRecord::Base
  belongs_to :user
  belongs_to :offering
  has_one :company, through: :offering
end
