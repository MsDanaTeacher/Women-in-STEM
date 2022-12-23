class Woman < ApplicationRecord
    has_many :my_collections
    has_many :users, through: :my_collections
end
