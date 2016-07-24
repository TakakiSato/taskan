class AddProjectIdToTask < ActiveRecord::Migration
  def change
    change_table :tasks do |t|
        t.references :project
    end
end
end
