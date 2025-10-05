
export const JURISPREDICT_MOCK_DATA = {
  casos_analizados: [
    {
      id: "caso_001",
      titulo: "Despido sin justa causa - Ejecutivo Senior",
      tipo: "Laboral",
      fecha_analisis: "2024-09-20",
      probabilidad_exito: 73,
      monto_estimado: { min: 450000, max: 680000 },
      tiempo_estimado: "14-18 meses",
      juez_asignado: "Dr. María Fernández",
      tribunal: "Juzgado Laboral N°3 CABA",
      casos_similares: 23,
      confidence_score: 0.87
    },
    {
      id: "caso_002", 
      titulo: "Accidente de tránsito - Lesiones graves",
      tipo: "Civil",
      fecha_analisis: "2024-09-19",
      probabilidad_exito: 91,
      monto_estimado: { min: 1200000, max: 1800000 },
      tiempo_estimado: "10-12 meses",
      juez_asignado: "Dr. Roberto Silva",
      tribunal: "Juzgado Civil N°15 CABA", 
      casos_similares: 45,
      confidence_score: 0.93
    }
  ],

  metricas_globales: {
    precision_promedio: 87.3,
    casos_total: 1247,
    tiempo_ahorro_mensual: 340,
    roi_cliente_promedio: 45600,
    satisfaccion_cliente: 4.8
  },

  example_cases: [
    { id: "1", title: "Análisis de despido sin causa", status: "Completado", accuracy: 92 },
    { id: "2", title: "Reclamo por vicios ocultos en inmueble", status: "Analizando", accuracy: null },
    { id: "3", title: "Caso de mala praxis médica", status: "Completado", accuracy: 85 },
  ],

  beta_testimonials: [
    { name: "Dra. Sofía Alvear", firm: "Estudio Alvear & Asoc.", quote: "JurisPredict nos dio una ventaja competitiva increíble. Ahora sabemos qué casos tomar y cuáles negociar desde el día uno." },
    { name: "Dr. Ramiro Cortés", firm: "Cortés Abogados", quote: "La precisión es asombrosa. Ahorramos incontables horas de investigación de jurisprudencia." },
  ]
};