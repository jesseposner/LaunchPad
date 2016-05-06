class StaticPagesController < ApplicationController
  def root
    @images = {
      logo: path_to_asset('logo.png'),
      placeholder: path_to_asset('placeholder.png')
    }
  end

  private

  def path_to_asset(asset)
    ApplicationController.helpers.asset_path(asset)
  end
end
