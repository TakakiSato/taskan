class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks,id: false do |t|
        t.column :task_id, 'INTEGER PRIMARY KEY AUTO_INCREMENT'
        t.string  :task_name
        t.references :team
        t.references :user
        t.references :task_type
        t.integer :plan_time
        t.integer :result_time
        t.boolean :complete_flag , default: false
    end
end
end
