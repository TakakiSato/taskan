class Project < ActiveRecord::Base
    belongs_to :team

    def self.getTeamProject(team_id,user_id)
        #チームに紐づく案件
        Project.includes(MemberTaskType.where("user_id = ?",user_id)).where("team_id=?",team_id).to_sql
        belong_projects=Project.includes(MemberTaskType.where("user_id = ?",user_id)).where("team_id=?",team_id)
    end
end