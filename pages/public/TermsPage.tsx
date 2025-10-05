import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="theme-bg-secondary py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold theme-text-primary mb-8 text-center">
          Términos y Condiciones de Servicio
        </h1>
        
        <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border">
          <div className="prose dark:prose-invert max-w-none text-text-secondary">
            <p className="text-sm theme-text-muted mb-8">
              Última actualización: 18 de Septiembre, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar los servicios de NEXUM Labs ("nosotros", "nuestro" o "la empresa"), usted ("el usuario", "cliente") acepta estar sujeto a estos Términos de Servicio ("Términos") y a todas las leyes y regulaciones aplicables en la República Argentina. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">2. Descripción del Servicio</h2>
              <p>
                NEXUM Labs ofrece una plataforma de software como servicio (SaaS) de automatización legal basada en inteligencia artificial ("Servicio"), incluyendo pero no limitándose a: ELIAS WhatsApp Bot, ELIAS Llamadas, Dashboard Premium y JurisPredict AI. El Servicio se proporciona "tal cual" y nos reservamos el derecho de modificar o descontinuar el servicio con o sin previo aviso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">3. Responsabilidades del Usuario</h2>
              <p>El usuario se compromete a:</p>
              <ul>
                <li>Proporcionar información de registro veraz, precisa y actualizada.</li>
                <li>Mantener la confidencialidad y seguridad de sus credenciales de acceso.</li>
                <li>Usar el servicio de acuerdo con todas las leyes y regulaciones aplicables, incluyendo las normas de ética profesional para abogados.</li>
                <li>No utilizar el servicio para fines ilegales, no autorizados o que infrinjan derechos de terceros.</li>
                <li>No interferir, interrumpir ni intentar obtener acceso no autorizado a los sistemas de NEXUM Labs.</li>
                <li>Asumir la responsabilidad final por cualquier consejo legal, decisión o acción tomada, entendiendo que nuestras herramientas son de soporte y no reemplazan el juicio profesional de un abogado matriculado.</li>
              </ul>
            </section>
            
             <section className="mb-8">
                <h2 className="text-2xl font-bold theme-text-primary mb-4">4. Propiedad Intelectual</h2>
                <p>Todo el software, contenido, marcas registradas y otros materiales del Servicio son propiedad exclusiva de NEXUM Labs. El usuario se compromete a no copiar, modificar, distribuir o crear trabajos derivados basados en nuestro Servicio. Los datos que usted ingresa en la plataforma son de su propiedad.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">5. Pagos, Facturación y Cancelación</h2>
              <p>
                Los servicios se facturan por adelantado de forma recurrente (mensual o anualmente). Los pagos no son reembolsables, excepto durante el período de garantía de satisfacción de 30 días para nuevos clientes. El usuario es responsable de todos los impuestos aplicables. Puede cancelar su suscripción en cualquier momento desde su panel de control; la cancelación será efectiva al final del período de facturación actual.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">6. Limitación de Responsabilidad</h2>
              <p>
                En ningún caso NEXUM Labs o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surja del uso o la incapacidad de usar los servicios, incluso si NEXUM Labs ha sido notificado de la posibilidad de dicho daño. El Servicio no constituye asesoramiento legal y las decisiones basadas en su uso son de exclusiva responsabilidad del usuario.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold theme-text-primary mb-4">7. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos términos se regirán e interpretarán de acuerdo con las leyes de la República Argentina, y usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
