class TeamsController < ApplicationController
  def index
    begin
        result=Hash.new
        success= true
        if params[:user_id].blank?
            result[:error_message]="ログインされていません。"
            flash[:notice] = result[:error_message]
            raise
        end
        team_id_list=MemberTeam.where("user_id = ?",params[:user_id]).pluck(:team_id)
        result[:belong_teams]= Team.where(team_id: team_id_list)
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
  def create
    begin
        result=Hash.new
        success= true
        if params[:team_name].blank?
            result[:error_message]="チーム名が入力されていません。"
            flash[:notice] = result[:error_message]
            raise
        end
        result[:created_team]= Team.create(team_name: params[:team_name])
        member_team=MemberTeam.create(team_id: result[:created_team].team_id,user_id: params[:user_id])
        team_id_list=MemberTeam.where("user_id = ?",params[:user_id]).pluck(:team_id)
        result[:belong_team]=Team.where(team_id: team_id_list)
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
def update
end
def destroy
end
end
