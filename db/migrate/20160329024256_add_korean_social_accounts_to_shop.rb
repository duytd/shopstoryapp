class AddKoreanSocialAccountsToShop < ActiveRecord::Migration
  def change
    add_column :shops, :naver, :string
    add_column :shops, :daum, :string
    add_column :shops, :kakao, :string
    add_column :shops, :yellow, :string
  end
end
