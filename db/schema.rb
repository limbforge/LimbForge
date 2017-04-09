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

ActiveRecord::Schema.define(version: 20170409035103) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "amputation_levels", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "amputation_levels_components", id: false, force: :cascade do |t|
    t.integer "amputation_level_id"
    t.integer "component_id"
  end

  add_index "amputation_levels_components", ["amputation_level_id", "component_id"], name: "amputation_levels_components_unique", unique: true, using: :btree

  create_table "component_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "component_types_components", id: false, force: :cascade do |t|
    t.integer "component_id"
    t.integer "component_type_id"
  end

  add_index "component_types_components", ["component_id", "component_type_id"], name: "component_types_components_unique", unique: true, using: :btree

  create_table "components", force: :cascade do |t|
    t.string   "name"
    t.string   "icon"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "icon_file_name"
    t.string   "icon_content_type"
    t.integer  "icon_file_size"
    t.datetime "icon_updated_at"
    t.float    "version"
    t.string   "creator"
    t.string   "uses"
    t.string   "print_time"
    t.string   "weight"
    t.string   "description"
    t.string   "component_type"
    t.string   "folder"
  end

  create_table "components_measurements", id: false, force: :cascade do |t|
    t.integer "component_id"
    t.integer "measurement_id"
  end

  add_index "components_measurements", ["component_id", "measurement_id"], name: "components_measurements_unique", unique: true, using: :btree

  create_table "components_options", id: false, force: :cascade do |t|
    t.integer "component_id"
    t.integer "option_id"
  end

  add_index "components_options", ["component_id", "option_id"], name: "components_options_unique", unique: true, using: :btree

  create_table "components_terminal_devices", id: false, force: :cascade do |t|
    t.integer "component_id"
    t.integer "terminal_device_id"
  end

  add_index "components_terminal_devices", ["component_id", "terminal_device_id"], name: "components_terminal_devices_unique", unique: true, using: :btree

  create_table "devices", force: :cascade do |t|
    t.string   "name"
    t.string   "icon"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "icon_file_name"
    t.string   "icon_content_type"
    t.integer  "icon_file_size"
    t.datetime "icon_updated_at"
  end

  create_table "devices_measurements", id: false, force: :cascade do |t|
    t.integer "device_id"
    t.integer "measurement_id"
  end

  add_index "devices_measurements", ["device_id", "measurement_id"], name: "index_devices_measurements_on_device_id_and_measurement_id", using: :btree

  create_table "measurements", force: :cascade do |t|
    t.string   "name"
    t.float    "step"
    t.string   "measurement_unit"
    t.string   "diagram"
    t.float    "lower_range"
    t.float    "upper_range"
    t.float    "default"
    t.string   "instructions"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "diagram_file_name"
    t.string   "diagram_content_type"
    t.integer  "diagram_file_size"
    t.datetime "diagram_updated_at"
  end

  create_table "options", force: :cascade do |t|
    t.string   "name"
    t.string   "photo"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  create_table "pages", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "terminal_devices", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                  default: false
    t.boolean  "has_access",             default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
