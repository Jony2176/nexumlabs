import React, { useState } from 'react';
import { EXTERNAL_ASSETS } from '../../config/assets.config';
import { Linkedin, Github, CheckCircle } from 'lucide-react';

const FounderCard: React.FC<{ name: string, title: string, bio: string, photo: string, linkedin: string, github?: string }> = 
({ name, title, bio, photo, linkedin, github }) => {
    const [imageError, setImageError] = useState(false);
    const initials = name.split(' ').map(n => n[0]).join('');

    return (
        <div className="theme-bg-card rounded-lg p-8 shadow-lg text-center border theme-border flex flex-col items-center">
            {!imageError ? (
                <img src={photo} alt={name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-md" onError={() => setImageError(true)} />
            ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-4xl font-bold">{initials}</span>
                </div>
            )}
            <h3 className="text-2xl font-bold theme-text-primary mb-1">{name}</h3>
            <p className="text-primary font-semibold mb-4">{title}</p>
            <p className="theme-text-secondary leading-relaxed mb-6 flex-grow">{bio}</p>
            <div className="flex justify-center space-x-4 mt-auto">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${name}`} className="text-gray-400 hover:text-blue-500 transition-colors"><Linkedin className="h-6 w-6" /></a>
                {github && <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${name}`} className="text-gray-400 hover:text-white transition-colors"><Github className="h-6 w-6" /></a>}
            </div>
        </div>
    );
};

const AboutPage: React.FC = () => {
  return (
    <div className="theme-bg-secondary">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Transformando el Futuro Legal de Latinoamérica</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Somos pioneros en automatización legal con inteligencia artificial, redefiniendo la eficiencia y competitividad de los estudios jurídicos.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Our Story & Timeline */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold theme-text-primary mb-12 text-center">Nuestra Historia</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border">
              <p className="text-lg theme-text-secondary leading-relaxed mb-6">
                NEXUM Labs nació en 2024 en Buenos Aires con una visión clara: democratizar el acceso a tecnología legal avanzada. Nuestros fundadores, Sol Meza y Jonatan Ertel, unieron su profundo conocimiento del derecho y la ingeniería de IA para resolver un problema persistente: la ineficiencia administrativa que frena el crecimiento de los estudios jurídicos.
              </p>
              <p className="text-lg theme-text-secondary leading-relaxed">
                Nuestra suite ELIAS (Expert Legal Intelligence Assistant System) es el resultado de esa visión, una plataforma diseñada desde cero para las necesidades específicas del mercado legal latinoamericano.
              </p>
            </div>
            {/* Timeline */}
            <div className="space-y-8 relative">
              <div className="absolute left-4 top-2 h-full w-0.5 bg-border-color"></div>
              <div className="relative pl-12">
                <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-bg-secondary -translate-x-1/2"></div>
                <p className="font-bold text-primary">2024 - Fundación</p>
                <p className="text-sm theme-text-secondary">Nace la idea y se forma el equipo fundador.</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-bg-secondary -translate-x-1/2"></div>
                <p className="font-bold text-primary">2025 - Lanzamiento Beta</p>
                <p className="text-sm theme-text-secondary">ELIAS WhatsApp y Llamadas son lanzados con 10 estudios pioneros.</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full border-4 border-bg-secondary -translate-x-1/2"></div>
                <p className="font-bold text-primary">Sept. 2025 - Hito</p>
                <p className="text-sm theme-text-secondary">Alcanzamos 25 clientes activos y 89 afiliados.</p>
              </div>
              <div className="relative pl-12">
                 <div className="absolute left-4 top-2 w-4 h-4 bg-gray-500 rounded-full border-4 border-bg-secondary -translate-x-1/2"></div>
                <p className="font-bold theme-text-primary">2026 - Futuro</p>
                <p className="text-sm theme-text-secondary">Lanzamiento de JurisPredict AI y expansión a nuevos mercados.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Founders */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold theme-text-primary mb-12 text-center">Los Fundadores</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FounderCard name="Sol Meza" title="CEO & Co-Fundadora" bio="Abogada (UBA) con 10 años de experiencia y especialista en derecho tecnológico. Apasionada por aplicar la IA para resolver problemas reales del sector legal." photo={EXTERNAL_ASSETS.team.solMeza} linkedin="https://linkedin.com/in/solmeza" />
            <FounderCard name="Jonatan Ertel" title="CTO & Co-Fundador" bio="Ingeniero en sistemas con 15 años de experiencia en desarrollo de software a gran escala. Experto en inteligencia artificial y automatización de procesos complejos." photo={EXTERNAL_ASSETS.team.jonatanErtel} linkedin="https://linkedin.com/in/jonaertel" github="https://github.com/jonaertel" />
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-20 text-center">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="theme-bg-card rounded-lg p-8 border theme-border">
                    <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Misión</h3>
                    <p className="theme-text-secondary">"Democratizar el acceso a tecnología legal avanzada para que cada estudio jurídico en Latinoamérica pueda competir en la era digital."</p>
                </div>
                <div className="theme-bg-card rounded-lg p-8 border theme-border">
                    <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Visión</h3>
                    <p className="theme-text-secondary">"Ser la plataforma #1 de automatización legal en Latinoamérica para 2028, con presencia en 10 países y 10,000 estudios activos."</p>
                </div>
            </div>
        </section>

        {/* Key Numbers */}
        <section>
             <h2 className="text-4xl font-bold theme-text-primary mb-12 text-center">Números que nos respaldan</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 <div><p className="text-4xl font-bold text-primary">25+</p><p className="theme-text-secondary">Estudios Activos</p></div>
                 <div><p className="text-4xl font-bold text-primary">89</p><p className="theme-text-secondary">Afiliados</p></div>
                 <div><p className="text-4xl font-bold text-primary">$31k+</p><p className="theme-text-secondary">USD Procesados</p></div>
                 <div><p className="text-4xl font-bold text-primary">98%</p><p className="theme-text-secondary">Satisfacción Cliente</p></div>
             </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
