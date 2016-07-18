class CreateInviteTrans < ActiveRecord::Migration
  def change
    create_table :invite_trans ,id: false  do |t|
        t.references :team
        t.integer :status_code
        t.references :user
        t.string :invite_user
        t.string :mail_address
    end
    add_index :invite_trans, [:team_id, :mail_address], unique: true, name: 'composit_invite_tran_index'
end
end
