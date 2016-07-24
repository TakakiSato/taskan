class ProjectTaskType < ActiveRecord::Base
    belongs_to :project
    belongs_to :task_type
end