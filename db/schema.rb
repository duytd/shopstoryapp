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

ActiveRecord::Schema.define(version: 20160107095053) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "company"
    t.string   "address1"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "zip_code"
    t.string   "phone_number"
    t.string   "fax"
    t.integer  "order_id"
    t.string   "type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "addresses", ["order_id"], name: "index_addresses_on_order_id", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "category_products", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "product_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "category_products", ["category_id"], name: "index_category_products_on_category_id", using: :btree
  add_index "category_products", ["product_id"], name: "index_category_products_on_product_id", using: :btree

  create_table "category_translations", force: :cascade do |t|
    t.integer  "category_id", null: false
    t.string   "locale",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name"
  end

  add_index "category_translations", ["category_id"], name: "index_category_translations_on_category_id", using: :btree
  add_index "category_translations", ["locale"], name: "index_category_translations_on_locale", using: :btree

  create_table "customers", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "gender"
    t.string   "phone"
    t.string   "address"
    t.string   "city"
    t.string   "country"
    t.string   "zip_code"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
  end

  add_index "customers", ["email"], name: "index_customers_on_email", unique: true, using: :btree
  add_index "customers", ["reset_password_token"], name: "index_customers_on_reset_password_token", unique: true, using: :btree

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

  create_table "extensions", force: :cascade do |t|
    t.decimal  "price",       default: 0.0
    t.string   "name"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
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
    t.decimal  "unit_price"
    t.integer  "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "order_products", ["order_id"], name: "index_order_products_on_order_id", using: :btree
  add_index "order_products", ["product_id"], name: "index_order_products_on_product_id", using: :btree

  create_table "orders", force: :cascade do |t|
    t.integer  "customer_id"
    t.decimal  "subtotal",      default: 0.0
    t.decimal  "shipping",      default: 0.0
    t.decimal  "tax",           default: 0.0
    t.integer  "product_count", default: 0
    t.decimal  "total",         default: 0.0
    t.integer  "status",        default: 0
    t.string   "token"
    t.string   "ip_address"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "orders", ["customer_id"], name: "index_orders_on_customer_id", using: :btree

  create_table "payment_method_option_shops", force: :cascade do |t|
    t.integer  "payment_method_option_id"
    t.integer  "payment_method_shop_id"
    t.string   "value"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "payment_method_option_shops", ["payment_method_option_id"], name: "index_payment_method_option_shops_on_payment_method_option_id", using: :btree
  add_index "payment_method_option_shops", ["payment_method_shop_id"], name: "index_payment_method_option_shops_on_payment_method_shop_id", using: :btree

  create_table "payment_method_options", force: :cascade do |t|
    t.string   "name"
    t.string   "title"
    t.string   "option_type"
    t.string   "default_value",     default: ""
    t.integer  "payment_method_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_index "payment_method_options", ["payment_method_id"], name: "index_payment_method_options_on_payment_method_id", using: :btree

  create_table "payment_method_shops", force: :cascade do |t|
    t.integer  "payment_method_id"
    t.integer  "shop_id"
    t.boolean  "active",            default: true
    t.string   "key"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "payment_method_shops", ["payment_method_id"], name: "index_payment_method_shops_on_payment_method_id", using: :btree
  add_index "payment_method_shops", ["shop_id"], name: "index_payment_method_shops_on_shop_id", using: :btree

  create_table "payment_methods", force: :cascade do |t|
    t.string   "type"
    t.string   "name"
    t.string   "mobile_submethods"
    t.string   "desktop_submethods"
    t.boolean  "key_required"
    t.text     "description"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "payments", force: :cascade do |t|
    t.integer  "payment_method_id"
    t.integer  "order_id"
    t.integer  "state",              default: 0
    t.decimal  "amount",             default: 0.0
    t.string   "transaction_number"
    t.string   "submethod"
    t.text     "extra_data"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "payments", ["order_id"], name: "index_payments_on_order_id", using: :btree
  add_index "payments", ["payment_method_id"], name: "index_payments_on_payment_method_id", using: :btree

  create_table "plans", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.decimal  "price"
    t.decimal  "transaction_fee"
    t.boolean  "default",         default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
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

  create_table "product_translations", force: :cascade do |t|
    t.integer  "product_id",  null: false
    t.string   "locale",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name"
    t.text     "description"
  end

  add_index "product_translations", ["locale"], name: "index_product_translations_on_locale", using: :btree
  add_index "product_translations", ["product_id"], name: "index_product_translations_on_product_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.decimal  "price",       default: 0.0
    t.decimal  "sale_off",    default: 0.0
    t.boolean  "visibility",  default: true
    t.string   "vendor"
    t.string   "sku"
    t.integer  "in_stock",    default: 0
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "shop_extensions", force: :cascade do |t|
    t.integer  "shop_id"
    t.integer  "extension_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "shop_extensions", ["extension_id"], name: "index_shop_extensions_on_extension_id", using: :btree
  add_index "shop_extensions", ["shop_id"], name: "index_shop_extensions_on_shop_id", using: :btree

  create_table "shop_translations", force: :cascade do |t|
    t.integer  "shop_id",    null: false
    t.string   "locale",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "street"
  end

  add_index "shop_translations", ["locale"], name: "index_shop_translations_on_locale", using: :btree
  add_index "shop_translations", ["shop_id"], name: "index_shop_translations_on_shop_id", using: :btree

  create_table "shops", force: :cascade do |t|
    t.string   "name"
    t.string   "subdomain"
    t.string   "legal_name"
    t.string   "email"
    t.string   "phone"
    t.string   "street"
    t.string   "city"
    t.integer  "theme_id"
    t.string   "country"
    t.string   "zip_code"
    t.string   "time_zone"
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

  create_table "shopstory_ticket_events", force: :cascade do |t|
    t.integer  "source"
    t.integer  "shopstory_ticket_seller_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "shopstory_ticket_events", ["shopstory_ticket_seller_id"], name: "index_shopstory_ticket_events_on_shopstory_ticket_seller_id", using: :btree
  add_index "shopstory_ticket_events", ["source"], name: "index_shopstory_ticket_events_on_source", using: :btree

  create_table "shopstory_ticket_sellers", force: :cascade do |t|
    t.string   "email"
    t.integer  "shop_id"
    t.string   "access_token"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "shopstory_ticket_sellers", ["shop_id"], name: "index_shopstory_ticket_sellers_on_shop_id", using: :btree

  create_table "shopstory_ticket_settings", force: :cascade do |t|
    t.integer  "shop_id"
    t.string   "client_id"
    t.string   "api_key"
    t.boolean  "active",     default: true
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "shopstory_ticket_settings", ["shop_id"], name: "index_shopstory_ticket_settings_on_shop_id", using: :btree

  create_table "shopstory_ticket_tickets", force: :cascade do |t|
    t.string   "name"
    t.string   "code"
    t.decimal  "price",                     default: 0.0
    t.integer  "shopstory_ticket_event_id"
    t.integer  "quantity",                  default: 10
    t.integer  "min_quantity",              default: 1
    t.integer  "max_quantity",              default: 10
    t.text     "description"
    t.string   "color"
    t.string   "image"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  add_index "shopstory_ticket_tickets", ["shopstory_ticket_event_id"], name: "index_shopstory_ticket_tickets_on_shopstory_ticket_event_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "theme_editors", force: :cascade do |t|
    t.text     "stylesheet"
    t.text     "javascript"
    t.text     "en_locale"
    t.text     "ko_locale"
    t.integer  "shop_id"
    t.integer  "theme_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "theme_editors", ["shop_id"], name: "index_theme_editors_on_shop_id", using: :btree
  add_index "theme_editors", ["theme_id"], name: "index_theme_editors_on_theme_id", using: :btree

  create_table "themes", force: :cascade do |t|
    t.string   "name"
    t.string   "directory"
    t.string   "author"
    t.decimal  "version"
    t.text     "description"
    t.boolean  "actived",     default: true
    t.boolean  "default",     default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "type"
    t.string   "first_name"
    t.string   "last_name"
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

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
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

  add_foreign_key "addresses", "orders"
  add_foreign_key "category_products", "categories"
  add_foreign_key "category_products", "products"
  add_foreign_key "order_products", "orders"
  add_foreign_key "order_products", "products"
  add_foreign_key "orders", "customers"
  add_foreign_key "payment_method_option_shops", "payment_method_options"
  add_foreign_key "payment_method_option_shops", "payment_method_shops"
  add_foreign_key "payment_method_options", "payment_methods"
  add_foreign_key "payment_method_shops", "payment_methods"
  add_foreign_key "payment_method_shops", "shops"
  add_foreign_key "payments", "orders"
  add_foreign_key "product_images", "products"
  add_foreign_key "product_tags", "products"
  add_foreign_key "product_tags", "tags"
  add_foreign_key "shop_extensions", "extensions"
  add_foreign_key "shop_extensions", "shops"
  add_foreign_key "shops", "plans"
  add_foreign_key "shops", "themes"
  add_foreign_key "shops", "users"
  add_foreign_key "shopstory_ticket_events", "shopstory_ticket_sellers"
  add_foreign_key "shopstory_ticket_sellers", "shops"
  add_foreign_key "shopstory_ticket_settings", "shops"
  add_foreign_key "shopstory_ticket_tickets", "shopstory_ticket_events"
  add_foreign_key "theme_editors", "shops"
  add_foreign_key "theme_editors", "themes"
  add_foreign_key "variations", "products"
end
