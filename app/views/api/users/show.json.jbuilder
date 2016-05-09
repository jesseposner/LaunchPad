json.extract! @user, :id, :email

json.foundings @user.foundings do |founding|
  json.company_name founding.company.name
  json.company_id   founding.company.id
end

json.investments @user.investments do |investment|
  json.company_name investment.company.name
  json.company_id   investment.company.id
end
