class TasksController < ApplicationController
  protect_from_forgery :except => [:create,:update]

  def index
    begin
      result=Hash.new
      success= true
      if params[:user_id].blank?
        result[:error_message]="ユーザが指定されていません。"
        flash[:notice] = result[:error_message]
        raise
      end
      result[:my_team_member]=MemberTeam.myTeamMeberGet(params[:user_id])
      result[:task_list]=Task.taskListGet(result[:my_team_member],params[:date])
      result[:charge_project]=MemberProject.getChargeProject(params[:user_id])
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
      if params[:task_name].blank? || params[:user_id].blank? || params[:plan_time].blank? || params[:date].blank?
        result[:error_message]="パラメータが足りません。"
        flash[:notice] = result[:error_message]
        raise
      end
      result[:task]=Task.create(:task_name => params[:task_name],:user_id => params[:user_id],:plan_time => params[:plan_time] , :date => params[:date],:project_id=>params[:project_id],:task_type_id=>params[:task_type_id])
      #タスクカード描画用にcharge_projectを返す
      result[:charge_project]=MemberProject.getChargeProject(result[:task][:user_id])

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
  begin
    result=Hash.new
    success= true
    updCol=Hash.new
    if params[:complete_flag]=="1" && params[:result_time].blank?
      result[:error_message]="作業実績が入力されていません。"
      flash[:notice] = result[:error_message]
      raise
    end

      #パラメータで渡されているものをチェックして更新用ハッシュを作成する。
      Task.column_names.each do |column|
        if params[column].present?
          updCol[column]=params[column]
        end
      end
      p updCol
      p updCol["date"]
      if params[:date]=="notset"
        updCol["date"] = nil
      end
      #完了時はteam_idを登録する
      p params[:complete_flag]
      if params[:complete_flag]=="1"
        project_id = Task.where("task_id = ?" ,params[:id])[0].project_id
        updCol["team_id"] = Project.where(project_id: project_id)[0].team_id
      end
      p "updCol"
      p updCol
      Task.upsert({:task_id=>params[:id]},updCol)
      result[:task]=Task.where(:task_id=>params[:id])[0]
      p result[:task]
      result[:charge_project]=MemberProject.getChargeProject(result[:task][:user_id])
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
  def destroy
  end

end
