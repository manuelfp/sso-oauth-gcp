# Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Google OAuth Credentials
# Obtén estas credenciales desde Google Cloud Console:
# https://console.cloud.google.com/apis/credentials

GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## Pasos para obtener las credenciales de Google:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea o selecciona un proyecto
3. Habilita la API de Google+ (o Google Identity Platform)
4. Ve a "APIs & Services" > "Credentials"
5. Crea un "OAuth client ID" de tipo "Web application"
6. Configura las URLs autorizadas:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
7. Copia el Client ID y Client Secret

## Generar NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

O usa cualquier string aleatorio seguro de al menos 32 caracteres.

