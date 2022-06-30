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

## Modelos de datos

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
        - `email *<string>*`
        - `password *<string>`
        - `genero *<string>*`
        - `direccion *<string>*`
        - `direccion2 *<string>*`
        - `codigoPostal *<number>*`
        - `telefono *<number>*`

- UPDATE
    - Ruta: `localhost:8000/api/usuarios/:usuarioId`
    - Método: `PUT`
    - Parámetro URL: `usuarioId`
    - Parámetro BODY:
        - `nombre *<string>*`
        - `apellidos *<string>*`
        - `email *<string>*`
        - `password *<string>`
        - `genero *<string>*`
        - `direccion *<string>*`
        - `direccion2 *<string>*`
        - `codigoPostal *<number>*`
        - `telefono *<number>*`

- DELETE
    - Ruta: `localhost:8000/api/usuarios/:usuarioId`
    - Método: `DELETE`
    - Parámetro URL: `usuarioId`

#### **Modelo Producto**
Las peticiones del modelo de Productos se lanzan de la siguiente manera:

- INDEX
    - Ruta: `localhost:8000/api/productos`
    - Método: `GET`

- VIEW
    - Ruta: `localhost:8000/api/productos/:productoId`
    - Método: `GET`
    - Parámetro URL: `productoId`

- CREATE
    - Ruta: `localhost:8000/api/productos`
    - Método: `POST`
    - Parámetro BODY:
        - `nombreProducto *<string>*`
        - `categoriaId *<number>*`
        - `imagen *<string>*`
        - `descripcionShort *<string>*`
        - `descripcion *<string>*`

- UPDATE
    - Ruta: `localhost:8000/api/productos/:productoId`
    - Método: `PUT`
    - Parámetro URL: `productoId`
    - Parámetro BODY:
        - `nombreProducto *<string>*`
        - `categoriaId *<number>*`
        - `imagen *<string>*`
        - `descripcionShort *<string>*`
        - `descripcion *<string>*`

- DELETE
    - Ruta: `localhost:8000/api/productos/:productoId`
    - Método: `DELETE`
    - Parámetro URL: `productoId`


#### **Modelo Categoria**
Las peticiones del modelo de Categorias se lanzan de la siguiente manera:

- INDEX
    - Ruta: `localhost:8000/api/categorias`
    - Método: `GET`

- VIEW
    - Ruta: `localhost:8000/api/categorias/:categoriaId`
    - Método: `GET`
    - Parámetro URL: `categoriaId`

- CREATE
    - Ruta: `localhost:8000/api/categorias`
    - Método: `POST`
    - Parámetro BODY:
        - `nombre *<string>*`

- UPDATE
    - Ruta: `localhost:8000/api/categorias/:categoriaId`
    - Método: `PUT`
    - Parámetro URL: `categoriaId`
    - Parámetro BODY:
        - `nombre *<string>*`

- DELETE
    - Ruta: `localhost:8000/api/categorias/:categoriaId`
    - Método: `DELETE`
    - Parámetro URL: `categoriaId`
        

        


