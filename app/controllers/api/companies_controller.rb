class Api::CompaniesController < ApplicationController
  def index
    if params[:total]
      @total = Company.all.length
      render :total
    elsif params[:query]
      t = Company.arel_table
      @companies = Company.where(t[:name].matches(params[:query] + '%'))
                          .limit(10)
      render :index
    else
      range_start = Company.all.last.id - (params[:page].to_i * 20)
      range_end = range_start + 20
      @companies = Company.where(id: range_start..range_end)
      render :index
    end
  end

  def create
    @company = Company.new(
      name: company_params[:name],
      street_address: company_params[:street_address],
      city: company_params[:city],
      state: company_params[:state],
      zip: company_params[:zip],
      media_url: company_params[:media_url],
      description: company_params[:description],
      business_plan: "[\"" + company_params[:business_plan] + "\"]"
    )
		if @company.save
      @offering = Offering.new(
        price: company_params[:offering][:price],
        new_shares: company_params[:offering][:new_shares],
        post_shares: company_params[:offering][:post_shares],
        offering_date: company_params[:offering][:offering_date],
        expiration_date: company_params[:offering][:expiration_date],
        company_id: @company.id,
        description: company_params[:offering][:description]
      )
  		@offering.save

      @founding = Founding.new(
        user_id: current_user.id,
        company_id: @company.id
      )
  		@founding.save

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
      :business_plan,
      offering: [:price,
                 :new_shares,
                 :post_shares,
                 :offering_date,
                 :expiration_date,
                 :description]
    )
	end
end
