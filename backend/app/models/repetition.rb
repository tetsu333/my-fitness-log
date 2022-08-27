class Repetition < ApplicationRecord
  belongs_to :user
  belongs_to :exercise

  with_options numericality: true do
    validates :user_id
    validates :exercise_id
  end

  with_options numericality: {greater_than_or_equal_to: 0} do
    validates :repetition_num
    validates :weight
  end
  validates :exercise_date, presence: true
end
