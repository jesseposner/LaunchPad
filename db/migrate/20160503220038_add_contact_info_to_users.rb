class AddContactInfoToUsers < ActiveRecord::Migration
  def change
    rename_column :users, :username, :email
    rename_column :investments, :investor_id, :user_id
    add_column :users, :name, :string, null: false
    add_column :users, :street_address, :string, null: false
    add_column :users, :city, :string, null: false
    add_column :users, :state, :string, null: false
    add_column :users, :zip, :string, null: false
    remove_column :founders, :name
    remove_column :founders, :street_address
    remove_column :founders, :city
    remove_column :founders, :state
    remove_column :founders, :zip
    rename_table :founders, :foundings
  end
end
