require "date"

class AnalyzeTasksController < ApplicationController
    def index
      result=Hash.new
      success= true
      if params[:team_id].present? && params[:team_member_id].present?
            #12か月前から今月を配列で取得
            d=Date.today
            month_list=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            result[:month_list]=month_list.concat(month_list.shift(d.month))

            #全員が指定されていたときの処理
            if params[:team_member_id]=='all'
                params[:team_member_id] = MemberTeam.where(team_id: params[:team_id]).pluck(:user_id)
            end

            #一年以内でteam_member_idがパラメータで渡されたものであり、完了タスクを取得する。
            task=Task.where("user_id in (?)", params[:team_member_id]).where(complete_flag: 1).where('date > ?', 396.days.ago)
            #ひと月ごとの予定、実績の合計を計算
            plan_time_list=[task.where('date > ?',d.beginning_of_month).sum(:plan_time)]
            result_time_list=[task.where('date > ?',d.beginning_of_month).sum(:result_time)]
            plan_result_list=[{
                }]
                for i in 0..10
                    plan_time_list.push(task.where('date < ?',d.months_ago(i).beginning_of_month).where('date > ?',d.months_ago(i+1).beginning_of_month).sum(:plan_time))
                    result_time_list.push(task.where('date < ?',d.months_ago(i).beginning_of_month).where('date > ?',d.months_ago(i+1).beginning_of_month).sum(:result_time))
                end
                result[:plan_result_list]=[{
                    name:"予定",
                    data:plan_time_list.reverse
                    },{
                        name:"実績",
                        data:result_time_list.reverse
                        }]

            #team_idとteam_member_idがパラメータで渡されたものであり、直近ひと月でユニークなタスクタイプを取得する
            task_type_list=Task.where("user_id in (?)", params[:team_member_id]).where(complete_flag: 1).where('date > ?', d.prev_month).select(:task_type_id).uniq.pluck(:task_type_id)

            #タスクタイプごとの実績合計を取得する。
            task_type_result_list=Array.new
            task_type_list.each do | task_type |
                task_type_name=TaskType.where(task_type_id: task_type).pluck(:type_name)[0]
                task_type_result_list.push([task_type_name.blank? ? "未分類" : task_type_name,task.where(task_type_id: task_type).where('date > ?',d.prev_month).sum(:result_time)])
            end
            result[:task_type_result_list]= task_type_result_list
        end

        #ユーザIDに紐づくチームIDを取得
        team_id_list=MemberTeam.where("user_id = ?",params[:user_id]).pluck(:team_id)
        result[:team]=Team.where("team_id in (?)" , team_id_list)
        p result
        respond_to do |format|
            format.html
            format.json {render :json => result}
        end
    end


    def show
        p "aaaaaa"
    end
end
