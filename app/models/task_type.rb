class TaskType < ActiveRecord::Base
    belongs_to :team
    belongs_to :project,foreign_key: [:project_id]
    has_many :task
    has_many :member_task_type ,foreign_key: [:task_type_id]
    has_many :project_task_type ,foreign_key: [:task_type_id]

end