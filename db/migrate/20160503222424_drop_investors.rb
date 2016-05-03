class DropInvestors < ActiveRecord::Migration
  def change
    drop_table :investors
  end
end
