![alt text](frontend/public/image/logo.png)

# Cocina De Antano
Proyecto final desarrollado para el Bootcamp Fullstack Web Develop de CodeSpace décima edición.

## Instalación del proyecto
### Base de datos
El proyecto consta de 1 contenedor Docker.
Desde la raiz de la aplicación utilizar el comando 
```php
docker-compose up -d
```
Una vez levantado el contenedor puedes acceder a la base de datos desde la url:
```php
localhost:27017/cocinaDeAntano
```
Utilizando cualquier gestor de base de datos como MongoDB Compass o desde el propio terminal, debemos crear la base de datos con el nombre **cocinaDeAntano** y 3 colecciones con los nombres **categorias**, **productos** y **users**.

En la carpeta db del proyecto, adjunto los 3 jsons para que podáis importar los datos que muestro en el video en las distintas colecciones.

### Backend
El proyecto de backend utiliza 2 librerías, expressjs y mongoose y por defecto nodeJS escucha en el puerto 8008.
Para instalar las dependencias escribir el siguiente comando dentro del directorio backend:
```javascript
npm install
```
Para que la aplicación backend funcione, debemos crear un archivo llamado .env en la raiz del proyecto backend con la siguiente estructura:
```env
# General
LISTEN_PORT=8008

# Database
DB_PORT=27017
DB_USER=
DB_PASSWORD=
DB_NAME=cocinaDeAntano

# JWT
TOKEN_SECRET=Pegar aquí el token secreto de JWT
```


### Frontend
El proyecto de frontend utiliza el framework NextJS para el manejo más simple de rutas.
Para instalar el proyecto de front hay que utilizar el siguiente comando:
```javascript
npm install
```
Y una vez instaladas todas las dependencias ejecutar lo siguiente para arrancar la aplicación:
```javascript
npm run dev
```
La URL de la aplicación es:
```javascript
http://localhost:3000
```

## Modelos de datos

#### **Modelo Usuario**
Las peticiones del modelo de Usuarios se lanzan de la siguiente manera:

- INDEX
    - Ruta: `localhost:8008/api/usuarios`
    - Método: `GET`
    - Headers: 
        - `auth-token: JWT client token`

- VIEW
    - Ruta: `localhost:8008/api/usuarios/:usuarioId`
    - Método: `GET`
    - Headers: 
        - `auth-token: JWT client token`
    - Parámetro URL: `usuarioId`

- CREATE
    - Ruta: `localhost:8008/api/usuarios`
    - Método: `POST`
    - Headers: 
        - `auth-token: JWT client token`
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
    - Ruta: `localhost:8008/api/usuarios/:usuarioId`
    - Método: `PUT`
    - Headers: 
        - `auth-token: JWT client token`
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
    - Ruta: `localhost:8008/api/usuarios/:usuarioId`
    - Método: `DELETE`
    - Headers: 
        - `auth-token: JWT client token`
    - Parámetro URL: `usuarioId`

- LOGIN
    - Ruta: `localhost:8008/api/login`
    - Método: `POST`
    - Parámetro BODY:
        - `email *<string>*`
        - `password *<string>`

- REGISTRO
    - Ruta: `localhost:8008/api/registro`
    - Método: `POST`
    - Parámetro BODY:
        - `email *<string>*`
        - `password *<string>`

- DETALLES DEL MODELO
    ```javascript
    {
        id: Number,
        nombre: String,
        apellidos: String,
        email: String,
        password: String,
        genero: String,
        direccion: String,
        direccion2: String,
        codigoPostal: Number,
        telefono: String
    }
    ```
#### **Modelo Producto**
Las peticiones del modelo de Productos se lanzan de la siguiente manera:

- INDEX
    - Ruta: `localhost:8008/api/productos`
    - Método: `GET`

- INDEX BY CATEGORY
    - Ruta: `localhost:8008/api/productos/cat/:categoriaId`
    - Parámetro URL: `categoriaId`
    - Método: `GET`

- LATEST PRODUCTS
    - Ruta: `localhost:8008/api/productos/novedades`
    - Método: `GET`

- VIEW
    - Ruta: `localhost:8008/api/productos/:productoId`
    - Método: `GET`
    - Parámetro URL: `productoId`

- CREATE
    - Ruta: `localhost:8008/api/productos`
    - Método: `POST`
    - Parámetro BODY:
        - `nombreProducto *<string>*`
        - `categoriaId *<number>*`
        - `imagen *<string>*`
        - `descripcionShort *<string>*`
        - `descripcion *<string>*`
        - `precio *<number>*`

- UPDATE
    - Ruta: `localhost:8008/api/productos/:productoId`
    - Método: `PUT`
    - Parámetro URL: `productoId`
    - Parámetro BODY:
        - `nombreProducto *<string>*`
        - `categoriaId *<number>*`
        - `imagen *<string>*`
        - `descripcionShort *<string>*`
        - `descripcion *<string>*`
        - `precio *<number>*`

- DELETE
    - Ruta: `localhost:8008/api/productos/:productoId`
    - Método: `DELETE`
    - Parámetro URL: `productoId`


- DETALLES DEL MODELO
    ```javascript
    {
        id: Number,
        nombreProducto: String,
        categoriaId: Number,
        imagen: String,
        descripcionShort: String,
        descripcion: String,
        precio: Number
    }
    ```

#### **Modelo Categoria**
Las peticiones del modelo de Categorias se lanzan de la siguiente manera:

- INDEX
    - Ruta: `localhost:8008/api/categorias`
    - Método: `GET`

- VIEW
    - Ruta: `localhost:8008/api/categorias/:categoriaId`
    - Método: `GET`
    - Parámetro URL: `categoriaId`

- CREATE
    - Ruta: `localhost:8008/api/categorias`
    - Método: `POST`
    - Parámetro BODY:
        - `nombre *<string>*`
        - `imagen *<string>*`

- UPDATE
    - Ruta: `localhost:8008/api/categorias/:categoriaId`
    - Método: `PUT`
    - Parámetro URL: `categoriaId`
    - Parámetro BODY:
        - `nombre *<string>*`
        - `imagen *<string>*`

- DELETE
    - Ruta: `localhost:8008/api/categorias/:categoriaId`
    - Método: `DELETE`
    - Parámetro URL: `categoriaId`

- DETALLES DEL MODELO
    ```javascript
    {
        id: Number,
        nombre: String,
        imagen: String
    }
    ```

        


