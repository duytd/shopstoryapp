namespace :symlinks do
  task inicis_server: :environment do
    gem_path = Gem.loaded_specs['inicis-standard-rails'].full_gem_path
    exec  "ln -s #{gem_path + "/server/"} #{Rails.root}/inicis"
  end

  task kakao_server: :environment do
    gem_path = Gem.loaded_specs['kakao_shopstory'].full_gem_path
    exec  "ln -s #{gem_path + "/server/"} #{Rails.root}/kakao"
  end
end
