class Api::InvestmentsController < ApplicationController
  def create
    @investment = Investment.new(investment_params)
		if @investment.save
      offering = Offering.find_by_id(investment_params[:offering_id])
      @company = Company.includes(:foundings,
                                  :founders,
                                  :investors,
                                  :offerings,
                                  :investments)
                        .find_by_id(offering.company.id)
      render "api/companies/show"
		else
			@errors = @investment.errors.full_messages
			render "api/shared/error", status: 422
		end
  end

  private

  def investment_params
		params.require(:investment).permit(:user_id,
                                       :offering_id,
                                       :shares)
	end
end
