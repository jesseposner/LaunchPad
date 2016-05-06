class Api::OfferingsController < ApplicationController
  def create
    @offering = Offering.new(offering_params)
		@offering.save
    render nothing: true
  end

  private

  def offering_params
		params.require(:offering).permit(:price,
                                     :new_shares,
                                     :post_shares,
                                     :offering_date,
                                     :expiration_date,
                                     :company_id,
                                     :description
                                     )
	end
end
