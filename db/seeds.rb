User.create!(
  username: "guest",
  password: "password"
)

100.times do
  User.create!(
    username: Faker::Internet.user_name,
    password: Faker::Internet.password
  )
end

101.times do
  Company.create!(
    name: Faker::Company.name + " " + Faker::Company.suffix,
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

100.times do |i|
  Founder.create!(
    name: Faker::Name.name,
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip: Faker::Address.zip,
    user_id: i + 1,
    company_id: i + 1
  )
end
