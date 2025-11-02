import React from 'react';
import Card from '../../components/ui/Card';
import { FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const reportHtml = `
<h1 class="text-3xl font-bold mb-4 text-text-primary">📊 Informe de Implementación - NEXUM Platform v4.0</h1>
<p class="text-sm text-text-secondary"><strong>Fecha del Informe:</strong> 23 de Septiembre, 2025</p>
<p class="text-sm text-text-secondary mb-6"><strong>Análisis realizado por:</strong> AI Senior Frontend Engineer</p>

<hr class="my-6 border-border-color" />

<h2 class="text-2xl font-bold mt-6 mb-3 text-text-primary">1. Resumen Ejecutivo</h2>
<p class="text-text-secondary leading-relaxed">Este informe detalla el estado actual de desarrollo de la aplicación NEXUM Platform, contrastando los requerimientos de la <strong>"Guía Maestra v4.0"</strong> con el código fuente existente.</p>
<p class="text-text-secondary leading-relaxed mt-2"><strong class="text-yellow-500">El estado del proyecto es considerablemente más avanzado de lo que indica la sección "Falta Implementar" de la guía.</strong> Sistemas críticos como la <strong>autenticación por roles, el sistema de feature flags, la gestión de listas de espera (waitlist) y el portal de afiliados están completamente funcionales</strong> en el frontend. La gestión de suscripciones del cliente ("estilo Netflix") también está implementada.</p>
<p class="text-text-secondary leading-relaxed mt-2">Las principales discrepancias radican en que varios ítems listados como "críticos" y pendientes ya han sido implementados. Las tareas restantes se centran en la creación de contenido para módulos futuros (JurisPredict, Avatar), la implementación de la página de "Integraciones" y el desarrollo completo de la sección de "Gestión de Afiliados" en el portal de Administrador.</p>
<p class="text-text-secondary leading-relaxed mt-2"><strong class="text-green-500">Recomendación principal:</strong> Actualizar la "Guía Maestra" para reflejar el progreso real y redefinir las prioridades de las próximas semanas.</p>

<hr class="my-6 border-border-color" />

<h2 class="text-2xl font-bold mt-6 mb-3 text-text-primary">2. Análisis Detallado del Estado Actual</h2>

<h3 class="text-xl font-semibold mt-4 mb-2 text-green-500">✅ Implementado y Confirmado</h3>
<p class="text-text-secondary leading-relaxed mb-4">Los siguientes módulos y funcionalidades están <strong>completos y funcionales</strong> en el código actual, incluyendo varios que la guía marcaba como pendientes.</p>
<table class="w-full border-collapse border border-border-color my-4 text-sm">
    <thead class="bg-bg-secondary text-text-secondary">
        <tr>
            <th class="p-2 border border-border-color text-left">Funcionalidad</th>
            <th class="p-2 border border-border-color text-left">Estado en Guía</th>
            <th class="p-2 border border-border-color text-left">Evidencia en el Código</th>
        </tr>
    </thead>
    <tbody class="text-text-secondary">
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Portal de Afiliados</strong></td><td class="p-2 border border-border-color">✅ Completado</td><td class="p-2 border border-border-color">Rutas en <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">/portal/*</code>, <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">AffiliatePortalLayout</code>, páginas <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">PortalDashboardPage</code>, <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">PortalWalletPage</code>, etc. API mock y lógica de negocio implementada.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Autenticación y Registro</strong></td><td class="p-2 border border-border-color">✅ Completado</td><td class="p-2 border border-border-color"><code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">LoginPage</code>, <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">RegisterPage</code>, <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">AuthLayout</code>, <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">authStore</code> y <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">ProtectedRoute</code>.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Temas Dark/Light</strong></td><td class="p-2 border border-border-color">✅ Completado</td><td class="p-2 border border-border-color"><code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">ThemeContext</code> y <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">ThemeToggle</code> funcionales, con variables CSS en <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">index.html</code>.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Routing por Roles</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente (Crítico)</strong></td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> El hook <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">useRoleBasedNavigation</code> y el componente <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">RoleBasedRedirect</code> gestionan el enrutamiento post-login según el rol del usuario.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Sistema de Feature Flags</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente (Crítico)</strong></td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">featureFlags.ts</code>, <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">FeatureFlagProvider</code> y <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">useFeatureFlags</code> controlan la visibilidad de módulos en <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">Sidebar</code> y <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">ModulesPage</code>.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Sistema de Waitlist</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente</strong></td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> Componentes <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">WaitlistCard</code>, <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">ExitIntentPopup</code> y página <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">WaitlistConfirmationPage</code> están funcionales.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Gestión de Suscripción</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">MySubscriptionPage</code> y <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">SubscriptionChangePlanPage</code> permiten ver, cambiar y cancelar planes ("estilo Netflix").</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Contenido Elias WhatsApp</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">EliasWhatsappManagementPage</code> es una página completa con métricas y controles.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Contenido Elias Llamadas</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">EliasCallsManagementPage</code> es una página completa con métricas y controles.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Configuración de Perfil</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">SettingsPage</code> permite al usuario gestionar su perfil y organización.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Gestión de Usuarios</strong></td><td class="p-2 border border-border-color">No especificado</td><td class="p-2 border border-border-color"><strong>IMPLEMENTADO.</strong> <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">UsersPage</code> permite a los <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">owner</code>/<code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">admin</code> invitar y gestionar usuarios de su organización.</td></tr>
    </tbody>
</table>

<h3 class="text-xl font-semibold mt-8 mb-2 text-yellow-500">🟡 Parcialmente Implementado</h3>
<p class="text-text-secondary leading-relaxed mb-4">Estas funcionalidades tienen una base sólida pero requieren trabajo adicional para estar completas.</p>
<table class="w-full border-collapse border border-border-color my-4 text-sm">
    <thead class="bg-bg-secondary text-text-secondary">
        <tr><th class="p-2 border border-border-color text-left">Funcionalidad</th><th class="p-2 border border-border-color text-left">Estado en Guía</th><th class="p-2 border border-border-color text-left">Detalle de Implementación</th></tr>
    </thead>
    <tbody class="text-text-secondary">
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Portal de Admin</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente (Crítico)</strong></td><td class="p-2 border border-border-color">La estructura y rutas <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">/admin/*</code> existen. <strong><code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">AdminDashboardPage</code></strong>, <strong><code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">ClientsManagementPage</code></strong>, <strong><code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">FeatureFlagsPage</code></strong> y <strong><code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">FinancialDashboardPage</code></strong> son muy completas. Sin embargo, <strong><code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">AfiliadosAdminPage</code></strong> es solo un placeholder y necesita la implementación de la lógica y tablas ya creadas en <code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">AffiliatesTable.tsx</code>.</td></tr>
    </tbody>
</table>

<h3 class="text-xl font-semibold mt-8 mb-2 text-red-500">❌ Pendiente de Implementación</h3>
<p class="text-text-secondary leading-relaxed mb-4">Estas funcionalidades no se han iniciado o solo existen como placeholders básicos.</p>
<table class="w-full border-collapse border border-border-color my-4 text-sm">
     <thead class="bg-bg-secondary text-text-secondary">
        <tr><th class="p-2 border border-border-color text-left">Funcionalidad</th><th class="p-2 border border-border-color text-left">Estado en Guía</th><th class="p-2 border border-border-color text-left">Detalle de Implementación</th></tr>
    </thead>
    <tbody class="text-text-secondary">
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Contenido JurisPredict AI</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color">El módulo está oculto por feature flags. No existe una página de gestión interna (<code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">/app/jurispredict</code>).</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Contenido Avatar Partner</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color">El módulo está oculto por feature flags. No existe una página de gestión interna (<code class="bg-bg-secondary text-yellow-500 px-1 rounded text-xs">/app/avatar</code>).</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Página de Integraciones</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color">No existe la ruta ni el componente para una página de "Integraciones" dentro de la aplicación.</td></tr>
        <tr class="hover:bg-bg-secondary"><td class="p-2 border border-border-color"><strong>Página de Soporte (In-App)</strong></td><td class="p-2 border border-border-color">❌ <strong>Pendiente ("Secciones vacías")</strong></td><td class="p-2 border border-border-color">No hay una sección de soporte o ticketing dentro del dashboard de cliente.</td></tr>
    </tbody>
</table>

<hr class="my-6 border-border-color" />

<h2 class="text-2xl font-bold mt-6 mb-3 text-text-primary">3. Conclusión y Próximos Pasos</h2>
<ol class="list-decimal list-inside space-y-2 text-text-secondary">
    <li><strong>Actualizar Documentación:</strong> Es crucial alinear la "Guía Maestra v4.0" con el estado actual del desarrollo para evitar confusiones y planificar eficazmente.</li>
    <li><strong>Priorizar Portal Admin:</strong> Finalizar la sección de <strong>Gestión de Afiliados</strong> en el Portal de Admin, integrando los componentes ya existentes.</li>
    <li><strong>Definir Secciones Faltantes:</strong> Planificar y desarrollar las páginas de <strong>Integraciones</strong> y <strong>Soporte</strong> para completar la oferta de la plataforma.</li>
    <li><strong>Preparar Módulos Futuros:</strong> Comenzar a maquetar las páginas de gestión para <strong>JurisPredict AI</strong> y <strong>Avatar Partner</strong> para que estén listas en sus respectivas fechas de lanzamiento.</li>
</ol>
<p class="text-text-secondary leading-relaxed mt-4">El proyecto tiene una base técnica muy sólida y está en una excelente posición para cumplir con su roadmap de lanzamiento.</p>
`;

const ReportsPage: React.FC = () => {

    const handleDownload = () => {
        const fullHtmlContent = `
        <!DOCTYPE html>
        <html lang="es" class="dark">
          <head>
            <meta charset="UTF-8" />
            <title>Informe de Implementación - NEXUM Platform v4.0</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body {
                background-color: #111827; /* gray-900 */
                color: #f9fafb; /* gray-50 */
                font-family: sans-serif;
                padding: 2rem;
              }
              code {
                font-family: monospace;
              }
            </style>
          </head>
          <body>
            <div class="max-w-4xl mx-auto">
              ${reportHtml}
            </div>
          </body>
        </html>
        `;

        const blob = new Blob([fullHtmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'informe_implementacion_nexum_v4.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('Descarga iniciada.');
    };
    
    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Centro de Reportes</h1>
                    <p className="text-text-secondary mt-1">Informes generados y análisis del sistema.</p>
                </div>
                 <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Informe
                </Button>
            </div>

            <Card className="glass-card">
                <div className="p-6 md:p-8">
                    <div
                        className="prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: reportHtml }}
                    />
                </div>
            </Card>
        </motion.div>
    );
};

export default ReportsPage;