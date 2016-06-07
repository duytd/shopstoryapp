# Change these
server "188.166.233.60", port: 22, roles: [:web, :app, :db], primary: true

set :repo_url,        "git@bitbucket.org:duytd/shopstoryapp.git"
set :application,     "shopstory"
set :user,            "deploy"
set :puma_threads,    [1, 1]
set :puma_workers,   2
set :puma_worker_timeout, 60

# Don"t change these unless you know what you"re doing
set :pty,             false
set :use_sudo,        false
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }
set :puma_preload_app, false
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :nginx_use_ssl, false
set :nginx_config_name, "shopstory"

## Defaults:
set :scm,           :git
set :format,        :pretty
# set :log_level,     :debug
set :keep_releases, 3

## Linked Files & Directories (Default None):
set :linked_files, %w{config/database.yml config/application.yml}
set :linked_dirs,  %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/uploads public/system keys qrcodes node_modules}

namespace :puma do
  desc "Create Directories for Puma Pids and Socket"
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/#{fetch(:branch)}`
        puts "WARNING: HEAD is not the same as origin/#{fetch(:branch)}"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc "Initial Deploy"
  task :initial do
    on roles(:app) do
      before "deploy:restart", "puma:start"
      invoke "deploy"
    end
  end

  desc "Symlinks application"
  task :symlinks do
    on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, "symlinks:inicis_server"
          execute :rake, "symlinks:kakao_server"
        end
      end
    end
  end

  task :fix_permissions do
   on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :sudo, "chmod 777 -R #{current_path}/kakao/log"
        end
      end
    end
  end

  desc "Install npm packages"
  task :npm_install do
    on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, "npm:install"
        end
      end
    end
  end

  desc "Update js routes"
  task :update_routes do
    on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, "js:routes"
        end
      end
    end
  end

  desc "Restart application"
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke "puma:restart"
    end
  end

  desc "Clean bundle"
  task :bundle_clean do
    on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :bundle, :clean
        end
      end
    end
  end

  Rake::Task["deploy:compile_assets"].clear

  desc "Precompile assets locally and then rsync to web servers"
  task :compile_assets do
    on roles(:web) do
      rsync_host = host.to_s

      run_locally do
        with rails_env: fetch(:rails_env) do
          execute :bundle, "exec rake assets:precompile"
        end
        execute "rsync -av --delete ./public/assets/ #{fetch(:user)}@#{rsync_host}:#{shared_path}/public/assets/"
        execute "rm -rf public/assets"
      end
    end
  end

  before "deploy:assets:precompile",    :npm_install
  before "deploy:assets:precompile",    :update_routes
  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :symlinks
  after  :finishing,    :fix_permissions
  after  :finishing,    :cleanup
  after  :finishing,    :restart
  after  :cleanup,      :bundle_clean
end

# ps aux | grep puma    # Get puma pid
# kill -s SIGUSR2 pid   # Restart puma
# kill -s SIGTERM pid   # Stop puma
