class Api::UsersController < ApplicationController
  def create
		@user = User.new(user_params)
		if @user.save
			log_in!(@user)
			render :show
		else
			@errors = @user.errors.full_messages
			render "api/shared/error", status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:email,
                                 :password,
                                 :name,
                                 :street_address,
                                 :city,
                                 :state,
                                 :zip)
	end
end
