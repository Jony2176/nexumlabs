export const AVATAR_MOCK_DATA = {
  metrics: {
    consultas_mes: 456,
    consultas_change: 89,
    satisfaccion: 4.8,
    casos_resueltos_pct: 92,
    tiempo_respuesta_seg: 2,
    tiempo_ahorro_sem: 28,
    roi_estimado: 8400,
  },
  initial_messages: [
    {
      id: 1,
      type: 'avatar' as const,
      text: 'Hola! Soy ELIAS, tu consultor legal virtual. ¿En qué puedo ayudarte hoy?',
      timestamp: '10:30'
    },
    {
      id: 2,
      type: 'user' as const,
      text: 'Necesito saber los 3 puntos clave para una demanda por despido sin justa causa.',
      timestamp: '10:31'
    },
    {
      id: 3,
      type: 'avatar' as const,
      text: 'Claro. Los 3 puntos clave son: 1) Acreditar la relación laboral, 2) Demostrar la inexistencia de causa justa, y 3) Realizar el reclamo formal (telegrama) dentro de los plazos legales. ¿Quieres que profundice en alguno de ellos?',
      timestamp: '10:31'
    }
  ],
  personality_config: {
    name: 'ELIAS',
    persona: 'Experto Legal Senior',
    tone: 'Formal y Conciso',
    language: 'Español (Argentina)',
  },
  knowledge_base: [
    { name: 'Código Civil y Comercial.pdf', size: '5.2 MB', status: 'active' },
    { name: 'Manual de Procedimiento Interno.docx', size: '1.8 MB', status: 'active' },
    { name: 'Jurisprudencia Laboral 2024.zip', size: '25.6 MB', status: 'indexing' },
  ],
  conversation_history: [
    { title: "Análisis de caso 'López vs. Constructora S.A.'", date: "2024-09-22", duration: "15 min" },
    { title: "Revisión de cláusulas de contrato de alquiler", date: "2024-09-22", duration: "8 min" },
    { title: "Consulta sobre Ley de Defensa del Consumidor", date: "2024-09-21", duration: "12 min" },
  ],
  analytics: {
    top_topics: [
      { topic: "Derecho Laboral", percentage: 45 },
      { topic: "Derecho de Familia", percentage: 25 },
      { topic: "Daños y Perjuicios", percentage: 15 },
      { topic: "Contratos", percentage: 10 },
      { topic: "Otros", percentage: 5 },
    ],
  },
};
