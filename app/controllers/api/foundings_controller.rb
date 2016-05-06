class Api::FoundingsController < ApplicationController
  def create
    @founding = Founding.new(founding_params)
		@founding.save
    render nothing: true
  end

  private

  def founding_params
		params.require(:founding).permit(:user_id,
                                     :company_id)
	end
end
