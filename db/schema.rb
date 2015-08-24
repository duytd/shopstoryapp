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

ActiveRecord::Schema.define(version: 20150821141535) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "category_products", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "product_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "category_products", ["category_id"], name: "index_category_products_on_category_id", using: :btree
  add_index "category_products", ["product_id"], name: "index_category_products_on_product_id", using: :btree

  create_table "discounts", force: :cascade do |t|
    t.string   "code"
    t.date     "start_date"
    t.date     "expiry_Date"
    t.integer  "discount_type"
    t.decimal  "value"
    t.boolean  "active",        default: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "menus", force: :cascade do |t|
    t.integer  "menu_type"
    t.integer  "target_id"
    t.integer  "parent_id"
    t.integer  "position"
    t.integer  "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "order_products", force: :cascade do |t|
    t.integer  "order_id"
    t.integer  "product_id"
    t.integer  "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "order_products", ["order_id"], name: "index_order_products_on_order_id", using: :btree
  add_index "order_products", ["product_id"], name: "index_order_products_on_product_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id"
    t.decimal  "total"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "orders", ["user_id"], name: "index_orders_on_user_id", using: :btree

  create_table "pages", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plans", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.decimal  "price"
    t.decimal  "transaction_fee"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "product_images", force: :cascade do |t|
    t.integer  "product_id"
    t.string   "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "product_images", ["product_id"], name: "index_product_images_on_product_id", using: :btree

  create_table "product_tags", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "product_tags", ["product_id"], name: "index_product_tags_on_product_id", using: :btree
  add_index "product_tags", ["tag_id"], name: "index_product_tags_on_tag_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.decimal  "price"
    t.decimal  "sale_off"
    t.boolean  "visibility",  default: true
    t.string   "vendor"
    t.string   "sku"
    t.integer  "in_stock",    default: 0
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "shops", force: :cascade do |t|
    t.string   "name"
    t.string   "legal_name"
    t.string   "phone"
    t.string   "street"
    t.string   "city"
    t.integer  "theme_id"
    t.string   "country"
    t.string   "zip_code"
    t.string   "time_zone"
    t.integer  "metric_system"
    t.integer  "weight_unit"
    t.string   "currency"
    t.integer  "plan_id"
    t.integer  "user_id"
    t.string   "facebook_url"
    t.string   "instagram_url"
    t.string   "pinterest_url"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "shops", ["plan_id"], name: "index_shops_on_plan_id", using: :btree
  add_index "shops", ["theme_id"], name: "index_shops_on_theme_id", using: :btree
  add_index "shops", ["user_id"], name: "index_shops_on_user_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "themes", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.boolean  "actived"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "type"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "subdomain"
    t.string   "company"
    t.string   "phone"
    t.string   "address"
    t.string   "city"
    t.string   "country"
    t.string   "zip_code"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "variations", force: :cascade do |t|
    t.integer  "product_id"
    t.string   "color"
    t.string   "size"
    t.integer  "in_stock",   default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "variations", ["product_id"], name: "index_variations_on_product_id", using: :btree

  add_foreign_key "category_products", "categories"
  add_foreign_key "category_products", "products"
  add_foreign_key "order_products", "orders"
  add_foreign_key "order_products", "products"
  add_foreign_key "orders", "users"
  add_foreign_key "product_images", "products"
  add_foreign_key "product_tags", "products"
  add_foreign_key "product_tags", "tags"
  add_foreign_key "shops", "plans"
  add_foreign_key "shops", "themes"
  add_foreign_key "shops", "users"
  add_foreign_key "variations", "products"
end
