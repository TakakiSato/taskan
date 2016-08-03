class AddProjectIdToTask < ActiveRecord::Migration
  def change
    change_table :tasks do |t|
        t.references :project
        t.references :task_type
    end
end
end
