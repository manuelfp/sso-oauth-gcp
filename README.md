# OAuth GCP - Proyecto de Autenticación con Google Auth Platform

Este proyecto demuestra la implementación de autenticación OAuth 2.0 usando Google Auth Platform en múltiples aplicaciones Next.js, incluyendo un portal institucional centralizado.

## 📁 Estructura del Proyecto

```
oauth-gcp/
├── oauth-gcp-front-app-home/     # Portal Institucional (puerto 3000)
├── oauth-gcp-front-app-1/        # Aplicación Institucional 1 (puerto 3001)
└── oauth-gcp-front-app-2/         # Aplicación Institucional 2 (puerto 3002)
```

## 🎯 Descripción

- **Portal Institucional** (`oauth-gcp-front-app-home`): Portal centralizado que facilita el acceso a todas las aplicaciones institucionales
- **Aplicación 1** (`oauth-gcp-front-app-1`): Primera aplicación institucional con autenticación Google
- **Aplicación 2** (`oauth-gcp-front-app-2`): Segunda aplicación institucional con autenticación Google

## 📋 Prerrequisitos

- Node.js 18+ y npm/yarn
- Una cuenta de Google Cloud Platform
- Acceso a Google Cloud Console

## 🔧 Configuración de Google Cloud Platform

### Paso 1: Crear o Seleccionar un Proyecto

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Si no tienes un proyecto, crea uno nuevo:
   - Haz clic en el selector de proyectos (parte superior)
   - Haz clic en "NEW PROJECT"
   - Ingresa un nombre para el proyecto (ej: "OAuth GCP Demo")
   - Haz clic en "CREATE"
3. Selecciona el proyecto recién creado

### Paso 2: Habilitar APIs Necesarias

1. En el menú lateral, ve a **"APIs & Services"** > **"Library"**
2. Busca y habilita las siguientes APIs:
   - **Google+ API** (o **Google Identity Platform**)
   - **People API** (opcional, para obtener información adicional del usuario)

### Paso 3: Configurar la Pantalla de Consentimiento OAuth

1. Ve a **"APIs & Services"** > **"OAuth consent screen"**
2. Selecciona el tipo de usuario:
   - **External**: Para usuarios fuera de tu organización
   - **Internal**: Solo para usuarios de tu organización (requiere Google Workspace)
3. Completa la información requerida:
   - **App name**: Nombre de tu aplicación
   - **User support email**: Tu email de soporte
   - **Developer contact information**: Tu email
4. Haz clic en **"SAVE AND CONTINUE"**
5. En **"Scopes"**, haz clic en **"SAVE AND CONTINUE"** (puedes agregar scopes personalizados después)
6. En **"Test users"** (si es External), agrega emails de prueba si es necesario
7. Haz clic en **"SAVE AND CONTINUE"** y luego **"BACK TO DASHBOARD"**

### Paso 4: Crear Credenciales OAuth 2.0

1. Ve a **"APIs & Services"** > **"Credentials"**
2. Haz clic en **"CREATE CREDENTIALS"** > **"OAuth client ID"**
3. Si es la primera vez, selecciona **"Web application"** como tipo de aplicación
4. Completa el formulario:

   **Name**: Nombre descriptivo (ej: "OAuth GCP Portal")

   **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   http://localhost:3001
   http://localhost:3002
   ```

   **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3001/api/auth/callback/google
   http://localhost:3002/api/auth/callback/google
   ```

5. Haz clic en **"CREATE"**
6. **IMPORTANTE**: Copia el **Client ID** y **Client Secret** que se muestran. No podrás ver el Client Secret nuevamente después de cerrar esta ventana.

### Paso 5: Configurar para Producción (Opcional)

Si vas a desplegar en producción, agrega también las URLs de producción:

**Authorized JavaScript origins**:
```
https://tu-dominio.com
https://app1.tu-dominio.com
https://app2.tu-dominio.com
```

**Authorized redirect URIs**:
```
https://tu-dominio.com/api/auth/callback/google
https://app1.tu-dominio.com/api/auth/callback/google
https://app2.tu-dominio.com/api/auth/callback/google
```

## ⚙️ Configuración de los Proyectos

### 1. Portal Institucional (oauth-gcp-front-app-home)

#### Instalar dependencias:
```bash
cd oauth-gcp-front-app-home
yarn install
# o
npm install
```

#### Configurar variables de entorno:

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-key-aqui

# URLs de las aplicaciones institucionales
NEXT_PUBLIC_APP_1_URL=http://localhost:3001
NEXT_PUBLIC_APP_2_URL=http://localhost:3002
```

#### Generar NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

#### Ejecutar:
```bash
yarn dev
# o
npm run dev
```

El portal estará disponible en: `http://localhost:3000`

### 2. Aplicación Institucional 1 (oauth-gcp-front-app-1)

#### Instalar dependencias:
```bash
cd oauth-gcp-front-app-1
yarn install
# o
npm install
```

#### Configurar variables de entorno:

Crea un archivo `.env.local`:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=tu-secret-key-aqui

# URL del Portal Institucional
NEXT_PUBLIC_PORTAL_URL=http://localhost:3000
```

**Nota**: Puedes usar el mismo `NEXTAUTH_SECRET` en todas las aplicaciones o generar uno diferente para cada una.

#### Ejecutar en puerto 3001:
```bash
yarn dev -- -p 3001
# o
npm run dev -- -p 3001
```

O modifica el `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

La aplicación estará disponible en: `http://localhost:3001`

### 3. Aplicación Institucional 2 (oauth-gcp-front-app-2)

#### Instalar dependencias:
```bash
cd oauth-gcp-front-app-2
yarn install
# o
npm install
```

#### Configurar variables de entorno:

Crea un archivo `.env.local`:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=tu-secret-key-aqui

# URL del Portal Institucional
NEXT_PUBLIC_PORTAL_URL=http://localhost:3000
```

#### Ejecutar en puerto 3002:
```bash
yarn dev -- -p 3002
# o
npm run dev -- -p 3002
```

O modifica el `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -p 3002"
  }
}
```

La aplicación estará disponible en: `http://localhost:3002`

## 🚀 Ejecutar Todas las Aplicaciones

Abre tres terminales diferentes:

**Terminal 1 - Portal:**
```bash
cd oauth-gcp-front-app-home
yarn dev
```

**Terminal 2 - Aplicación 1:**
```bash
cd oauth-gcp-front-app-1
yarn dev -- -p 3001
```

**Terminal 3 - Aplicación 2:**
```bash
cd oauth-gcp-front-app-2
yarn dev -- -p 3002
```

## 🔐 Variables de Entorno Comunes

### Variables Requeridas para Todas las Aplicaciones:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | Client ID de OAuth 2.0 de Google | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Client Secret de OAuth 2.0 | `GOCSPX-xxxxxxxxxxxxx` |
| `NEXTAUTH_URL` | URL base de la aplicación | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret para firmar cookies | Generado con `openssl rand -base64 32` |

### Variables Específicas del Portal:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_1_URL` | URL de la Aplicación 1 | `http://localhost:3001` |
| `NEXT_PUBLIC_APP_2_URL` | URL de la Aplicación 2 | `http://localhost:3002` |

### Variables Específicas de las Aplicaciones:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_PORTAL_URL` | URL del Portal Institucional | `http://localhost:3000` |

## 🧪 Probar la Autenticación

1. Abre el portal en `http://localhost:3000`
2. Haz clic en "Iniciar Sesión" o "Iniciar Sesión con Google"
3. Serás redirigido a Google para autenticarte
4. Después de autenticarte, serás redirigido de vuelta al portal
5. Desde el portal, puedes acceder a las aplicaciones institucionales
6. Cada aplicación también tiene su propio botón "Home" para volver al portal

## 🐛 Solución de Problemas

### Error: "Redirect URI mismatch"

**Problema**: La URL de redirección no coincide con la configurada en Google Cloud Console.

**Solución**:
1. Verifica que las URLs en Google Cloud Console sean exactamente:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3001/api/auth/callback/google`
   - `http://localhost:3002/api/auth/callback/google`
2. Asegúrate de que `NEXTAUTH_URL` en `.env.local` coincida con la URL de la aplicación

### Error: "Invalid client secret"

**Problema**: El Client Secret no es correcto.

**Solución**:
1. Verifica que no haya espacios extra en `.env.local`
2. Asegúrate de copiar el Client Secret completo desde Google Cloud Console
3. Si perdiste el Client Secret, crea nuevas credenciales OAuth 2.0

### Error: "Access blocked: This app's request is invalid"

**Problema**: La aplicación está en modo de prueba y el usuario no está en la lista de test users.

**Solución**:
1. Ve a "OAuth consent screen" en Google Cloud Console
2. Agrega el email del usuario en "Test users"
3. O publica la aplicación (requiere verificación si usas scopes sensibles)

### La sesión no persiste

**Problema**: Las cookies no se están guardando correctamente.

**Solución**:
1. Verifica que `NEXTAUTH_SECRET` esté configurado correctamente
2. Asegúrate de que las cookies estén habilitadas en tu navegador
3. Verifica que `NEXTAUTH_URL` sea correcto

### Las aplicaciones no se abren desde el portal

**Problema**: Las URLs de las aplicaciones no son correctas.

**Solución**:
1. Verifica que las aplicaciones estén ejecutándose en los puertos correctos
2. Verifica las variables `NEXT_PUBLIC_APP_1_URL` y `NEXT_PUBLIC_APP_2_URL` en el portal
3. Asegúrate de que las URLs en `applications.ts` sean correctas

## 📚 Recursos Adicionales

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## 📝 Notas Importantes

1. **Seguridad**: Nunca commitees el archivo `.env.local` al repositorio. Está incluido en `.gitignore`.

2. **Client Secret**: Si compartes el proyecto, cada desarrollador debe crear sus propias credenciales OAuth 2.0 o usar un Client Secret compartido de forma segura.

3. **Producción**: Para producción, asegúrate de:
   - Actualizar las URLs autorizadas en Google Cloud Console
   - Usar HTTPS
   - Configurar variables de entorno en tu plataforma de hosting
   - Revisar la configuración de seguridad de NextAuth

4. **Puertos**: Si los puertos 3000, 3001 o 3002 están ocupados, puedes cambiarlos modificando los scripts en `package.json` y actualizando las variables de entorno correspondientes.

## 📄 Licencia

Este proyecto es una demostración educativa.

