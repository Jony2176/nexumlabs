
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

const PublicFooter: React.FC = () => {
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('¡Gracias por suscribirte a nuestro newsletter!');
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <Logo className="h-14 mb-4" />
            <p className="text-gray-300 text-sm max-w-xs">
              Automatizando la inteligencia legal en Latinoamérica
            </p>
             <p className="text-gray-400 text-xs mt-4">
              Buenos Aires, Argentina - {new Date().getFullYear()}
            </p>
          </div>

          {/* Productos */}
          <div>
            <h4 className="font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/productos/jurispredict-ai" className="hover:text-white font-bold">JurisPredict AI</Link></li>
              <li><Link to="/productos/elias-whatsapp" className="hover:text-white">ELIAS WhatsApp</Link></li>
              <li><Link to="/productos/elias-llamadas" className="hover:text-white">ELIAS Llamadas</Link></li>
              <li><Link to="/productos/dashboard" className="hover:text-white">Dashboard Premium</Link></li>
              <li><Link to="/productos/avatar" className="hover:text-white">Avatar Partner</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/sobre-nosotros" className="hover:text-white">Sobre Nosotros</Link></li>
              <li><Link to="/casos-exito" className="hover:text-white">Casos de Éxito</Link></li>
              <li><Link to="/programa-afiliados" className="hover:text-white">Programa de Afiliados</Link></li>
              <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
               <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          
           {/* Legal y Soporte */}
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/centro-ayuda" className="hover:text-white">Centro de Ayuda</Link></li>
              <li><Link to="/terminos" className="hover:text-white">Términos de Servicio</Link></li>
              <li><Link to="/privacidad" className="hover:text-white">Política de Privacidad</Link></li>
              <li><a href="mailto:soporte@nexumlabs.ai" className="hover:text-white">soporte@nexumlabs.ai</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
             <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} NEXUM Labs. Todos los derechos reservados.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="Tu email para novedades" required className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full md:w-64" />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 rounded-lg p-2.5 flex-shrink-0"><Send className="w-4 h-4" /></button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
