require 'securerandom'

class User < ActiveRecord::Base
  has_secure_password

  validates :login, presence: true, uniqueness: { case_sensitive: false }

  def authenticate_by_token(token)
    user = User.find_by(token: token)

    if user && user.token_expires_at > Time.now
      return user
    end
  end

  def update_token
    self.token = SecureRandom.hex(30)
    self.token_expires_at = 1.week.from_now
  end

  def credentials
    attributes.slice(:token, :token_expires_at)
  end

  def as_json(options = {})
    to_builder.attributes!
  end

  def to_builder
    Jbuilder.new do |json|
      json.extract! self, :id, :login
    end
  end

  def errors_json(options={})
    result = {}
    return result if errors.empty?

    attributes.keys.reject { |a| a == "id"}.each do |attr|
      result[attr.camelize(:lower)] = errors[attr] unless errors[attr].blank?
    end

    result
  end
end
