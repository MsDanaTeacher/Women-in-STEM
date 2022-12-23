class WonderSerializer < ActiveModel::Serializer
  attributes :id, :wonder, :user_id, :my_collection_id
  belongs_to :my_collection
end
