class ProjectsController < ApplicationController

  protect_from_forgery :except => [:create]
  def create
    begin
      result=Hash.new
      success= true
      if params[:project_name].blank? ||params[:team_id].blank?
        result[:error_message]="パラメータが足りません。"
        flash[:notice] = result[:error_message]
        raise
      end
      result[:project]=Project.create(:team_id => params[:team_id],:project_name => params[:project_name],)
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