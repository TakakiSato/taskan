class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams,id: false do |t|
        t.column :team_id, 'INTEGER PRIMARY KEY AUTO_INCREMENT'
        t.string  :team_name
    end
  end
end
