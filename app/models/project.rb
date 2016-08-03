class Project < ActiveRecord::Base
    belongs_to :team
    has_many :member_project ,foreign_key: [:project_id]

    def self.getTeamProject(team_id,user_id)
        result=Hash.new

        #チームに紐づく案件
        result[:projects]=Project.where("team_id=?",team_id)
        result[:member_select_project_list]=MemberProject.getChargeProject(user_id).pluck(:project_id)
        result
    end
end