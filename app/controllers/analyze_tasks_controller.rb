class AnalyzeTasksController < ApplicationController
    def index
        #ユーザIDに紐づくチームIDを取得
        team_id_list=MemberTeam.where("user_id = ?",params[:user_id]).pluck(:team_id)
        @team=Team.where("team_id in (?)" , team_id_list)
        respond_to do |format|
            format.html
            format.json
        end

    end
end
