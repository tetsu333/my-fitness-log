class User < ApplicationRecord
  has_secure_password
  with_options presence: true do
    validates :name
    validates :email
    validates :password_digest
  end
  with_options length: { maximum: 255 }  do
    validates :name
    validates :email
    validates :password_digest
  end
  with_options uniqueness: true  do
    validates :name
    validates :email
  end
  validates :email, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
end
