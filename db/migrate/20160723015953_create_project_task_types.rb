class CreateProjectTaskTypes < ActiveRecord::Migration
  def change
    create_table :project_task_types ,id: false do |t|
        t.references :project
        t.references :task_type
    end
    add_index :project_task_types, [:project_id,:task_type_id], unique: true, name: 'composit_project_task_types'
  end
end
