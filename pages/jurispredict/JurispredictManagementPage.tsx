import React, { useState } from 'react';
import { Calendar, Brain, FileText, TrendingUp, CheckCircle, Upload, Target, Zap, Star } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

const JurispredictManagementPage = () => {
  const [showModal, setShowModal] = useState(false);

  // Set the target date for the countdown
  const targetDate = new Date('2026-03-01T00:00:00');
  const timeLeft = useCountdown(targetDate);

  const formatTime = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center bg-orange-500 rounded-full px-4 py-2 text-sm font-bold mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            BETA DISPONIBLE - MARZO 2026
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              JurisPredict AI
            </span>
          </h1>
          
          <p className="text-xl mb-8">
            Inteligencia Artificial Predictiva Legal con 87% de precisión
          </p>

          <button 
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg mr-4"
          >
            🚀 ÚNETE A LA BETA
          </button>
          
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-full text-lg">
            Ver Demo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">87%</div>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Precisión</div>
            <div className="text-sm text-gray-500">En predicciones reales</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">50,000</div>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Casos</div>
            <div className="text-sm text-gray-500">Base jurisprudencial</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">6 Meses</div>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">→ Minutos</div>
            <div className="text-sm text-gray-500">Análisis reducido</div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Demo Interactivo
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Experimenta el poder del análisis predictivo
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Upload */}
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                1. Sube tu expediente
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Arrastra tu documento aquí
                </p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX hasta 10MB</p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Análisis de jurisprudencia relevante
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Identificación de factores clave
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="p-8 bg-gray-50 dark:bg-gray-700">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                2. Obtén predicción instantánea
              </h3>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-2xl font-bold text-green-500">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Predicción:</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong className="text-green-600">FAVORABLE</strong> - Alta probabilidad basada en jurisprudencia CSJN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">🔥 Beta Exclusiva - Solo 100 Lugares</h2>
          <p className="text-xl mb-8">Lanzamiento: Marzo 2026</p>
          
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-sm">Días</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{formatTime(timeLeft.hours)}</div>
              <div className="text-sm">Horas</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{formatTime(timeLeft.minutes)}</div>
              <div className="text-sm">Minutos</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{formatTime(timeLeft.seconds)}</div>
              <div className="text-sm">Segundos</div>
            </div>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-orange-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-orange-50"
          >
            RESERVAR MI LUGAR
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Testimonios Beta
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. María Rodriguez",
                firm: "Rodriguez & Asociados", 
                text: "La precisión del 87% nos da ventaja competitiva increíble."
              },
              {
                name: "Dr. Carlos Mendez", 
                firm: "Mendez Legal Partners",
                text: "Reducimos análisis de semanas a minutos."
              },
              {
                name: "Dra. Ana Silva",
                firm: "Silva Abogados", 
                text: "Supera cualquier herramienta que hayamos usado."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.firm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Precios de Lanzamiento
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 text-white">
              <div className="bg-yellow-400 text-green-800 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                BETA EXCLUSIVA
              </div>
              <h3 className="text-2xl font-bold mb-2">Precio Beta</h3>
              <div className="text-4xl font-bold mb-4">$197<span className="text-lg">/mes</span></div>
              <p className="mb-6">Precio bloqueado de por vida</p>
              <ul className="text-left space-y-2">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Acceso completo</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Análisis ilimitados</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Soporte prioritario</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Precio Regular</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">$297<span className="text-lg">/mes</span></div>
              <p className="text-gray-600 mb-6">A partir de Marzo 2026</p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Acceso completo</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Análisis ilimitados</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Soporte estándar</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg font-semibold mb-4">💰 Ahorra $100/mes siendo beta tester</p>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg"
            >
              ASEGURAR PRECIO BETA
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              🚀 Únete a la Beta
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Solo quedan <strong>73 lugares</strong>
            </p>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nombre completo"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <input 
                type="email" 
                placeholder="Email profesional"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <input 
                type="text" 
                placeholder="Estudio jurídico"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <select className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <option>Especialización...</option>
                <option>Civil y Comercial</option>
                <option>Laboral</option>
                <option>Penal</option>
                <option>Administrativo</option>
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('¡Registro exitoso! Te contactaremos pronto.');
                  setShowModal(false);
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                RESERVAR LUGAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JurispredictManagementPage;