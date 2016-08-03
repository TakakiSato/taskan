class MemberTaskType < ActiveRecord::Base
    belongs_to :user
    belongs_to :project
    belongs_to :task_type,foreign_key: [:task_type_id]
    self.primary_keys = :user_id, :task_type_id

end