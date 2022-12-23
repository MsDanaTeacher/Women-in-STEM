class MyCollectionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :woman_id
  belongs_to :woman
  has_many :knows
end
