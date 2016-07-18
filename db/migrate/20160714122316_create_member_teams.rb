class CreateMemberTeams < ActiveRecord::Migration
  def change
    create_table :member_teams ,id: false do |t|
        t.references :team
        t.references :user
    end
    add_index :member_teams, [:team_id, :user_id], unique: true, name: 'composit_menber_teams'

end
end

