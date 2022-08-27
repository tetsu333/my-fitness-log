class Exercise < ApplicationRecord
  has_many :repetitions, dependent: :destroy
  belongs_to :user

  enum exercise_type: { chest: 0, back: 1, leg: 2, shoulder: 3, arm: 4, abdominal: 5 }

  validates :user_id, numericality: true
  validates :name, presence: true, length: { maximum: 30 }, uniqueness: {scope: [:user_id, :exercise_type], message: "は既に追加されています"}
end
