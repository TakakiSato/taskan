class MemberProjectsController < ApplicationController
    protect_from_forgery :except => [:update]

    def update
        begin
            result=Hash.new
            success= true
            if params[:user_id].blank? ||params[:project_id].blank?||params[:charge_project].blank?
                result[:error_message]="パラメータが足りません。"
                flash[:notice] = result[:error_message]
                raise
            end
            #メンバー案件テーブル更新
            MemberProject.upsert({:user_id=>params[:user_id],:project_id=>params[:project_id]},{:charge_project=>params[:charge_project]})

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
