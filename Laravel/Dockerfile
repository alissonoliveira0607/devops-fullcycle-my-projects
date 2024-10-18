FROM php:7.4-cli

WORKDIR /var/www 

EXPOSE 8000

RUN apt update -y && \
    apt install -y curl jq telnet wget git libzip-dev && \
    docker-php-ext-install zip


RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"  && \
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
php composer-setup.php --version=2.3.10 && \
php -r "unlink('composer-setup.php');"

# Comando
RUN php composer.phar create-project --prefer-dist laravel/laravel devops

#USER www-data

# O Entrypoint é imutavel
ENTRYPOINT [ "php", "devops/artisan", "serve" ]

# O CMD pode receber parametros e argumento com isso a imagem irá possuir um dinamicidade maior
CMD [ "--host=0.0.0.0", "--port=8000" ]

