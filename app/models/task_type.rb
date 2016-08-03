class TaskType < ActiveRecord::Base
    belongs_to :team
    has_many :task
    has_many :member_task_type ,foreign_key: [:task_type_id]
    has_many :project_task_type ,foreign_key: [:task_type_id]

end