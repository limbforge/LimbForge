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

ActiveRecord::Schema.define(version: 20160826181632) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "devices", force: :cascade do |t|
    t.string   "name"
    t.string   "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "pages", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
