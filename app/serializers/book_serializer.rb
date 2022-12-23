class BookSerializer < ActiveModel::Serializer
  attributes :id, :book_image, :purchase, :title, :author
end
