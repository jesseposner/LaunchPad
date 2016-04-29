class CreateInvestments < ActiveRecord::Migration
  def change
    create_table :investments do |t|
      t.integer :shares, null: false
      t.integer :investor_id, null: false
      t.integer :offering_id, null: false

      t.timestamps null: false
    end

    add_index :investments, :investor_id
    add_index :investments, :offering_id
  end
end
