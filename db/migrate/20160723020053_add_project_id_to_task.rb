class AddProjectIdToTask < ActiveRecord::Migration
  def up
    change_table :tasks do |t|
        t.references :project
        t.references :task_type
    end
end
def down
    change_table :tasks do |t|
        t.references :project
        t.references :task_type
    end
end

end
