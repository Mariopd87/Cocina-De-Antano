# Cocina-De-Antano
Proyecto final desarrollado para el Bootcamp Fullstack Web Develop de CodeSpace décima edición.

## Instalación del proyecto
### Base de datos
El proyecto consta de 1 contenedor Docker.
Desde la raiz de la aplicación utilizar el comando 
```php
docker-compose up -d
```
Una vez levantado el contenedor puedes acceder a la base de datos desde la url 
```php
localhost:27017/cocinaDeAntano
```
### Backend
El proyecto de backend utiliza 2 librerías, expressjs y mongoose y por defecto nodeJS escucha en el puerto 8000.
Para instalar las dependencias escribir el siguiente comando dentro del directorio backend:
```javascript
npm install
```

#### **Modelo Usuario**
Las peticiones del modelo de Usuarios se lanzan de la siguiente manera:

- INDEX
    - Ruta: `localhost:8000/api/usuarios`
    - Método: `GET`

- VIEW
    - Ruta: `localhost:8000/api/usuarios/:usuarioId`
    - Método: `GET`
    - Parámetro URL: `usuarioId`

- CREATE
    - Ruta: `localhost:8000/api/usuarios`
    - Método: `POST`
    - Parámetro BODY:
        - `nombre *<string>*`
        - `apellidos *<string>*`