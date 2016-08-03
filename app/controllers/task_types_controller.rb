class TaskTypesController < ApplicationController
    protect_from_forgery :except => [:index,:create]
    def index
        begin
            result=Hash.new
            success= true
            if params[:project_id].blank?
                result[:error_message]="パラメータが足りません。"
                flash[:notice] = result[:error_message]
                raise
            end
            #タスクタイプ
            result[:task_type_list]=TaskType.where(project_id: params[:project_id])
            if params[:user_id].present?
                result[:charge_task_type]=MemberTaskType.where(user_id: params[:user_id]).where(charge_task_type: true).pluck(:task_type_id)
            end
            if params[:team_id].present?
                result[:team_id]=params[:team_id]
            end
            if params[:task_id].present?
                result[:task]=Task.where(task_id: params[:task_id])[0]
            end
            #タスクが存在しなｋれば、パラメータをそのまま返す(タスク追加フォーム用)
            if result[:task].blank?
                result[:task]={task_id: params[:task_id]}
            end
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
          if params[:type_name].blank? ||params[:team_id].blank? ||params[:project_id].blank?
            result[:error_message]="パラメータが足りません。"
            flash[:notice] = result[:error_message]
            raise
        end
        result[:task_type]=TaskType.create(:type_name => params[:type_name],:team_id => params[:team_id],:project_id=>params[:project_id])
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
