class Team < ActiveRecord::Base
    has_many :member_team
    has_many :task
    has_many :task_type
    has_many :project

end