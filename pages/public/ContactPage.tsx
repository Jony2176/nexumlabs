import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    toast.success(`Gracias por tu mensaje, ${name}. Nos pondremos en contacto pronto.`);
    e.currentTarget.reset();
  }

  return (
    <div className="theme-bg-secondary py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
            <h1 className="text-5xl font-bold theme-text-primary">Hablemos</h1>
            <p className="mt-4 text-lg theme-text-secondary max-w-2xl mx-auto">Estamos aquí para ayudarte a transformar tu estudio. Contáctanos por el medio que prefieras.</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border">
            <h3 className="text-2xl font-bold mb-6 theme-text-primary">Envíanos un mensaje</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1 theme-text-primary">Nombre Completo</label><input name="name" type="text" className="w-full px-3 py-2 rounded-lg" required/></div>
                <div><label className="block text-sm font-medium mb-1 theme-text-primary">Email</label><input name="email" type="email" className="w-full px-3 py-2 rounded-lg" required/></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1 theme-text-primary">Nombre del Estudio</label><input name="firm" type="text" className="w-full px-3 py-2 rounded-lg" /></div>
                <div><label className="block text-sm font-medium mb-1 theme-text-primary">Asunto</label><select name="subject" className="w-full px-3 py-2 rounded-lg"><option>Consulta de Ventas</option><option>Soporte Técnico</option><option>Programa de Afiliados</option><option>Otro</option></select></div>
              </div>
              <div><label className="block text-sm font-medium mb-1 theme-text-primary">Mensaje</label><textarea name="message" rows={4} className="w-full px-3 py-2 rounded-lg" required></textarea></div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Enviar Mensaje</button>
            </form>
          </div>

          {/* Contact Info & Demo */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 theme-text-primary">Otras formas de contactarnos</h3>
              <div className="space-y-6">
                <a href="mailto:ventas@nexumlabs.ai" className="flex items-start space-x-4 group"><div className="text-blue-500 text-2xl mt-1"><Mail/></div><div><h4 className="font-semibold theme-text-primary group-hover:text-blue-500">Email</h4><p className="theme-text-secondary">ventas@nexumlabs.ai</p></div></a>
                <a href="https://wa.me/5491150499608" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group"><div className="text-whatsapp-green text-2xl mt-1"><Phone/></div><div><h4 className="font-semibold theme-text-primary group-hover:text-whatsapp-green">WhatsApp</h4><p className="theme-text-secondary">+54 11 5049-9608</p></div></a>
                <div className="flex items-start space-x-4"><div className="text-text-muted text-2xl mt-1"><MapPin/></div><div><h4 className="font-semibold theme-text-primary">Oficina</h4><p className="theme-text-secondary">Puerto Madero, Buenos Aires, Argentina</p></div></div>
              </div>
            </div>
            
            <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-8 w-8 text-primary"/>
                <h3 className="text-2xl font-bold theme-text-primary">Agenda una Demo</h3>
              </div>
              <p className="theme-text-secondary mb-6">Elige un horario de 30 minutos para una demostración personalizada de la plataforma.</p>
              {/* Placeholder for Calendly embed */}
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="theme-text-muted">Calendly Embed Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
