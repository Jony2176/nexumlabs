
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import SEO from '../../components/seo/SEO';

const blogPosts = [
  {
    title: "Cómo la IA está revolucionando los estudios jurídicos en Argentina [2025]",
    description: "El sector legal se enfrenta a una transformación ineludible. Descubra cómo la inteligencia artificial ya no es el futuro, sino el presente competitivo del derecho en Argentina.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    link: "/blog/ia-revolucion-juridica",
    category: "Legal Tech",
    date: "23 Sep, 2025"
  },
  {
    title: "5 Mitos sobre Legal Tech que Frenan a tu Estudio",
    description: "Desmitificamos las creencias más comunes que impiden a los abogados adoptar tecnologías que podrían duplicar su eficiencia y rentabilidad.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
    link: "#",
    category: "Innovación",
    date: "15 Ago, 2025"
  },
  {
    title: "Guía Práctica: Cómo Digitalizar tu Estudio Jurídico Paso a Paso",
    description: "Desde la gestión de documentos en la nube hasta la automatización de la atención al cliente. Una hoja de ruta clara para modernizar tu práctica legal.",
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    link: "#",
    category: "Gestión",
    date: "02 Jul, 2025"
  },
  {
    title: "El Futuro de la Contratación de Abogados: El Rol del Marketing Digital",
    description: "Analizamos cómo los clientes buscan y eligen representación legal en la era digital y qué puedes hacer para destacar entre la competencia.",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
    link: "#",
    category: "Marketing",
    date: "10 Jun, 2025"
  }
];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post =>
    activeCategory === 'Todos' || post.category === activeCategory
  );

  return (
    <>
      <SEO 
        title="Blog - Legal Tech & IA para Abogados | NEXUM Labs"
        description="Insights, análisis y guías sobre la intersección de la tecnología, la inteligencia artificial y el derecho en Latinoamérica."
      />
      <div className="theme-bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Blog de NEXUM Labs</h1>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
              Insights, análisis y guías sobre la intersección de la tecnología, la inteligencia artificial y el derecho en Latinoamérica.
            </p>
          </header>

          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-full transition-all duration-300',
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'theme-bg-card theme-text-secondary hover:bg-primary/20 hover:text-primary'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.main
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  key={post.title}
                  className="card-premium flex flex-col group"
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center text-xs text-text-muted mb-2">
                      <span className="font-semibold text-primary">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-primary mb-3 flex-grow">{post.title}</h2>
                    <p className="text-sm text-text-secondary mb-4">{post.description}</p>
                    
                    {post.link !== "#" ? (
                      <Link to={post.link} className="mt-auto inline-flex items-center text-primary font-semibold group-hover:underline">
                        Leer más <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="mt-auto inline-flex items-center text-text-muted font-semibold cursor-not-allowed"
                      >
                        Próximamente...
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
    </>
  );
};

export default BlogPage;