# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "http://www.singularcart.com"

SitemapGenerator::Sitemap.create do
  add "/register/signup", :changefreq => "weekly"
  add "/login", :changefreq => "weekly"
end
