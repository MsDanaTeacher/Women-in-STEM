class KnowSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :know, :my_collection_id
  belongs_to :my_collection
end
