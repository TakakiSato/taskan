class MemberProject < ActiveRecord::Base
    belongs_to :user
    belongs_to :project,foreign_key: [:project_id]
    self.primary_keys = :user_id, :project_id

    def self.getChargeProject(user_id)
        charge_project=MemberProject.joins(:project).select("user_id,member_projects.project_id,charge_project,projects.project_name").where("user_id = ?",user_id).where("charge_project = true")
        charge_project
    end
end