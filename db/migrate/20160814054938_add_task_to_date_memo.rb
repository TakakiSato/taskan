class AddTaskToDateMemo < ActiveRecord::Migration
  def change
    change_table :tasks do |t|
        t.date    :dead_line
        t.string    :task_memo
    end
end
end
