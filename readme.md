# Craftsy 3.0 (2021)
Sitio de referencia creado durante la cursada de las comisiones 6, 9 y 10 del curso de Full Stack Developer de la Fundación Formar
## Instalación y puesta en marcha
- Luego de CLONAR el proyecto con `git clone https://github.com/EricM76/crafsty3.0.git` entrar a la carpeta __craftsy3.0__
- Instalar las dependencias con `npm install`
    - Las siguientes dependencias serán instaladas solo en desarrollo:
        - (The Sequelize Command Line Interface (CLI))[https://www.npmjs.com/package/sequelize-cli]
        - (Nodemon)[https://www.npmjs.com/package/nodemon]
        - (Node-sass)[https://www.npmjs.com/package/node-sass]
- Abrir el proyecto con el editor de preferencia, como por ejemplo (VSCode)[https://code.visualstudio.com/], y crear en la carpeta raíz un archivo llamado __.env__
- En archivo __.env__ crear las siguientes variables de entorno:
~~~
DB_USERNAME=
DB_PASSWORD= 
DB_DATABASE=craftsy_db
DB_HOST=127.0.0.1
DB_PORT=3306
~~~
*Como valor de __DB_USERNAME__ y __DB_PASSWORD__ escribir las credenciales de su sistema de gestion de base de datos*
- Crear la base datos con el comando: `sequelize db:create`
- Correr las migraciones con el comando : `sequelize db:migrate`
- Correr los seeders con el comando : `sequelize db:seed:all`
- Levantar el servidor de desarrollo con el comando : `npm run dev`
### Carrito
##### Vista
