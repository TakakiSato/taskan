class CreateMemberProjects < ActiveRecord::Migration
  def change
    create_table :member_projects,id: false do |t|
        t.references :user
        t.references :project
    end
    add_index :member_projects, [:user_id,:project_id], unique: true, name: 'composit_menber_projects'
  end
end
