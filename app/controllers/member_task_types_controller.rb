class MemberTaskTypesController < ApplicationController
    protect_from_forgery :except => [:update]

    def update
        begin
            result=Hash.new
            success= true
            if params[:user_id].blank? ||params[:task_type_id].blank?||params[:charge_task_type].blank?
                result[:error_message]="パラメータが足りません。"
                flash[:notice] = result[:error_message]
                raise
            end
            #メンバー案件テーブル更新
            MemberTaskType.upsert({:user_id=>params[:user_id],:task_type_id=>params[:task_type_id]},{:charge_task_type=>params[:charge_task_type]})

            result[:belong_users]= MemberProject.where("user_id=?",params[:user_id]).where("project_id=?",params[:project_id])[0]

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
