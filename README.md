# Prueba Técnica Flexxus

Este repositorio contiene los ejercicios de la prueba técnica de Flexxus. La prueba incluye ejercicios de JavaScript y SQL, con el objetivo de demostrar las habilidades en desarrollo backend utilizando Node.js y otros lenguajes.

## Estructura del Proyecto

La estructura de carpetas es la siguiente:
```
prueba-tecnica-flexxus
│     
├── back
|   │ 
|   |___prisma
|   |   └── schema.prisma
│   |
│   |___src
│       |___aticles
|       |   |___articles.module.ts
│       |   |___articles.controller.ts
│       |   |___articles.service.ts
│       |   |___dtos
│       |       |___createArticle.dto.ts
│       |       |___updateArticle.dto.ts
│       |
│       |___auth
|       |   |___auth.module.ts
│       |   |___auth.controller.ts
│       |   |___auth.service.ts
│       |
│       |___decorators
|       |   |___roles.decorators.ts
│       |
│       |___guards
|       |   |___auth.guards.ts
|       |   |___roles.guards.ts
│       |
│       |___middlewares
|       |   |___logger.middleware.ts
│       |
│       |___users
|       |   |___users.module.ts
│       |   |___users.controller.ts
│       |   |___users.service.ts
│       |   |___dtos
│       |       |___createUser.dto.ts
│       |       |___updateUser.dto.ts
|       |
|       |___utils
|       |   |___matchPassword.ts
|       |
│       |___app.module.ts
│       |___main.ts
|       |___prisma.module.ts
|       |___prisma.service.ts
|   
└── exercises
    |
    |__exercise-SQL
    |  |__exercise-01.js (Ejercicio 1) 
    |  |__exercise-02.js (Ejercicio 2) 
    |  |__exercise-03.js (Ejercicio 3) 
    |  |__exercise-04.js (Ejercicio 4)
    |  |__exercise-05.js (Ejercicio 5)
    |  |__exercise-06.js (Ejercicio 6)
    |  |__exercise-07.js (Ejercicio 7)
    |  |__exercise-08.js (Ejercicio 8)
    |  |__exercise-09.js (Ejercicio 9)
    |  |__exercise-10.js (Ejercicio 10)
    |  |__exercise-11.js (Ejercicio 11)
    |    
    ├── exercise-01.js (Ejercicio 1) 
    ├── exercise-02.js (Ejercicio 2) 
    ├── exercise-03.js (Ejercicio 3) 
    └── exercise-04.js (Ejercicio 4)
```

- **back/**: Contendrá el backend que implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en un servidor Node.js.
- **exercises/**: Contiene los ejercicios específicos de la prueba técnica, organizados por número.

## Ejercicios

### Ejercicio 1: Mostrar los números impares entre el 0 y el 100
- Crear un algoritmo que muestre los números impares entre el 0 y el 100.

### Ejercicio 2: Sueldos de operarios
- Ingresar los sueldos de 5 operarios en un vector y crear un método para imprimir los sueldos.

### Ejercicio 3: Datos de los alumnos
- Plantear una clase llamada Alumno y definir como atributos su nombre y su edad. En el constructor realizar el ingreso de datos. Definir otros dos métodos para imprimir los datos ingresados y un mensaje si es mayor o no de edad (edad >= 18)

### Ejercicio 4: Filtración de elementos no repetidos
- JavaScript ES6: Dados los siguientes array, imprimir por consola los elementos del array “y” que no se encuentran en el array “x” utilizando para tal fin una única línea de código. const x = ["n", "bro", "c", "|"]; const y = ["d", "n", "l", "bro", "g"];

### Nota: Para problar los ejercicios de SQL, se puede utilizar en la consola de la base de datos, por ejemplo, PostgreSQL.

## Requisitos

1. Tener instalado [Node.js](https://nodejs.org/).
2. Usar la terminal para ejecutar los archivos JS.

## Cómo probar los ejercicios

1. Clona este repositorio a tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/prueba-tecnica-flexxus.git

2. Ve a la carpeta de los ejercicios:

 - cd prueba-tecnica-flexxus/exercises

3. Ejecuta el archivo correspondiente al ejercicio que queremos probar, por ejemplo:
-  node exercise-01.js 

## Backend

### Deploy

Backend desplegado con Render.

### Documentación de la API con Swagger

Documentación detallada de la API se encuentra disponible en el siguiente enlace:

https://prueba-tecnica-flexxus.onrender.com/api


También se puede acceder a la documentación de la API de forma local, ejecutando el siguiente comando:

```bash
git clone https://github.com/tu-usuario/prueba-tecnica-flexxus.git
cd back
npm install
npm run start:dev
```
Y luego accediendo a la siguiente URL en tu navegador:

http://localhost:3001/api

### Nota: Asegurese de tener instalado Node.js y npm en su máquina y de modificar el puerto en el archivo `back/src/main.ts` para que coincida con el que se está ejecutando el servidor. Ademas, deberas tener configurado el archivo `.env` con las credenciales de la base de datos.

## Base de datos: PostgreSQL

### ORM: Prisma

Para la base de datos se ha utilizado PostgreSQL, que se puede instalar en Windows, Mac y Linux siguiendo las instrucciones de la documentación oficial de PostgreSQL: 
https://www.postgresql.org/download/

### Deploy en Render

### Si quieres trabajar localmente

1. Instalar PostgreSQL en tu máquina.
2. Crear un archivo `.env` en la carpeta `back` con las siguientes variables:
DATABASE_URL="postgresql://tuUsuario:tuContraseña@localhost:5432/nombre_de_la_bdd"

3. Si la base de datos no está creada, usar el siguiente comando para generarla automáticamente:

```bash
npx prisma migrate dev --name init
```
Nota: Si la base de datos ya existe y solo quieren sincronizar Prisma con la estructura actual, pueden usar:

```bash
npx prisma db push
```

4. Ejecutar el siguiente comando para acceder a Prisma Studio:

```bash
npx prisma studio
```
Esto abrirá una interfaz web donde podrán visualizar y editar los datos de la base de datos de manera sencilla.

5. Si todo está en orden, finalmente pueden iniciar la aplicación con:

```bash
npm run start:dev
```
