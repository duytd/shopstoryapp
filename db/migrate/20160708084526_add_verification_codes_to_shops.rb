class AddVerificationCodesToShops < ActiveRecord::Migration
  def change
    add_column :shops, :google_verification_code, :string
    add_column :shops, :naver_verification_code, :string
  end
end
