class LearnSerializer < ActiveModel::Serializer
  attributes :id, :learn, :user_id, :my_collection_id
  belongs_to :my_collection
end
