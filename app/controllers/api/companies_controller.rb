class Api::CompaniesController < ApplicationController
  def index
    if params[:total]
      @total = Company.all.length
      render :total
    else
      range_end = params[:page].to_i * 20
      range_start = range_end - 19
      @companies = Company.where(id: range_start..range_end)
      render :index
    end
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
    @company = Company.includes(:foundings,
                                :founders,
                                :investors,
                                :offerings,
                                :investments)
                      .find_by_id(params[:id])

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
