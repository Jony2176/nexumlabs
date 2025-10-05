import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="theme-bg-secondary py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold theme-text-primary mb-8 text-center">
          Política de Privacidad
        </h1>
        
        <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border">
          <div className="prose dark:prose-invert max-w-none text-text-secondary">
            <p className="text-sm theme-text-muted mb-8">
              Última actualización: 18 de Septiembre, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">1. Introducción</h2>
              <p>
                Bienvenido a NEXUM Labs ("nosotros", "nuestro"). Nos comprometemos a proteger su privacidad y a manejar sus datos personales de manera transparente y segura. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información cuando utiliza nuestros servicios en nexumlabs.ai.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">2. Información que Recopilamos</h2>
              <p>Podemos recopilar varios tipos de información, incluyendo:</p>
              <ul>
                <li><strong>Datos de la Cuenta:</strong> Nombre, dirección de correo electrónico, número de teléfono, nombre de la organización, CUIT/CUIL y contraseña al registrarse.</li>
                <li><strong>Datos de Pago:</strong> Información de facturación procesada por nuestros proveedores de pago externos (ej. MercadoPago). No almacenamos los datos completos de su tarjeta de crédito en nuestros servidores.</li>
                <li><strong>Datos de Uso:</strong> Información sobre cómo interactúa con nuestros servicios, como las funciones que utiliza, los clics, los datos de rendimiento, logs de auditoría y metadatos de las interacciones.</li>
                <li><strong>Datos de Comunicación:</strong> Las conversaciones, documentos y datos que procesa a través de nuestros servicios de IA (ELIAS WhatsApp, Llamadas, etc.) se manejan de forma segura y confidencial. No utilizamos los datos de sus clientes para entrenar nuestros modelos sin su consentimiento explícito.</li>
                <li><strong>Cookies y Tecnologías de Seguimiento:</strong> Utilizamos cookies para mejorar su experiencia, analizar el tráfico, personalizar el contenido y para fines de marketing y seguimiento de afiliados. Puede gestionar sus preferencias de cookies en cualquier momento.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">3. Cómo Utilizamos su Información</h2>
              <p>Utilizamos la información que recopilamos para:</p>
              <ul>
                <li>Proveer, operar y mantener nuestros servicios.</li>
                <li>Mejorar, personalizar y expandir nuestros servicios.</li>
                <li>Comprender y analizar cómo utiliza nuestros servicios para optimizar la experiencia.</li>
                <li>Procesar sus transacciones, prevenir fraudes y gestionar su suscripción.</li>
                <li>Comunicarnos con usted para fines de soporte, servicio al cliente, notificaciones del sistema y marketing (siempre con opción de exclusión).</li>
                <li>Cumplir con las obligaciones legales y regulatorias aplicables en la República Argentina.</li>
              </ul>
            </section>
            
            <section className="mb-8">
                <h2 className="text-2xl font-bold theme-text-primary mb-4">4. Seguridad de los Datos</h2>
                <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Esto incluye encriptación de datos en tránsito y en reposo, y controles de acceso estrictos.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">5. Derechos del Usuario (Ley 25.326)</h2>
              <p>De acuerdo con la Ley 25.326 de Protección de los Datos Personales de Argentina, usted tiene derecho a:</p>
                <ul>
                    <li><strong>Acceder</strong> a su información personal.</li>
                    <li><strong>Rectificar</strong> su información si es inexacta o incompleta.</li>
                    <li><strong>Suprimir (eliminar)</strong> sus datos cuando ya no sean necesarios para los fines para los que fueron recopilados.</li>
                </ul>
              <p>Para ejercer estos derechos, por favor contáctenos en <a href="mailto:soporte@nexumlabs.ai" className="text-primary hover:underline">soporte@nexumlabs.ai</a>. La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">6. Cambios a esta Política</h2>
              <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página. Se le aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio.</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
