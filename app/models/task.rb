class Task < ActiveRecord::Base
    belongs_to :team
    belongs_to :user
    belongs_to :task

    def self.taskListGet(team_members,date)
        seven_day_next=Date.parse(date.gsub(/\(.*?\)/,"")) + 7
        p seven_day_next
        taskList=Array.new
        team_members.each do |team_member|
            memberTaskHash=Hash.new
            #メンバーのタスク一覧を取得
            team_member_tasks=Task.where("user_id = ? and ((date >= ? and date <= ? ) or date is null)",team_member.id,date,seven_day_next)
            date_list=team_member_tasks.uniq.pluck(:date)
            #メンバー名取得
            user_name=User.where("id = ?",team_member.id)
            memberTaskHash[:user_name]=user_name[0].user_name
            memberTaskHash[:user_id]=user_name[0].id
            #日付ごとのタスク取得
            week_task_array=Array.new
            date_list.each do |date|
                taskHash=Hash.new
                taskHash[:date]=date
                taskHash[:task_list]=team_member_tasks.where("date = ?" ,date)
                week_task_array.push(taskHash)
            end
            #未スケジュールタスク
            taskHash=Hash.new
            taskHash[:date]="notset"
            taskHash[:task_list]=team_member_tasks.where("date is null")
            week_task_array.push(taskHash)

            memberTaskHash[:week_task_list]=week_task_array
            taskList.push(memberTaskHash)
        end
        p taskList
        taskList
    end
end