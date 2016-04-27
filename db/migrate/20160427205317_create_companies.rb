class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.integer :zip, null: false
      t.string :media_url, null: false
      t.text :description, null: false
      t.text :business_plan, null: false

      t.timestamps null: false
    end
  end
end
