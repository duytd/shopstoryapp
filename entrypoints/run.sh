#!/bin/bash
bundle exec shoryuken -d -R -C config/shoryuken.yml --logfile shoryuken.log
bundle exec rails s -b 0.0.0.0
exec "$@"
