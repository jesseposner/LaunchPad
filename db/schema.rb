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

ActiveRecord::Schema.define(version: 20160503222424) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string   "name",           null: false
    t.string   "street_address", null: false
    t.string   "city",           null: false
    t.string   "state",          null: false
    t.integer  "zip",            null: false
    t.string   "media_url",      null: false
    t.text     "description",    null: false
    t.text     "business_plan",  null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "companies", ["name"], name: "index_companies_on_name", unique: true, using: :btree

  create_table "foundings", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "foundings", ["company_id"], name: "index_foundings_on_company_id", using: :btree
  add_index "foundings", ["user_id"], name: "index_foundings_on_user_id", using: :btree

  create_table "investments", force: :cascade do |t|
    t.integer  "shares",      null: false
    t.integer  "user_id",     null: false
    t.integer  "offering_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "investments", ["offering_id"], name: "index_investments_on_offering_id", using: :btree
  add_index "investments", ["user_id"], name: "index_investments_on_user_id", using: :btree

  create_table "offerings", force: :cascade do |t|
    t.float    "price",           null: false
    t.integer  "new_shares",      null: false
    t.date     "offering_date",   null: false
    t.date     "expiration_date", null: false
    t.integer  "company_id",      null: false
    t.string   "description",     null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "post_shares",     null: false
  end

  add_index "offerings", ["company_id"], name: "index_offerings_on_company_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name",            null: false
    t.string   "street_address",  null: false
    t.string   "city",            null: false
    t.string   "state",           null: false
    t.string   "zip",             null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
