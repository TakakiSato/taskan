class AddProjectIdToTaskType < ActiveRecord::Migration
  def up
    change_table :task_types,id: false  do |t|
        t.references :project
    end
    change_column :tasks,   :plan_time ,:float
    change_column :tasks,   :result_time ,:float
  end

  def down
    change_table :task_types,id: false  do |t|
        t.references :project
    end
    change_column :tasks,   :plan_time ,:float
    change_column :tasks,   :result_time ,:float
  end

end
