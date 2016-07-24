class MemberTeamsController < ApplicationController
    def index
        begin
            result=Hash.new
            success= true
            if params[:team_id].blank?
                result[:error_message]="チームが指定されていません。"
                flash[:notice] = result[:error_message]
                raise
            end
            #ユーザ一覧取得
            user_id_list=MemberTeam.where("team_id = ?",params[:team_id]).pluck(:user_id)
            result[:belong_users]= User.select(:id,:user_name).where(id: user_id_list)
            #案件一覧取得
            #result[:belong_projects]=Project.getTeamProject(params[:team_id],params[:user_id])

        rescue => e
            if result[:error_message].blank?
                result[:error_message]=e.message
            end
            success=false
        ensure
            result[:success] = success
            p result
            respond_to do |format|
                format.html
                format.json {render :json => result}
            end
        end
    end
end
