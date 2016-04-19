module FakerGenerator
  def self.random_customer
    Customer.new(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email
    )
  end

  def self.random_shop
    Shop.new(
      name: Faker::Company.name
    )
  end
end
