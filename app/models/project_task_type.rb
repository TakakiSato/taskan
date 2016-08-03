class ProjectTaskType < ActiveRecord::Base
    belongs_to :project
    belongs_to :task_type
    belongs_to :task_type,foreign_key: [:task_type_id]
    self.primary_keys = :project_id, :task_type_id

end