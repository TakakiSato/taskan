# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160731023741) do

  create_table "invite_trans", id: false, force: true do |t|
    t.integer "team_id"
    t.integer "status_code"
    t.integer "user_id"
    t.string  "invite_user"
    t.string  "mail_address"
  end

  add_index "invite_trans", ["team_id", "mail_address"], name: "composit_invite_tran_index", unique: true, using: :btree

  create_table "member_projects", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "project_id"
    t.boolean "charge_project"
  end

  add_index "member_projects", ["user_id", "project_id"], name: "composit_menber_projects", unique: true, using: :btree

  create_table "member_task_types", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "task_type_id"
    t.boolean "charge_task_type"
  end

  add_index "member_task_types", ["user_id", "task_type_id"], name: "composit_menber_task_types", unique: true, using: :btree

  create_table "member_teams", id: false, force: true do |t|
    t.integer "team_id"
    t.integer "user_id"
  end

  add_index "member_teams", ["team_id", "user_id"], name: "composit_menber_teams", unique: true, using: :btree

  create_table "projects", primary_key: "project_id", force: true do |t|
    t.integer "team_id"
    t.string  "project_name"
  end

  create_table "task_types", primary_key: "task_type_id", force: true do |t|
    t.string  "type_name"
    t.integer "team_id"
    t.integer "project_id"
  end

  create_table "tasks", primary_key: "task_id", force: true do |t|
    t.string  "task_name"
    t.integer "team_id"
    t.integer "user_id"
    t.float   "plan_time",     limit: 24
    t.float   "result_time",   limit: 24
    t.boolean "complete_flag",            default: false
    t.date    "date"
    t.integer "project_id"
    t.integer "task_type_id"
  end

  create_table "team_task_types", id: false, force: true do |t|
    t.integer "team_id"
    t.integer "task_type_id"
  end

  add_index "team_task_types", ["team_id", "task_type_id"], name: "composit_team_task_types", unique: true, using: :btree

  create_table "teams", primary_key: "team_id", force: true do |t|
    t.string "team_name"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "user_name",              default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
