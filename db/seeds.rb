unless Admin.exists?(email: "admin@singularcart.com")
  Admin.create(
    email: "admin@singularcart.com",
    password: ENV['ADMIN_PASSWORD'] || "N3vermind",
    password_confirmation: ENV['ADMIN_PASSWORD'] || "N3vermind",
  )
end

Plan.find_or_create_by(
  name: "Pro",
  price: 17.99
)
