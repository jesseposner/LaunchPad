json.extract! @company, :id,
                        :name,
                        :street_address,
                        :city,
                        :state,
                        :zip,
                        :media_url,
                        :description,
                        :business_plan,
                        :founders,
                        :investors,
                        :offerings

offering = @company.offerings[0]

json.raised (offering.investments.map(&:shares).inject(:+) *
            offering.price).round

json.offering_date offering.offering_date.strftime('%A, %B %-d, %Y')
json.expiration_date offering.expiration_date.strftime('%A, %B %-d, %Y')
