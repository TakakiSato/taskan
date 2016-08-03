class CreateMemberTaskTypes < ActiveRecord::Migration
  def change
    create_table :member_task_types ,id: false do |t|
        t.references :user
        t.references :task_type
        t.boolean :charge_task_type

    end
    add_index :member_task_types, [:user_id,:task_type_id], unique: true, name: 'composit_menber_task_types'
end
end
