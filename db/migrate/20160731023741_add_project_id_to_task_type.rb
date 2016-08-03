class AddProjectIdToTaskType < ActiveRecord::Migration
  def change
    change_table :task_types,id: false  do |t|
        t.references :project
    end
    change_column :tasks,   :plan_time ,:float
    change_column :tasks,   :result_time ,:float

  end
end
