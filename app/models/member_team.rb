class MemberTeam < ActiveRecord::Base
    belongs_to :team
    belongs_to :user

    def self.myTeamMeberGet(user_id)
      #自分が所属するチーム
      team_id_list=MemberTeam.where("user_id = ?",user_id).pluck(:team_id)
      #チームに所属するメンバー
      user_id_list=MemberTeam.where(team_id: team_id_list).pluck(:user_id)
      #メンバー詳細取得
      belong_users= User.select(:id,:user_name).where(id: user_id_list)
      belong_users
  end
end