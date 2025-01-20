# Mi Comida Favorita


## 📋 Descripción General

Este proyecto mejora la aplicación **"Mi Comida Favorita"**, desarrollada en clase, implementando las siguientes características:

- Validaciones completas para formularios de registro y login.
- Estados de carga (loading states) para ofrecer un mejor feedback visual al usuario.
- Manejo de errores con mensajes específicos.

---

## 🛠️ Instrucciones de Instalación

### Requisitos Previos
1. Tener instalado [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/).
2. Tener instalado [Expo CLI](https://docs.expo.dev/get-started/installation/).
3. Crear un proyecto en Firebase:
   - Habilitar Firebase Authentication (correo y contraseña).
   - Configurar Firestore para almacenar perfiles de usuario.

### Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Joel30/univalle_mi-comida-favorita.git
   cd mi-comida-favorita
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura Firebase:
   - Modificar el archivo `firebase.js` en la carpeta `config/` con tu configuración de Firebase:
     ```javascript
     const firebaseConfig = {
       apiKey: "TU_API_KEY",
       authDomain: "TU_AUTH_DOMAIN",
       projectId: "TU_PROJECT_ID",
       storageBucket: "TU_STORAGE_BUCKET",
       messagingSenderId: "TU_MESSAGING_SENDER_ID",
       appId: "TU_APP_ID",
     };
     ```
4. Inicia la aplicación:
   ```bash
   npm start
   ```
5. Escanea el código QR con la app Expo Go para probar la aplicación en tu dispositivo.

---

## 🚀 Mejoras Implementadas

### 1. Formulario de Registro
- Validaciones específicas:
  - Email válido con formato correcto.
  - Contraseña que cumple con los siguientes requisitos:
    - Mínimo 8 caracteres.
    - Al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
  - Confirmación de contraseña (ambas deben coincidir).
- Mensajes de error detallados para cada campo.
- Botón de registro deshabilitado mientras haya errores.

### 2. Formulario de Login
- Validación de email con formato correcto.
- Verificación de que la contraseña no esté vacía.
- Mensajes de error específicos para cada validación.
- Botón de inicio de sesión deshabilitado mientras los campos sean inválidos.

### 3. Estados de Carga (Loading States)
- Indicadores de carga añadidos en los siguientes procesos:
  - Registro de usuarios.
  - Inicio de sesión.
  - Carga y actualización del perfil.
- Botones deshabilitados mientras se ejecuta un proceso para evitar interacciones innecesarias.

### 4. Manejo de Errores
- Mensajes visualmente destacados cuando ocurren errores:
  - Problemas en la autenticación.
  - Fallos en la conexión con Firebase.

