User.create!(
  username: "guest",
  password: "password"
)

10.times do
  Company.create!(
    name: Faker::Company.name + " " + Faker::Company.suffix,
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip: Faker::Address.zip,
    media_url: Faker::Company.logo,
    description: 
  )
end
