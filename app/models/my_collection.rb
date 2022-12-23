class MyCollection < ApplicationRecord
    belongs_to :user
    has_many :knows
    has_many :wonders
    has_many :learns
    belongs_to :woman

    validates :woman_id, uniqueness: {scope: :user_id}
end
