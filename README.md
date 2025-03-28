# Plataforma Crowdfunding

## Table of Contents

1. [Descripción](#descripción)
2. [Guías de estilos](#guía-de-estilos)
3. [Tecnologías](#tecnologías)
4. [Scripts](#scripts)

## Descripción

Aplicación de plataforma Crowdfunding creada a partir de la herramienta [Vite](https://vite.dev/), mediante el uso de la plantilla predeterminada `React + TypeScript + Vite`, para así utilizar el framework [React](https://es.react.dev/) en conjunto con [TypeScript]("https://www.typescriptlang.org/"), permitiendo aplicar la información oficial obtenida en [React](https://es.react.dev/learn). Este archivo resultó de complementar el archivo por defecto README.md generado por la herramienta de React (de ahí las partes en el idioma inglés).

## Guía de estilos

### Código JavaScript

Se utiliza [ESLint](https://eslint.org/ "ESLint") para la cuidar la consistencia del código y el formato, mediante el seguimiento de las convenciones y guía de estilo correspondiente establecida para el proyecto al desarrollar código en lenguaje JavaScript, la cuál sería la basada en la especificación de [Airbnb](https://github.com/airbnb/javascript "Airbnb"). Al utilizar el framework React, adicional se busca tomar en cuenta cualquier especificación oficial encontrada en su [página de documentación](https://reactjs.org/) y [página de documentación "legacy"](https://legacy.reactjs.org/docs/getting-started.html). En el archivo `.eslintrc.json` se encuentra el conjunto de reglas y configuraciones necesarias que extienden de el estándar de Airbnb y demás, con la modificación que permite utilizar en los archivos tanto el final de linea de windows, como el basado en unix.

#### Props de React (en proceso de ser reemplazado por TypeScript)

Se utiliza la biblioteca de React [PropType](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html) para validar de forma "estática" los tipos de los props de los componentes, según indica la especificación, para un mejor control del código.

### Commits de GIT

Se sigue la siguiente convención:

1. Un encabezado con el titulo o un resumen del commit, describiendo la razón del commit. Debe comenzar por un sustantivo o un imperativo. No debe tener más de 50 caracteres.

2. Un cuerpo donde se describen todos los cambios realizados en el commit y su función. Se recomienda comenzar con un sustantivo o imperativo, pero es más flexible. Pueden haber varios párrafos de información, separados por lineas en blanco. Cada linea debe tener máximo 72 caracteres. Debe terminar en punto.

3. Referencias a issues que se están resolviendo en el commit o que están relacionados (opcional).

#### Forma

Forma y descripción de un commit válido, según los puntos anteriores (se encuentra en el idioma inglés).

```text
Short (50 chars or less) summary

More detailed explanatory text. Wrap it to 72 characters. The blank
line separating the summary from the body is critical (unless you omit
the body entirely).

Write your commit message in the imperative: "Fix bug" and not "Fixed
bug" or "Fixes bug." This convention matches up with commit messages
generated by commands like git merge and git revert.

Further paragraphs come after blank lines.

- Bullet points are okay, too.
- Typically a hyphen or asterisk is used for the bullet, followed by a
  single space. Use a hanging indent.

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

#### Ejemplos

```text
Fix typo in introduction to user guide
```

```text
Derezz the master control program

MCP turned out to be evil and had become intent on world domination.
This commit throws Tron's disc into MCP (causing its deresolution)
and turns it back into a chess game.
```

```text
Simplify serialize.h's exception handling

Remove the 'state' and 'exceptmask' from serialize.h's stream
implementations, as well as related methods.

As exceptmask always included 'failbit', and setstate was always
called with bits = failbit, all it did was immediately raise an
exception. Get rid of those variables, and replace the setstate
with direct exception throwing (which also removes some dead
code).

As a result, good() is never reached after a failure (there are
only 2 calls, one of which is in tests), and can just be replaced
by !eof().

fail(), clear(n) and exceptions() are just never called. Delete
them.
```

#### Véase también

<https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53>

<https://chris.beams.io/posts/git-commit/>

## Tecnologías

### Features

- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript "JavaScript")
- [NodeJS](https://nodejs.org/en "NodeJS")
- [Create React App](https://github.com/facebook/create-react-app)
- [React](https://es.react.dev/)
- [React Router]("https://reactrouter.com/en/main" "React Router")
- [Axios](https://axios-http.com/docs/intro "Axios")
- [Styled Components]( "Styled Components")

El proyecto utiliza [NodeJS](https://nodejs.org/es/ "NodeJS") para gestionar las tecnologías y dependencias de los paquetes utilizados, implementado en el lenguaje [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript "JavaScript"), creado a partir de la herramienta [Vite](https://vite.dev/), como una forma iniciar y mantener un nuevo proyecto [React](https://es.react.dev/). Se utiliza la biblioteca proporcionada por el ecosistema React, [React Router]("https://reactrouter.com/en/main" "React Router"), para gestionar las rutas necesarias de la App. Así mismo, para la comunicación de los datos con la API objetivo, se requiere la biblioteca [Axios](https://axios-http.com/docs/intro "Axios"), instaladas en las dependencias del proyecto. También se proporciona las bibliotecas de estilo [Styled Components]( "Styled Components") y [React Bootstrap]("https://react-bootstrap.netlify.app/"), para poder desarrollar componentes React fácilmente estilizados, de forma que se propicie un código más ordenado y limpio.

La carpeta donde se encuentra la mayoría de los archivos necesarios para desarrollar sobre NodeJS es "src", la aplicación utiliza una API para poder realizar sus funciones. Se puede obtener la documentación autogenerada de la API según la especificación OpenAPI, sirviendo como una guía estructurada para la parte del cliente, incluyendo sus endpoints, parámetros, solicitudes y respuestas, en la ruta `/redoc` del servidor donde se esté ejecutando la API o bien, el último redoc de documentación autogenerado por la API en forma de archivo HTML en la respectiva carpeta de documentación `/documentation/redoc`.

### Configuración inicial del proyecto

Para comenzar a utilizar el proyecto se debe realizar la instalación de las dependencia del proyecto y compilar los archivos mediante NodeJS, los cuales se pueden encontrar las instrucciones en la documentación oficial indicada en el inicio del documento o mediante los siguientes scripts. Para configurar NodeJS se necesita un archivo `.env.local` en la raíz del proyecto con las variables de entorno necesarias, incluyendo el "Host" y la "URL" de la API. El archivo `.env.local.example` se puede encontrar como un ejemplo de archivo `.env.local`.

```bash
npm install
```

```bash
npm run dev
```

## Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173/) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Learn More

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
