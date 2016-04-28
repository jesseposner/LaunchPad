class Api::CompaniesController < ApplicationController
  def index
    @companies = Company.all
  end

  def create
    @company = Company.new(company_params)
		if @company.save
			render :show
		else
			@errors = @company.errors.full_messages
			render "api/shared/error", status: 422
		end
  end

  def show
    @company = Company.find_by_id(params[:id])

    if @company
      render :show
    else
      @errors = ['company does not exist']
      render "api/shared/error", status: 404
    end
  end

  private

	def company_params
		params.require(:company).permit(
      :name,
      :street_address,
      :city,
      :state,
      :zip,
      :media_url,
      :description,
      :business_plan
    )
	end
end
