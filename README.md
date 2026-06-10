# Fotaza 2

Trabajo práctico integrador desarrollado para la materia **Programación Web II** de la carrera **Desarrollador de Software**.

## Descripción

Fotaza 2 es una plataforma web para compartir fotografías donde los usuarios pueden publicar imágenes, comentar, valorar contenido, seguir a otros usuarios y recibir notificaciones sobre las interacciones realizadas dentro de la aplicación.

El proyecto fue desarrollado utilizando Node.js, Express, PostgreSQL, Sequelize y Pug siguiendo una arquitectura MVC.

---

# Tecnologías utilizadas

## Backend

* Node.js
* Express
* Sequelize ORM
* PostgreSQL

## Frontend

* Pug
* Bootstrap 5
* Bootstrap Icons

---

# Dependencias principales

## Express

Framework utilizado para crear el servidor web y gestionar rutas.

## Sequelize

ORM utilizado para trabajar con PostgreSQL mediante modelos y relaciones.

## PostgreSQL

Sistema gestor de base de datos utilizado por la aplicación.

## Pug

Motor de plantillas utilizado para renderizar las vistas del servidor.

## Multer

Permite la carga de imágenes desde formularios HTML.

## Sharp

Utilizado para:

* Redimensionar imágenes
* Optimizar imágenes
* Aplicar marcas de agua automáticamente

## bcrypt

Utilizado para encriptar contraseñas antes de almacenarlas en la base de datos.

## express-session

Permite gestionar sesiones de usuarios autenticados.

## dotenv

Carga variables de entorno desde el archivo `.env`.

## Zod

Utilizado para validar formularios y datos ingresados por los usuarios.

---

# Arquitectura

El proyecto sigue el patrón:

MVC (Model - View - Controller)

Estructura principal:

```text
controllers/
models/
routes/
middlewares/
utils/
views/
public/
db/
```

---

# Funcionalidades implementadas

## Usuarios

* Registro de usuarios
* Inicio de sesión
* Cierre de sesión
* Perfil de usuario
* Avatar de usuario

## Publicaciones

* Crear publicaciones
* Subir fotografías
* Agregar descripción
* Asociar etiquetas
* Licencia Copyright
* Licencia Sin Copyright
* Marca de agua automática para fotografías protegidas

## Comentarios

* Crear comentarios
* Visualizar comentarios
* Asociación comentario-usuario

## Valoraciones

* Valorar fotografías
* Actualizar valoración existente
* Promedio automático de puntuaciones
* Conteo de valoraciones

## Seguimiento de usuarios

* Seguir usuarios
* Dejar de seguir usuarios
* Visualizar seguidores
* Visualizar seguidos

## Notificaciones

La aplicación genera notificaciones cuando:

* Un usuario comenta una fotografía
* Un usuario valora una fotografía
* Un usuario comienza a seguir a otro usuario

## Búsqueda

Permite buscar publicaciones utilizando filtros combinables:

* Título
* Descripción
* Etiquetas
* Autor
* Tipo de licencia

---

# Funcionalidades en desarrollo

Las siguientes funcionalidades forman parte del diseño de la aplicación y se encuentran en proceso de implementación:

* Mensajería privada entre usuarios
* Sistema de denuncias
* Colecciones/Favoritos
* Sistema "Me interesa"

---

# Usuarios de prueba

## Administrador

Email:

```text
admin@test.com
```

Contraseña:

```text
123456
```

---

## Usuario estándar

Email:

```text
fernando@test.com
```

Contraseña:

```text
123456
```

---

# Instalación

## 1. Clonar repositorio

```bash
git clone https://github.com/Fernando-Suarez/fotaza2.git
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crear un archivo:

```text
.env
```

utilizando como referencia:

```text
.env.example
```

---

## 4. Inicializar base de datos

```bash
npm run db:init
```

Este comando:

* Crea las tablas necesarias
* Configura relaciones
* Inserta datos iniciales

---

## 5. Ejecutar aplicación

```bash
npm start
```

La aplicación quedará disponible en:

```text
http://localhost:3000
```

---

# Variables de entorno

Ejemplo:

```env
PORT=3000

DB_NAME=nombre_base_de_datos
DB_USER=usuario_bd
DB_PASSWORD=password_bd
DB_HOST=localhost
DB_PORT=5432

SESSION_KEY=session_secret
```

---

# Repositorio

GitHub:

```text
https://github.com/Fernando-Suarez/fotaza2
```

---

# Autor

Fernando Suarez

Trabajo práctico integrador realizado para la materia Programación Web II.
