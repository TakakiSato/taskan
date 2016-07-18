class TaskType < ActiveRecord::Base
    belongs_to :team
    has_many :task
end