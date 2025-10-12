# NEXUM Platform - Documentación de Arquitectura y Funcionalidades Frontend

**Versión:** 4.0
**Fecha:** 23 de Septiembre, 2025
**Autor:** AI Senior Frontend Engineer

## 1. Resumen del Proyecto

NEXUM Platform es una aplicación SaaS (Software como Servicio) integral diseñada para estudios jurídicos en Latinoamérica. Su objetivo es optimizar las operaciones y mejorar la productividad mediante la integración de un conjunto de herramientas impulsadas por inteligencia artificial.

- **Público Objetivo:** Estudios jurídicos de todos los tamaños, desde profesionales independientes hasta grandes firmas.
- **Propuesta de Valor Principal:** Reducir la carga administrativa, automatizar la adquisición y gestión de clientes, y proporcionar insights basados en datos para la toma de decisiones estratégicas.
- **Stack Tecnológico:** React, TypeScript, Tailwind CSS, Zustand, Framer Motion, Recharts, Lucide React.

---

## 2. Sistema de Diseño y UI/UX ("NEXUM PREMIUM DESIGN SYSTEM V4.0")

La estética de la plataforma es moderna, profesional y orientada a datos, con un enfoque principal en el modo oscuro. Todo el sistema de diseño está definido en `index.html` dentro de un bloque `<style>`, asegurando que se cargue de manera instantánea.

### 2.1. Paleta de Colores y Theming

El sistema utiliza variables CSS para facilitar la tematización y soporta tanto el modo **Claro** como el **Oscuro**. El modo oscuro es el predeterminado y se fuerza en las páginas de autenticación para una sensación consistente y premium.

- **Colores Primarios:** Un gradiente de Índigo (`#6366F1`) a Púrpura (`#8B5CF6`).
- **Color de Acento:** Cian (`#06B6D4`).
- **Colores Semánticos:** Verde para éxito, Amarillo para advertencia, Rojo para error.
- **Theming:** Los selectores `:root.light` y `:root.dark` alternan variables para el fondo (`--bg-primary`), texto (`--text-primary`), bordes (`--border-color`), etc. El tema es gestionado por `ThemeContext` y se persiste en `localStorage`.

### 2.2. Tipografía

- **Fuente:** 'Inter', cargada desde Google Fonts.
- **Jerarquía:** Se establece una escala tipográfica clara utilizando las utilidades de tamaño de fuente de Tailwind, con estilos personalizados para elementos clave como el `hero-title`.

### 2.3. Componentes Centrales (Estilos)

El CSS en `index.html` define un conjunto de componentes "premium":

- **Botones (`.btn-primary-premium`, `.btn-secondary-premium`):** Cuentan con gradientes, efectos al pasar el cursor (transformación, sombra) y estados deshabilitados.
- **Tarjetas (`.card-premium`, `.glass-card`):**
    - `.card-premium`: Tiene una sutil transformación al pasar el cursor y una revelación de gradiente en el borde superior.
    - `.glass-card`: Utiliza `backdrop-filter` para un efecto de vidrio esmerilado, común en los paneles de administración.
- **Inputs (`.input-premium`):** Diseño limpio con un estado de foco distintivo (color de borde y sombra).
- **Sidebar (`.sidebar-premium`, `.sidebar-item`):** Un componente de navegación de ancho fijo con estilos distintos para los estados activo y al pasar el cursor. El estado activo utiliza el gradiente primario.
- **Tablas (`.table-premium`):** Diseñadas para la legibilidad con efectos al pasar el cursor sobre las filas.

### 2.4. Layouts (Disposición de la página)

La aplicación está estructurada en torno a varios layouts clave para mantener la consistencia:

- `PublicLayout`: Para páginas de marketing, incluye `PublicHeader` y `PublicFooter`.
- `AuthLayout`: Un layout dedicado de dos paneles para las páginas de inicio de sesión/registro, con un tema oscuro forzado.
- `DashboardLayout`: El layout principal para el cliente, que incluye el `Sidebar` y el `Header`.
- `AdminLayout`: Una versión especializada del layout del dashboard para superadministradores.
- `AffiliatePortalLayout`: El layout para la sección específica de afiliados de la aplicación.

---

## 3. Arquitectura de la Aplicación

### 3.1. Estructura de Carpetas

El proyecto sigue una estructura de carpetas basada en funcionalidades, promoviendo la modularidad y la escalabilidad.

```
/
├── components/       # Componentes de UI reutilizables (Button, Card, etc.)
│   ├── admin/
│   ├── auth/
│   ├── affiliates/
│   ├── billing/
│   ├── dashboard/
│   ├── features/     # Componentes relacionados con feature flags
│   ├── layout/       # Partes del layout (Header, Footer)
│   ├── pricing/
│   ├── subscription/
│   └── ui/           # Elementos de UI genéricos
├── config/           # Configuración global (feature flags, assets)
├── constants.ts      # Constantes globales (configuración de sidebar, planes)
├── context/          # Proveedores de Context de React (ThemeContext)
├── data/             # Datos de simulación (mock) para desarrollo
├── hooks/            # Hooks de React personalizados (useModules, etc.)
├── layouts/          # Layouts de página de nivel superior
├── pages/            # Componentes de ruta (un archivo por página/ruta)
│   ├── admin/
│   ├── affiliates/
│   ├── public/
│   └── subscription/
├── providers/        # Componentes de orden superior que proveen contexto
├── services/         # Capa de comunicación con la API
├── store/            # Almacenes de estado de Zustand
├── types/            # Definiciones de tipos de TypeScript
├── utils/            # Funciones de utilidad (formatters, validators)
├── App.tsx           # Componente raíz con la configuración de rutas
└── index.tsx         # Punto de entrada de la aplicación
```

### 3.2. Enrutamiento (`App.tsx`)

- **Librería:** `react-router-dom` (usando `HashRouter`).
- **Estructura:**
    - **Rutas Públicas (`/`):** Encapsuladas en `PublicLayout`. Abiertas para todos.
    - **Rutas de Autenticación (`/login`, `/register`):** Encapsuladas en `AuthLayout`. Para usuarios no autenticados.
    - **Rutas de Cliente Protegidas (`/app/*`):** Área principal de la aplicación, protegida por `ProtectedRoute` que verifica los roles `owner`, `admin`, `user`. Usa `DashboardLayout`.
    - **Rutas de Afiliado Protegidas (`/portal/*`):** Área específica para afiliados, protegida por `ProtectedRoute` para el rol `affiliate`. Usa `AffiliatePortalLayout`.
    - **Rutas de Admin Protegidas (`/admin/*`):** Área de superadministrador, protegida por `ProtectedRoute` para el rol `super_admin`. Usa `AdminLayout`.
- **Autorización:** El componente `ProtectedRoute` es crucial. Verifica el estado de autenticación y valida el rol del usuario contra una lista de `allowedRoles`. También maneja las redirecciones para accesos no autorizados.

### 3.3. Gestión de Estado (Zustand)

Zustand se utiliza para una gestión de estado global simple y potente.

- **`useAuthStore`:** Gestiona la sesión del usuario, el token y los detalles de la organización. Se persiste en `localStorage` para mantener a los usuarios conectados.
- **`useSettingsStore`:** Persiste configuraciones específicas del usuario o globales (actualmente mínimo, pero escalable).
- **`useFeatureFlagStore`:** Persiste la configuración de los feature flags. Esto es clave para permitir a los administradores cambiar los estados de los flags y que estos persistan para todos los usuarios.

### 3.4. Comunicación con API (`services/`)

- **`api.ts`:** Una clase singleton `NexumAPI` abstrae toda la comunicación con el backend.
- **Estrategia de Simulación (Mocking):** Una bandera global `USE_MOCK` controla si la aplicación se comunica con un backend real o con el archivo `mockApi.ts`. Esto es extremadamente útil para el desarrollo rápido del frontend sin un backend funcional.
- **Autenticación:** El método `getHeaders` adjunta automáticamente el JWT de `useAuthStore` a las solicitudes autorizadas.
- **Manejo de Errores:** `handleResponse` centraliza el manejo de errores, incluyendo un manejador global para errores `401 Unauthorized` que cierra la sesión del usuario.

---

## 4. Funcionalidades Principales (Análisis Detallado)

### 4.1. Sistema de Feature Flags y Lista de Espera

Este es uno de los sistemas más potentes de la plataforma, permitiendo lanzamientos progresivos de funcionalidades.

- **Configuración (`config/featureFlags.ts`):** Un único archivo define todos los módulos, sus nombres y su lógica de estado basada en fechas.
    - **`status`:** El estado predeterminado (`available`, `waitlist`, `hidden`, `secret`).
    - **`launchDate`:** La fecha en que una funcionalidad se vuelve `available`.
    - **`revealDate`:** La fecha en que una funcionalidad `hidden` se convierte en `waitlist`.
- **Proveedor (`providers/FeatureFlagProvider.tsx`):** Envuelve la aplicación, calcula el estado en tiempo real de cada flag basado en la fecha actual y proporciona funciones de ayuda (`isAvailable`, `getStatus`).
- **Componentes de UI:**
    - `ModuleVisibility`: Un envoltorio que renderiza condicionalmente a sus hijos según el estado del flag.
    - `WaitlistCard`: Una tarjeta especializada que se muestra para las funcionalidades en `waitlist`, permitiendo a los usuarios registrarse.
    - `ExitIntentPopup`: Un modal que aparece cuando el usuario está a punto de abandonar la página, ofreciendo una oferta especial para unirse a la lista de espera.
    - `WaitlistConfirmationPage`: Una página de "gracias" después de unirse a una lista de espera, que incluye un mini-sistema de referidos para gamificar el ascenso en la cola.

### 4.2. Gestión de Suscripción ("Estilo Netflix")

- **Mi Suscripción (`pages/subscription/MySubscriptionPage.tsx`):** Muestra el plan actual del usuario, add-ons, métodos de pago e historial de facturas.
- **Cambiar Plan (`pages/subscription/SubscriptionChangePlanPage.tsx`):** Una página dedicada que permite a los usuarios comparar todos los planes disponibles con el suyo actual y ver los costos prorrateados.
- **Flujo de Cancelación (`components/subscription/modals/CancelSubscriptionFlow.tsx`):** Un modal de varios pasos que imita las estrategias modernas de retención de SaaS:
    1.  **Motivo:** Pregunta por qué el usuario se va.
    2.  **Oferta:** Presenta una oferta de retención personalizada basada en el motivo (ej., un descuento por "demasiado caro", una pausa por "no lo uso suficiente").
    3.  **Confirmación:** Un paso final de confirmación si el usuario rechaza la oferta.

### 4.3. Sistema de Afiliados

Un mercado completo de dos lados para afiliados y administradores.

- **Seguimiento de Referidos (`hooks/useReferralTracking.ts`):** Un hook simple que verifica la URL en busca de un parámetro `ref=` al cargar la página y establece una cookie (`nexum_ref`) que persiste durante 30 días.
- **Portal de Afiliados (`/portal/*`):** Una sección dedicada para afiliados registrados.
    - **Dashboard:** KPIs sobre visitas, conversiones, comisiones pendientes.
    - **Generador de URL:** Crea enlaces de seguimiento únicos con parámetros de campaña.
    - **Billetera (`PortalWalletPage`):** Una billetera virtual que muestra las ganancias en USD y ARS (usando `dollarBlueService`). Los afiliados pueden gestionar métodos de pago y solicitar retiros.
    - **Recursos:** Una sección con guías y materiales de marketing.
- **Gestión de Administrador (`/admin/affiliates`):**
    - **Dashboard:** Resumen de alto nivel del rendimiento de todo el programa de afiliados.
    - **Tabla de Afiliados (`AffiliatesTable`):** Una tabla completa para ver, filtrar, buscar y gestionar a todos los afiliados. Los administradores pueden aprobar/rechazar afiliados pendientes, editar tasas de comisión y procesar pagos.

### 4.4. Portal de Superadministrador (`/admin/*`)

El sistema nervioso central para gestionar toda la plataforma.

- **Dashboard Maestro:** Agrega KPIs de todas las áreas: finanzas, clientes y afiliados.
- **Gestión de Clientes:** Una tabla detallada de todas las organizaciones de clientes con puntuaciones de salud, métricas de uso y acciones rápidas.
- **Dashboard Financiero:** Métricas financieras detalladas, evolución del MRR, gráficos de flujo de caja y desgloses de costos.
- **Gestión de Feature Flags:** Una UI para cambiar dinámicamente la configuración de los feature flags almacenada en Zustand, permitiendo un control en tiempo real sobre la disponibilidad de los módulos para todos los usuarios.
- **Registros de Auditoría:** Un flujo de registros en tiempo real que muestra eventos importantes del sistema y del usuario.

---

## 5. Guía de Replicación

Para replicar este proyecto, sigue estos pasos:

1.  **Configuración:** Inicializa un proyecto React + TypeScript (ej., con Vite).
2.  **Estilos:**
    - Instala Tailwind CSS.
    - Copia el `NEXUM PREMIUM DESIGN SYSTEM V4.0` de `index.html` en tu CSS global o en `index.html`.
    - Copia el `tailwind.config.ts` para extender el tema de Tailwind.
3.  **Dependencias:** Configura un "import map" o instala las librerías clave: `react-router-dom`, `zustand`, `lucide-react`, `recharts`, `framer-motion`, `react-hot-toast`, `clsx`, `tailwind-merge`.
4.  **Estructura del Proyecto:** Crea la estructura de carpetas como se detalla en la sección 3.1.
5.  **Sistemas Centrales:**
    - Implementa `ThemeContext` para el modo claro/oscuro.
    - Configura el enrutamiento principal en `App.tsx` con todos los layouts (`PublicLayout`, `DashboardLayout`, etc.).
    - Crea los almacenes de Zustand (`authStore`, `featureFlagStore`).
6.  **Construir Funcionalidades (de abajo hacia arriba):**
    - Comienza con componentes de UI simples en `/components/ui`.
    - Implementa el flujo de Autenticación (páginas de Login/Register, `ProtectedRoute`).
    - Construye el `DashboardLayout` principal con el `Sidebar` y el `Header`.
    - Implementa el sistema de Feature Flags (`featureFlags.ts`, `FeatureFlagProvider`). Esto es fundamental.
    - Crea la `ModulesPage` que utiliza el sistema de feature flags para mostrar los módulos.
    - Construye cada área funcional principal (Suscripción, Portal de Afiliados, Portal de Admin) página por página, creando componentes reutilizables a medida que avanzas.
7.  **Capa de Datos:**
    - Crea la capa de abstracción `services/api.ts`.
    - Crea un archivo `services/mockApi.ts` completo para simular todas las respuestas del backend. Esta es la forma más rápida de construir toda la UI sin un backend.
    - Usa la carpeta `data/` para almacenar conjuntos de datos de simulación más grandes.
8.  **Pulido:** Añade animaciones con `framer-motion` y notificaciones con `react-hot-toast` para mejorar la experiencia del usuario.

Siguiendo esta guía, puedes recrear la arquitectura y funcionalidad del frontend de la Plataforma NEXUM, proporcionando una base sólida para cualquier aplicación SaaS compleja.