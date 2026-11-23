import { useMemo, useState } from 'react';
import { ArrowDownUp, Search, SlidersHorizontal, X } from 'lucide-react';

type BacklogType = 'Historia de Usuario' | 'Spike' | 'Bug' | 'Deuda Técnica';

type BacklogItem = {
  id: string;
  type: BacklogType;
  title: string;
  description: string;
  priorityReason: string;
  businessValue: string;
  checks: string[];
};

const items: BacklogItem[] = [
  { id: 'PBI 01', type: 'Spike', title: 'Validación del pipeline Apache Spark', description: 'Investigar si el pipeline de ingesta puede procesar 4 TB de imágenes multiespectrales en menos de tres horas sin desbordamiento de memoria.', priorityReason: 'Mitiga el riesgo de un cuello de botella en la arquitectura Big Data.', businessValue: 'Garantiza viabilidad operativa antes de escalar sobre 12,000 hectáreas.', checks: ['Prueba de carga controlada con tiempos de procesamiento y memoria en Spark.', 'Validación de particionado inicial del Data Lake en la nube.', 'Documentación de hallazgos técnicos para decidir el escalamiento.'] },
  { id: 'PBI 02', type: 'Historia de Usuario', title: 'Detección de Botrytis', description: 'Como Jefe de Sanidad Vegetal, quiero recibir un mapa de calor con las zonas afectadas por Botrytis para aplicar una fumigación focalizada y reducir el uso de pesticidas en un 30%.', priorityReason: 'Permite optimizar insumos y reducir pérdidas de lotes de exportación.', businessValue: 'Reducción proyectada de hasta 30% en pesticidas y menor merma exportable.', checks: ['Mapa de calor por lote con zonas de riesgo diferenciadas.', 'Visualización de resultados por fecha y sector agrícola.', 'Validación del modelo con registros de campo.'] },
  { id: 'PBI 03', type: 'Spike', title: 'Evaluación de arquitecturas de Deep Learning', description: 'Investigar y comparar CNN, ResNet, U-Net y Vision Transformers para la segmentación de enfermedades agrícolas.', priorityReason: 'Permite seleccionar una arquitectura adecuada para el proyecto.', businessValue: 'Optimiza la inversión en GPU y la precisión diagnóstica antes de producción.', checks: ['Comparación de arquitecturas con el mismo conjunto de datos.', 'Registro de precisión, tiempo de entrenamiento y costo GPU.', 'Recomendación técnica documentada para el equipo.'] },
  { id: 'PBI 04', type: 'Historia de Usuario', title: 'Predicción de estrés hídrico', description: 'Como Ingeniero Agrónomo, quiero recibir predicciones de estrés hídrico a siete días para anticipar las necesidades de riego.', priorityReason: 'Permite anticipar riesgos de pérdidas por falta de agua.', businessValue: 'Protege calibre en palta Hass y firmeza en arándanos optimizando agua.', checks: ['Pronóstico de estrés hídrico con horizonte de siete días.', 'Consulta de predicciones por lote y cultivo.', 'Contraste con humedad de suelo y registros de riego.'] },
  { id: 'PBI 05', type: 'Historia de Usuario', title: 'Monitoreo IoT', description: 'Como Administrador Agrícola, quiero visualizar los datos de los 25,000 sensores IoT para supervisar humedad del suelo y condiciones meteorológicas.', priorityReason: 'Mejora la toma de decisiones operativas en tiempo real.', businessValue: 'Control unificado de La Libertad, Lambayeque e Ica desde un solo panel.', checks: ['Vista de sensores por fundo, lote y tipo de medición.', 'Identificación de sensores sin señal o con lecturas anómalas.', 'Actualización del panel con datos recientes.'] },
  { id: 'PBI 06', type: 'Spike', title: 'Validación de modelos temporales', description: 'Investigar LSTM y Temporal Fusion Transformers para predecir el comportamiento hídrico de los cultivos.', priorityReason: 'Reduce la incertidumbre tecnológica del componente predictivo.', businessValue: 'Respalda científicamente el módulo de estrés hídrico a siete días.', checks: ['Prueba comparativa de LSTM y Temporal Fusion Transformers.', 'Evaluación con series históricas disponibles.', 'Conclusiones sobre precisión y costo de cómputo.'] },
  { id: 'PBI 07', type: 'Historia de Usuario', title: 'Predicción de cosecha', description: 'Como Gerente de Operaciones, quiero consultar el rendimiento estimado de cosecha por lote para planificar las operaciones de exportación.', priorityReason: 'Mejora la planificación logística y comercial.', businessValue: 'Alinea cuadrillas, planta de empaque y embarques internacionales.', checks: ['Estimación de rendimiento consultable por lote.', 'Resumen de cosecha por fundo y ventana de tiempo.', 'Contraste del estimado con resultados históricos.'] },
  { id: 'PBI 08', type: 'Bug', title: 'Corrección de datos corruptos de drones', description: 'Como equipo de datos, necesitamos corregir el procesamiento de imágenes con ruido atmosférico y formatos heterogéneos para evitar errores en el entrenamiento.', priorityReason: 'Protege la calidad de los datasets.', businessValue: 'Evita entrenamientos fallidos y sesgos radiométricos en campo.', checks: ['Detección de imágenes incompletas o con formato no válido.', 'Registro de imágenes rechazadas y motivo.', 'Validación de consistencia radiométrica del conjunto limpio.'] },
  { id: 'PBI 09', type: 'Deuda Técnica', title: 'Optimización del almacenamiento', description: 'Como equipo de ingeniería, necesitamos optimizar el particionamiento y almacenamiento del Data Lake para reducir costos y mejorar el rendimiento de consultas.', priorityReason: 'Mejora la escalabilidad y eficiencia financiera en la nube.', businessValue: 'Controla el costo recurrente de almacenar más de 4 TB diarios.', checks: ['Medición del costo y tiempo de consulta actuales.', 'Propuesta de particionado por cultivo, fecha y lote.', 'Comparación de rendimiento antes y después del ajuste.'] },
  { id: 'PBI 10', type: 'Historia de Usuario', title: 'Alertas móviles', description: 'Como Agrónomo de Campo, quiero recibir alertas comprensibles en mi dispositivo móvil para actuar rápidamente ante riesgos fitosanitarios.', priorityReason: 'Acelera la respuesta ante problemas agrícolas en terreno.', businessValue: 'Conecta la predicción de IA directamente con la cuadrilla de campo.', checks: ['Alerta con riesgo, ubicación y recomendación de acción.', 'Diseño legible en dispositivos móviles.', 'Prueba de entrega y recepción en campo.'] },
];

const typeCounts: { label: BacklogType; count: number }[] = [
  { label: 'Historia de Usuario', count: 5 },
  { label: 'Spike', count: 3 },
  { label: 'Bug', count: 1 },
  { label: 'Deuda Técnica', count: 1 },
];

const filters = ['Todos', 'Historia de Usuario', 'Spike', 'Bug', 'Deuda Técnica'] as const;

export function ProductBacklog() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todos');
  const [query, setQuery] = useState('');
  const [descending, setDescending] = useState(false);
  const [selectedId, setSelectedId] = useState('PBI 01');
  const [selectedChartType, setSelectedChartType] = useState<BacklogType | null>(null);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return items
      .filter((item) => filter === 'Todos' || item.type === filter)
      .filter((item) => !normalizedQuery || `${item.id} ${item.title} ${item.description} ${item.type}`.toLocaleLowerCase().includes(normalizedQuery))
      .sort((a, b) => descending ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id));
  }, [filter, query, descending]);

  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <section className="product-backlog-section" aria-labelledby="backlog-title">
      <div className="product-backlog-wrap">
        <div className="product-backlog-kicker"><strong>ÍTEM 02</strong><span>Entregable obligatorio · Administrado y priorizado por Jordy Ticona (Product Owner)</span></div>
        <h2 id="backlog-title">Construcción del Product Backlog</h2>
        <p className="product-backlog-intro">Backlog estructurado con 5 historias de usuario, 3 Spikes técnicos, 1 Bug crítico y 1 elemento de deuda técnica, ordenados del 1 al 10 según riesgo arquitectónico y valor agroexportador.</p>

        <div className="backlog-summary-grid">
          {typeCounts.map(({ label, count }) => (
            <article className="backlog-summary-card" key={label}>
              <strong>{String(count).padStart(2, '0')}</strong><span>{label === 'Historia de Usuario' ? 'Historias de Usuario' : label === 'Spike' ? 'Spikes' : label === 'Bug' ? 'Bugs críticos' : 'Deuda Técnica'}</span>
            </article>
          ))}
          <article className="backlog-chart-card" aria-label="Resumen estadístico por tipo">
            <div className="backlog-chart-heading"><span>Resumen estadístico por tipo</span><strong>10 PBIs totales</strong></div>
            <div className="backlog-chart-bars">
              {typeCounts.map(({ label, count }) => <button className={`backlog-chart-column${selectedChartType === label ? ' is-selected' : ''}`} key={label} type="button" aria-label={`${label}: ${count} elementos. Filtrar por este tipo`} aria-pressed={selectedChartType === label} onClick={() => { const next = selectedChartType === label ? null : label; setSelectedChartType(next); setFilter(next ?? 'Todos'); }}><i style={{ height: `${Math.max(12, count * 8)}px` }} /><small>{label === 'Historia de Usuario' ? 'Historias' : label === 'Deuda Técnica' ? 'Deuda' : label}</small><span className="backlog-chart-tooltip">{label}<br /><b>Cantidad: {count}</b></span></button>)}
            </div>
          </article>
        </div>

        <div className="backlog-toolbar">
          <div className="backlog-filters"><SlidersHorizontal size={15} aria-hidden="true" /><span>Filtrar tipo:</span>
            {filters.map((entry) => <button key={entry} type="button" className={filter === entry ? 'is-active' : ''} onClick={() => setFilter(entry)}>{entry === 'Historia de Usuario' ? 'Historias' : entry}</button>)}
          </div>
          <button className="backlog-sort" type="button" onClick={() => setDescending((value) => !value)}><ArrowDownUp size={14} /> Prioridad: {descending ? '10 → 1' : '1 → 10'}</button>
          <label className="backlog-search"><Search size={14} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar PBI, Spark, Botrytis..." /><span className="sr-only">Buscar en el backlog</span></label>
        </div>

        <div className="backlog-content-grid">
          <div className="backlog-table-wrap">
            <table className="backlog-table">
              <thead><tr><th>Prioridad</th><th>ID</th><th>Tipo</th><th>Elemento y descripción</th><th>Justificación de prioridad</th><th>Valor para el negocio</th></tr></thead>
              <tbody>
                {visibleItems.map((item) => <tr key={item.id} onClick={() => setSelectedId(item.id)} className={selectedId === item.id ? 'is-selected' : ''} aria-selected={selectedId === item.id}>
                  <td><span className="backlog-priority">#{item.id.slice(-2)}</span></td><td><strong>{item.id}</strong></td><td><span className={`backlog-type backlog-type-${item.type.toLowerCase().replaceAll(' ', '-')}`}>{item.type}</span></td><td><b>{item.title}</b><p>{item.description}</p></td><td>{item.priorityReason}</td><td>{item.businessValue}</td>
                </tr>)}
                {visibleItems.length === 0 && <tr><td colSpan={6} className="backlog-empty">No encontramos PBIs con esos filtros.</td></tr>}
              </tbody>
            </table>
          </div>

          <aside className="backlog-detail animated-border" aria-label={`Detalle de ${selectedItem.id}`}>
            <div className="backlog-detail-top"><span>{selectedItem.id} · Prioridad #{selectedItem.id.slice(-2)}</span><button type="button" aria-label="Limpiar selección" onClick={() => setSelectedId('PBI 01')}><X size={14} /></button></div>
            <h3>{selectedItem.title}</h3>
            <div className="backlog-detail-block"><small>Tipo de elemento</small><b>{selectedItem.type}</b></div>
            <div className="backlog-detail-block"><small>Descripción</small><p>{selectedItem.description}</p></div>
            <div className="backlog-detail-block"><small>Justificación de prioridad</small><p>{selectedItem.priorityReason}</p></div>
            <div className="backlog-detail-block backlog-business-value"><small>Valor para el negocio</small><p>{selectedItem.businessValue}</p></div>
            <div className="backlog-detail-block"><small>Criterios de verificación propuestos</small><ol>{selectedItem.checks.map((check, index) => <li key={check}><span>{String(index + 1).padStart(2, '0')}.</span>{check}</li>)}</ol></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
