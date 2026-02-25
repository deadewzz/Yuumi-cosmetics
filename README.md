Este es el sistema de gestión de usuarios para Yuumi Cosmetics, desarrollado con Node.js, Express y MySQL.

Shutterstock
Explorar

Características
Gestión de Usuarios: Permite registrar nuevos usuarios.

API RESTful: Endpoints para listar, actualizar y eliminar usuarios.

Base de Datos: Integración con MySQL para almacenamiento persistente.

Diseño Moderno: Interfaz con estilo glassmorphism y diseño responsivo.

Tecnologías utilizadas
Backend: Node.js y Express

Base de Datos: MySQL

Motor de plantillas/Frontend: HTML5 y CSS3

Dependencias: mysql2, dotenv, cors

Requisitos previos
Tener instalado Node.js.

Tener un servidor MySQL configurado (ej. XAMPP o MySQL Workbench).

Un editor de código (se recomienda VS Code).

Instalación
Clona el repositorio:

Bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Instala las dependencias:

Bash
npm install
Configura las variables de entorno:
Crea un archivo llamado .env en la raíz del proyecto y añade tus credenciales:

Ejecuta el servidor:

Bash
node index.js
El servidor se iniciará en http://localhost:3000

🔑 Autenticación y Registro
[POST] /api/register

Descripción: Crea un nuevo usuario en la base de datos.

Payload requerido: {"nombre": "...", "correo": "...", "contrasena": "..."}

Gestión de Usuarios
[GET] /api/users

Descripción: Obtiene la lista completa de usuarios registrados.

[PUT] /api/users/update

Descripción: Actualiza los datos de un usuario existente.

[DELETE] /api/users/delete

Descripción: Elimina un usuario mediante su id_usuario.

