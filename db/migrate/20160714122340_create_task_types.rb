class CreateTaskTypes < ActiveRecord::Migration
  def change
    create_table :task_types,id: false  do |t|
        t.column :task_type_id, 'INTEGER PRIMARY KEY AUTO_INCREMENT'
        t.string :type_name
        t.references :team
    end
  end
end
