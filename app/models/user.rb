require 'bcrypt'
class User < ApplicationRecord
    has_many :my_collections
    has_many :wishlists
    has_many :books, through: :wishlists
    has_many :knows, through: :my_collections
    has_many :wonders, through: :my_collections
    has_many :learns, through: :my_collections
    has_many :women, through: :my_collections

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
