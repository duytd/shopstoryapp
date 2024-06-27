# == Schema Information
#
# Table name: public.users
#
#  id                     :integer          not null, primary key
#  address                :string
#  city                   :string
#  company                :string
#  country                :string
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  first_name             :string
#  free                   :boolean          default(FALSE)
#  last_name              :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  locale                 :string
#  phone                  :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  setup_step             :integer          default(0)
#  sign_in_count          :integer          default(0), not null
#  type                   :string
#  zip_code               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  stripe_id              :string
#
# Indexes
#
#  index_users_on_email                 (email)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class Admin < User
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable

  def admin?
    true
  end
end
