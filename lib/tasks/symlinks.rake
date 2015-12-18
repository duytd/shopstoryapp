namespace :symlinks do
  task inicis_server: :environment do
    gem_path = Gem.loaded_specs['inicis-standard-rails'].full_gem_path
    exec  "sudo ln -s #{gem_path + "/server/"} #{Rails.root}"
  end
end
