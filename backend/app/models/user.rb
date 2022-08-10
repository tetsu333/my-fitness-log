class User < ApplicationRecord
  has_secure_password

  has_many :exercises, dependent: :destroy

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?[\d])[a-z\d]+\z/i

  with_options presence: true do
    validates :name
    validates :email
    validates :password_digest
  end
  with_options uniqueness: true  do
    validates :name
    validates :email
  end
  validates :name, length: { maximum: 20 }
  validates :email, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX, message: "を正しく入力してください" }
  validates :password, length: { minimum: 8 }, format: { with: VALID_PASSWORD_REGEX, message: "は半角英数を両方含む必要があります"}
end
