FROM ruby:2.7.0-slim

ENV BUNDLER_VERSION=2.1.2
ENV SKIP_YARN_COREPACK_CHECK=0
ENV INSTALL_PATH=/var/app

RUN mkdir -p $INSTALL_PATH
RUN apt-get update && apt-get install -y gnupg2
ADD https://dl.yarnpkg.com/debian/pubkey.gpg /tmp/yarn-pubkey.gpg
RUN apt-key add /tmp/yarn-pubkey.gpg && rm /tmp/yarn-pubkey.gpg
RUN echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -qq -y --no-install-recommends \
      build-essential \
      zlib1g-dev liblzma-dev patch \
      imagemagick \
      curl \
      wkhtmltopdf \
      libpq-dev \
      shared-mime-info
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get update && apt-get install -qq -y --no-install-recommends nodejs yarn

RUN gem install bundler -v 2.1.2
WORKDIR /var/app
COPY Gemfile Gemfile.lock ./
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle check || bundle install
COPY package.json yarn.lock ./
RUN yarn install --check-files
COPY . ./

# Compile assets
RUN bundle exec rails assets:precompile
