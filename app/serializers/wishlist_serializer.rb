class WishlistSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id
  belongs_to :book
end
