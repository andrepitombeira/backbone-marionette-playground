class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :login
      t.string :password_digest
      t.string :token
      t.datetime :token_expires_at

      t.timestamps null: false
    end
  end
end
