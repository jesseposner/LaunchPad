class AddPostSharesToOfferings < ActiveRecord::Migration
  def change
    rename_column :offerings, :total_shares, :new_shares
    add_column :offerings, :post_shares, :integer, null: false
  end
end
