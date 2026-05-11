#!/bin/bash
set -e

echo "1. Adding Microsoft package repository keys..."
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor --yes -o /usr/share/keyrings/microsoft-prod.gpg
curl -fsSL https://packages.microsoft.com/config/ubuntu/26.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list > /dev/null

echo "2. Updating package lists..."
sudo apt-get update

echo "3. Installing Microsoft ODBC driver and tools..."
sudo ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18

echo "4. Installing PHP dev dependencies and unixODBC..."
sudo apt-get install -y unixodbc-dev php-dev php-pear php-xml build-essential

echo "5. Installing sqlsrv and pdo_sqlsrv PHP extensions via PECL..."
sudo pecl install sqlsrv
sudo pecl install pdo_sqlsrv

echo "6. Enabling the extensions for PHP CLI..."
# We use php -i to find the exact configuration directory, usually /etc/php/8.5/cli/conf.d
PHP_V=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
sudo bash -c "echo 'extension=sqlsrv.so' > /etc/php/$PHP_V/cli/conf.d/20-sqlsrv.ini"
sudo bash -c "echo 'extension=pdo_sqlsrv.so' > /etc/php/$PHP_V/cli/conf.d/20-pdo_sqlsrv.ini"

# also enable for apache/fpm if they exist, but suppressing errors
sudo bash -c "echo 'extension=sqlsrv.so' > /etc/php/$PHP_V/fpm/conf.d/20-sqlsrv.ini" 2>/dev/null || true
sudo bash -c "echo 'extension=pdo_sqlsrv.so' > /etc/php/$PHP_V/fpm/conf.d/20-pdo_sqlsrv.ini" 2>/dev/null || true
sudo bash -c "echo 'extension=sqlsrv.so' > /etc/php/$PHP_V/apache2/conf.d/20-sqlsrv.ini" 2>/dev/null || true
sudo bash -c "echo 'extension=pdo_sqlsrv.so' > /etc/php/$PHP_V/apache2/conf.d/20-pdo_sqlsrv.ini" 2>/dev/null || true

echo "7. Restarting any running PHP local servers (if any)..."
pkill -f "php -S" || true

echo "Installation complete! Verifying..."
php -m | grep sqlsrv || echo "Failed to find sqlsrv module"
