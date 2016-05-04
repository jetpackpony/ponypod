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

ActiveRecord::Schema.define(version: 20160504073944) do

  create_table "episodes", force: :cascade do |t|
    t.string   "title",            limit: 255
    t.integer  "podcast_id",       limit: 4
    t.string   "mp3_link",         limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "guid",             limit: 255
    t.text     "full_description", limit: 65535
    t.text     "summary",          limit: 65535
    t.datetime "published_at"
  end

  add_index "episodes", ["guid"], name: "index_episodes_on_guid", unique: true, using: :btree
  add_index "episodes", ["podcast_id"], name: "index_episodes_on_podcast_id", using: :btree

  create_table "podcasts", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "rss_link",    limit: 255
    t.text     "description", limit: 65535
    t.string   "image",       limit: 255
  end

  add_index "podcasts", ["rss_link"], name: "index_podcasts_on_rss_link", unique: true, using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "podcast_id", limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "subscriptions", ["podcast_id"], name: "index_subscriptions_on_podcast_id", using: :btree
  add_index "subscriptions", ["user_id", "podcast_id"], name: "index_subscriptions_on_user_id_and_podcast_id", unique: true, using: :btree
  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "provider",   limit: 255
    t.string   "uid",        limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "viewed_episodes", force: :cascade do |t|
    t.integer  "user_id",       limit: 4
    t.integer  "episode_id",    limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "podcast_id_id", limit: 4
    t.integer  "podcast_id",    limit: 4
  end

  add_index "viewed_episodes", ["episode_id"], name: "index_viewed_episodes_on_episode_id", using: :btree
  add_index "viewed_episodes", ["podcast_id"], name: "index_viewed_episodes_on_podcast_id", using: :btree
  add_index "viewed_episodes", ["podcast_id_id"], name: "index_viewed_episodes_on_podcast_id_id", using: :btree
  add_index "viewed_episodes", ["user_id"], name: "index_viewed_episodes_on_user_id", using: :btree

  add_foreign_key "episodes", "podcasts"
  add_foreign_key "subscriptions", "podcasts"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "viewed_episodes", "episodes"
  add_foreign_key "viewed_episodes", "podcasts"
  add_foreign_key "viewed_episodes", "users"
end
