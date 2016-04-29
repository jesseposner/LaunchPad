class CreateFounders < ActiveRecord::Migration
  def change
    create_table :founders do |t|
      t.string :name, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.integer :zip, null: false
      t.integer :user_id, null: false
      t.integer :company_id, null: false

      t.timestamps null: false
    end

    add_index :founders, :user_id
    add_index :founders, :company_id
  end
end
