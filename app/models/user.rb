class User < ActiveRecord::Base
  validates :email,
            :password_digest,
            :session_token,
            :name,
            :street_address,
            :city,
            :state,
            :zip,
            presence: true
            
  validates :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true

  has_many :investments
  has_many :foundings

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

	def ensure_session_token
		self.session_token ||= SecureRandom.urlsafe_base64
	end
end
