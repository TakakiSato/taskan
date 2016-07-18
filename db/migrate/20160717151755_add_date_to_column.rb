class AddDateToColumn < ActiveRecord::Migration
  def change
    change_table :tasks do |t|
        t.date    :date
    end
end
end
