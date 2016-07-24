class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects,id: false do |t|
        t.column :project_id, 'INTEGER PRIMARY KEY AUTO_INCREMENT'
        t.references :team
        t.string  :project_name
    end
  end
end
