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

ActiveRecord::Schema.define(version: 2024_06_06_120240) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", id: :serial, force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "company"
    t.string "address1"
    t.string "address2"
    t.string "city"
    t.string "state"
    t.string "country"
    t.string "zip_code"
    t.string "phone_number"
    t.string "fax"
    t.integer "order_id"
    t.string "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "alternative_phone"
    t.text "delivery_message"
    t.index ["order_id"], name: "index_addresses_on_order_id"
  end

  create_table "assets", id: :serial, force: :cascade do |t|
    t.string "type"
    t.string "name"
    t.string "image"
    t.text "content"
    t.string "directory"
    t.integer "theme_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "banner_items", id: :serial, force: :cascade do |t|
    t.integer "banner_id"
    t.string "text"
    t.string "image"
    t.string "link"
    t.boolean "show_image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["banner_id"], name: "index_banner_items_on_banner_id"
  end

  create_table "banners", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
  end

  create_table "category_products", id: :serial, force: :cascade do |t|
    t.integer "category_id"
    t.integer "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_category_products_on_category_id"
    t.index ["product_id"], name: "index_category_products_on_product_id"
  end

  create_table "category_translations", id: :serial, force: :cascade do |t|
    t.integer "category_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["category_id"], name: "index_category_translations_on_category_id"
    t.index ["locale"], name: "index_category_translations_on_locale"
  end

  create_table "custom_page_translations", id: :serial, force: :cascade do |t|
    t.integer "custom_page_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.text "content"
    t.index ["custom_page_id"], name: "index_custom_page_translations_on_custom_page_id"
    t.index ["locale"], name: "index_custom_page_translations_on_locale"
  end

  create_table "custom_pages", id: :serial, force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customer_discounts", id: :serial, force: :cascade do |t|
    t.integer "customer_id"
    t.integer "discount_id"
    t.integer "order_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_customer_discounts_on_customer_id"
    t.index ["discount_id"], name: "index_customer_discounts_on_discount_id"
    t.index ["order_id"], name: "index_customer_discounts_on_order_id"
  end

  create_table "customers", id: :serial, force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "gender"
    t.string "phone"
    t.string "address"
    t.string "city"
    t.string "country"
    t.string "zip_code"
    t.string "access_token"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "provider"
    t.string "uid"
    t.string "locale"
    t.index ["email"], name: "index_customers_on_email", unique: true
    t.index ["reset_password_token"], name: "index_customers_on_reset_password_token", unique: true
  end

  create_table "discounts", id: :serial, force: :cascade do |t|
    t.string "code"
    t.date "start_date"
    t.date "expiry_date"
    t.integer "discount_type"
    t.decimal "amount"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "email_templates", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flipper_features", force: :cascade do |t|
    t.string "key", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_flipper_features_on_key", unique: true
  end

  create_table "flipper_gates", force: :cascade do |t|
    t.string "feature_key", null: false
    t.string "key", null: false
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feature_key", "key", "value"], name: "index_flipper_gates_on_feature_key_and_key_and_value", unique: true
  end

  create_table "menu_item_translations", id: :serial, force: :cascade do |t|
    t.integer "menu_item_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["locale"], name: "index_menu_item_translations_on_locale"
    t.index ["menu_item_id"], name: "index_menu_item_translations_on_menu_item_id"
  end

  create_table "menu_items", id: :serial, force: :cascade do |t|
    t.integer "menu_id"
    t.integer "parent_id"
    t.string "name"
    t.integer "position"
    t.string "type"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_id"], name: "index_menu_items_on_menu_id"
  end

  create_table "menus", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "oauth_access_grants", id: :serial, force: :cascade do |t|
    t.integer "resource_owner_id", null: false
    t.integer "application_id", null: false
    t.string "token", null: false
    t.integer "expires_in", null: false
    t.text "redirect_uri", null: false
    t.datetime "created_at", null: false
    t.datetime "revoked_at"
    t.string "scopes"
    t.index ["token"], name: "index_oauth_access_grants_on_token", unique: true
  end

  create_table "oauth_access_tokens", id: :serial, force: :cascade do |t|
    t.integer "resource_owner_id"
    t.integer "application_id"
    t.string "token", null: false
    t.string "refresh_token"
    t.integer "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at", null: false
    t.string "scopes"
    t.index ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true
    t.index ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id"
    t.index ["token"], name: "index_oauth_access_tokens_on_token", unique: true
  end

  create_table "oauth_applications", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "uid", null: false
    t.string "secret", null: false
    t.text "redirect_uri", null: false
    t.string "scopes", default: "", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["uid"], name: "index_oauth_applications_on_uid", unique: true
  end

  create_table "order_products", id: :serial, force: :cascade do |t|
    t.integer "order_id"
    t.integer "variation_id"
    t.decimal "unit_price"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_products_on_order_id"
    t.index ["variation_id"], name: "index_order_products_on_variation_id"
  end

  create_table "orders", id: :serial, force: :cascade do |t|
    t.string "type"
    t.integer "customer_id"
    t.decimal "subtotal", default: "0.0"
    t.decimal "shipping", default: "0.0"
    t.decimal "tax", default: "0.0"
    t.integer "product_count", default: 0
    t.decimal "total", default: "0.0"
    t.integer "status", default: 0
    t.string "token"
    t.string "ip_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token"
    t.string "ticket_code"
    t.datetime "ticket_sent_at"
    t.string "currency"
    t.string "locale"
    t.datetime "paid_at"
    t.index ["customer_id"], name: "index_orders_on_customer_id"
  end

  create_table "payment_method_option_shops", id: :serial, force: :cascade do |t|
    t.integer "payment_method_option_id"
    t.integer "payment_method_shop_id"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["payment_method_option_id"], name: "index_payment_method_option_shops_on_payment_method_option_id"
    t.index ["payment_method_shop_id"], name: "index_payment_method_option_shops_on_payment_method_shop_id"
  end

  create_table "payment_method_options", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.string "option_type"
    t.string "default_value", default: ""
    t.integer "payment_method_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "value", default: ""
    t.index ["payment_method_id"], name: "index_payment_method_options_on_payment_method_id"
  end

  create_table "payment_method_shops", id: :serial, force: :cascade do |t|
    t.integer "payment_method_id"
    t.integer "shop_id"
    t.boolean "active", default: false
    t.string "key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["payment_method_id"], name: "index_payment_method_shops_on_payment_method_id"
    t.index ["shop_id"], name: "index_payment_method_shops_on_shop_id"
  end

  create_table "payment_methods", id: :serial, force: :cascade do |t|
    t.string "type"
    t.string "name"
    t.string "mobile_submethods"
    t.string "desktop_submethods"
    t.boolean "key_required"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.boolean "active", default: false
  end

  create_table "payments", id: :serial, force: :cascade do |t|
    t.integer "payment_method_id"
    t.integer "order_id"
    t.integer "state", default: 0
    t.decimal "amount", default: "0.0"
    t.string "transaction_number"
    t.string "paid_at"
    t.string "submethod"
    t.text "extra_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "paypal_token"
    t.string "payer_id"
    t.index ["order_id"], name: "index_payments_on_order_id"
    t.index ["payment_method_id"], name: "index_payments_on_payment_method_id"
  end

  create_table "plans", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "stripe_id"
    t.float "price"
    t.string "interval"
    t.text "features"
    t.boolean "highlight", default: false
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_images", id: :serial, force: :cascade do |t|
    t.integer "product_id"
    t.string "image"
    t.boolean "featured", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_product_images_on_product_id"
  end

  create_table "product_tags", id: :serial, force: :cascade do |t|
    t.integer "product_id"
    t.integer "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_product_tags_on_product_id"
    t.index ["tag_id"], name: "index_product_tags_on_tag_id"
  end

  create_table "product_translations", id: :serial, force: :cascade do |t|
    t.integer "product_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.text "description"
    t.index ["locale"], name: "index_product_translations_on_locale"
    t.index ["product_id"], name: "index_product_translations_on_product_id"
  end

  create_table "products", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.decimal "price", default: "0.0"
    t.decimal "sale_off", default: "0.0"
    t.boolean "visibility", default: true
    t.string "vendor"
    t.string "sku"
    t.integer "in_stock", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "flat_shipping_rate"
    t.boolean "pay_shipping_on_delivery", default: false
    t.string "slug"
    t.boolean "featured"
    t.string "weight"
    t.boolean "unlimited", default: true
  end

  create_table "seo_tag_translations", id: :serial, force: :cascade do |t|
    t.integer "seo_tag_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.text "meta_description"
    t.string "meta_keywords"
    t.index ["locale"], name: "index_seo_tag_translations_on_locale"
    t.index ["seo_tag_id"], name: "index_seo_tag_translations_on_seo_tag_id"
  end

  create_table "seo_tags", id: :serial, force: :cascade do |t|
    t.string "title"
    t.text "meta_description"
    t.string "meta_keywords"
    t.integer "seoable_id"
    t.string "seoable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipments", id: :serial, force: :cascade do |t|
    t.integer "status", default: 0
    t.integer "order_id"
    t.string "tracking_code"
    t.integer "shipping_method_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_shipments_on_order_id"
    t.index ["shipping_method_id"], name: "index_shipments_on_shipping_method_id"
  end

  create_table "shipping_method_translations", id: :serial, force: :cascade do |t|
    t.integer "shipping_method_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.text "description"
    t.index ["locale"], name: "index_shipping_method_translations_on_locale"
    t.index ["shipping_method_id"], name: "index_d18925c68417b15023b73190fb04cfcefbb8f8d5"
  end

  create_table "shipping_methods", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "tracking_url"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipping_rate_translations", id: :serial, force: :cascade do |t|
    t.integer "shipping_rate_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["locale"], name: "index_shipping_rate_translations_on_locale"
    t.index ["shipping_rate_id"], name: "index_shipping_rate_translations_on_shipping_rate_id"
  end

  create_table "shipping_rates", id: :serial, force: :cascade do |t|
    t.string "type"
    t.string "name"
    t.decimal "rate", default: "0.0"
    t.decimal "min_price"
    t.boolean "active", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_translations", id: :serial, force: :cascade do |t|
    t.integer "shop_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "street"
    t.index ["locale"], name: "index_shop_translations_on_locale"
    t.index ["shop_id"], name: "index_shop_translations_on_shop_id"
  end

  create_table "shops", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "subdomain"
    t.string "domain"
    t.string "legal_name"
    t.string "email"
    t.string "phone"
    t.string "street"
    t.string "city"
    t.integer "theme_id"
    t.string "country"
    t.string "zip_code"
    t.string "time_zone"
    t.integer "weight_unit"
    t.string "currency"
    t.integer "user_id"
    t.string "facebook_url"
    t.string "instagram_url"
    t.string "pinterest_url"
    t.string "api_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "exchange_rate", default: "1000.0"
    t.string "ceo"
    t.string "business_number"
    t.string "service_phone"
    t.string "online_retail_number"
    t.string "privacy_manager"
    t.string "privacy_email"
    t.string "logo"
    t.integer "term_id"
    t.integer "privacy_id"
    t.string "naver"
    t.string "daum"
    t.string "kakao"
    t.string "yellow"
    t.string "google_verification_code"
    t.string "naver_verification_code"
    t.string "meta_title"
    t.text "meta_description"
    t.text "meta_keywords"
    t.index ["privacy_id"], name: "index_shops_on_privacy_id"
    t.index ["term_id"], name: "index_shops_on_term_id"
    t.index ["theme_id"], name: "index_shops_on_theme_id"
    t.index ["user_id"], name: "index_shops_on_user_id"
  end

  create_table "subscriptions", id: :serial, force: :cascade do |t|
    t.string "stripe_id"
    t.integer "plan_id"
    t.datetime "start_at"
    t.datetime "end_at"
    t.integer "user_id"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_subscriptions_on_plan_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "templates", id: :serial, force: :cascade do |t|
    t.string "directory"
    t.string "name"
    t.text "content"
    t.integer "theme_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "transformed_content"
    t.index ["theme_id"], name: "index_templates_on_theme_id"
  end

  create_table "theme_bundles", id: :serial, force: :cascade do |t|
    t.text "stylesheet"
    t.text "javascript"
    t.integer "shop_id"
    t.integer "theme_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "locale"
    t.text "template"
    t.index ["shop_id"], name: "index_theme_bundles_on_shop_id"
    t.index ["theme_id"], name: "index_theme_bundles_on_theme_id"
  end

  create_table "themes", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "directory"
    t.string "author"
    t.decimal "version"
    t.text "description"
    t.boolean "actived", default: true
    t.boolean "default", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "type"
    t.string "first_name"
    t.string "last_name"
    t.string "company"
    t.string "phone"
    t.string "address"
    t.string "city"
    t.string "country"
    t.string "zip_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "stripe_id"
    t.string "locale"
    t.integer "setup_step", default: 0
    t.index ["email"], name: "index_users_on_email"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "variation_option_values", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "variation_option_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["variation_option_id"], name: "index_variation_option_values_on_variation_option_id"
  end

  create_table "variation_options", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_variation_options_on_product_id"
  end

  create_table "variation_variation_option_values", id: :serial, force: :cascade do |t|
    t.integer "variation_id"
    t.integer "variation_option_value_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["variation_id"], name: "index_variation_variation_option_values_on_variation_id"
    t.index ["variation_option_value_id"], name: "option_value_id"
  end

  create_table "variations", id: :serial, force: :cascade do |t|
    t.integer "in_stock", default: 1
    t.string "image"
    t.decimal "price"
    t.string "sku"
    t.boolean "master", default: false
    t.integer "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "unlimited", default: true
    t.index ["product_id"], name: "index_variations_on_product_id"
  end

  add_foreign_key "addresses", "orders"
  add_foreign_key "banner_items", "banners"
  add_foreign_key "category_products", "categories"
  add_foreign_key "category_products", "products"
  add_foreign_key "customer_discounts", "customers"
  add_foreign_key "customer_discounts", "discounts"
  add_foreign_key "customer_discounts", "orders"
  add_foreign_key "menu_items", "menus"
  add_foreign_key "order_products", "orders"
  add_foreign_key "order_products", "variations"
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
  add_foreign_key "shipments", "orders"
  add_foreign_key "shops", "themes"
  add_foreign_key "shops", "users"
  add_foreign_key "subscriptions", "plans"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "theme_bundles", "shops"
  add_foreign_key "theme_bundles", "themes"
  add_foreign_key "variation_option_values", "variation_options"
  add_foreign_key "variation_options", "products"
  add_foreign_key "variation_variation_option_values", "variation_option_values"
  add_foreign_key "variation_variation_option_values", "variations"
  add_foreign_key "variations", "products"
end
