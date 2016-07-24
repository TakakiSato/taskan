class CreateTeamTaskTypes < ActiveRecord::Migration
  def change
    create_table :team_task_types ,id: false do |t|
        t.references :team
        t.references :task_type
    end
    add_index :team_task_types, [:team_id,:task_type_id], unique: true, name: 'composit_team_task_types'
  end
end
