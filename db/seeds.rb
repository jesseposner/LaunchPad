User.create!(
  email: "guest@launchpad.com",
  password: "password",
  name: Faker::Name.name ,
  street_address: Faker::Address.street_address,
  city: Faker::Address.city,
  state: Faker::Address.state_abbr,
  zip: Faker::Address.zip
)

5.times do
  User.create(
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    name: Faker::Name.name,
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip: Faker::Address.zip
  )
end

5.times do
  Company.create(
    name: Faker::Company.name,
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip: Faker::Address.zip,
    media_url: Faker::Company.logo,
    description: Faker::Company.catch_phrase +
                 " and " +
                 Faker::Company.catch_phrase.downcase +
                 ", with " +
                 Faker::Company.catch_phrase.downcase +
                 ".",
    business_plan: Faker::Hipster.paragraphs(5)
  )
end

5.times do |i|
  Founding.create!(
    user_id: i + 1,
    company_id: i + 1
  )
end

5.times do |i|
  new_shares = rand(100000..5000000)

  Offering.create!(
    price: rand(0.9).round(5),
    new_shares: new_shares,
    post_shares: new_shares + 10000000,
    offering_date: Faker::Date.backward(100),
    expiration_date: Faker::Date.forward(100),
    company_id: i + 1,
    description: ["Series A", "Seed", "Bridge", "Series B"].sample
  )
end

5.times do |i|
  Investment.create!(
    shares: rand(50000),
    user_id: i + 1,
    offering_id: i + 1
  )
end
