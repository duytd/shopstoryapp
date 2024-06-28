#!/bin/bash
bundle exec rake db:migrate
bundle exec shoryuken -d -R -C config/shoryuken.yml --logfile shoryuken.log
bundle exec rails s -b 0.0.0.0
