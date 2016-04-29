class CreateOfferings < ActiveRecord::Migration
  def change
    create_table :offerings do |t|
      t.float :price, null: false
      t.integer :total_shares, null: false
      t.date :offering_date, null: false
      t.date :expiration_date, null: false
      t.integer :company_id, null: false
      t.string :description, null: false

      t.timestamps null: false
    end

    add_index :offerings, :company_id
  end
end
