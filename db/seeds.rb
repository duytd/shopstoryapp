unless Admin.exists?(email: "shopstoryxyz@gmail.com")
  Admin.create(
    email: "shopstoryxyz@gmail.com",
    password: ENV['ADMIN_PASSWORD'] || "N3vermind",
    password_confirmation: ENV['ADMIN_PASSWORD'] || "N3vermind",
  )
end

Plan.find_or_create_by(
  name: "Pro",
  price: 17.99
)
