merchant = Merchant.create(
  shop_name: "ShopStory",
  email: "merchant@shopstoryapp.com",
  password: "12345678",
  password_confirmation: "12345678"
)

admin = Admin.create([
  {
    email: "ddtrinh93@gmail.com",
    password: "N3vermind",
    password_confirmation: "N3vermind"
  }
])

plan = Plan.create(
  name: "Pro",
  price: 17.99
)
