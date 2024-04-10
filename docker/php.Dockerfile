FROM php:8.1-apache

# Install the PostgreSQL extension
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Restart Apache to apply changes
RUN service apache2 restart
