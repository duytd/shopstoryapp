class CustomPageService
  SAMPLE_DATA_PATH = "#{Rails.root}/sample_data/custom_pages"

  def initialize params
    @shop = params[:shop]
  end

  def create_initial_data
    @shop.term = create_term_page
    @shop.privacy = create_privacy_page
    @shop.save
  end

  def create_term_page
    term_content_en = File.read "#{SAMPLE_DATA_PATH}/terms_conditions.en.html"
    term_content_ko = File.read "#{SAMPLE_DATA_PATH}/terms_conditions.ko.html"

    CustomPage.create(
      title_en: "Terms and Conditions",
      title_ko: "이용약관 및 규칙",
      content_en: term_content_en,
      content_ko: term_content_ko
    )
  end

  def create_privacy_page
    privacy_content_en = File.read "#{SAMPLE_DATA_PATH}/privacy_policy.en.html"
    privacy_content_ko = File.read "#{SAMPLE_DATA_PATH}/privacy_policy.ko.html"

    CustomPage.create(
      title_en: "Privacy Policy",
      title_ko: "개인정보 취급방침 및 청소년보호정책",
      content_en: privacy_content_en,
      content_ko: privacy_content_ko
    )
  end
end
