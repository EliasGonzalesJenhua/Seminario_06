import { ArrowUp, Printer } from 'lucide-react';

const expectedImpacts = [
  {
    title: 'Detección temprana de enfermedades',
    description: 'Identificamos focos iniciales de Botrytis y arañita roja para intervenir antes de que se expandan.',
  },
  {
    title: 'Reducción de pérdidas agrícolas',
    description: 'Protegemos el rendimiento y la calidad exportable de palta Hass y arándanos.',
  },
  {
    title: 'Optimización del uso de pesticidas',
    description: 'Orientamos la fumigación con mapas de calor y buscamos reducir hasta 30% el uso de insumos.',
  },
  {
    title: 'Mejor gestión del agua',
    description: 'Anticipamos el estrés hídrico hasta siete días con datos de sensores IoT y clima en tiempo real.',
  },
  {
    title: 'Predicción del rendimiento de cosecha',
    description: 'Planificamos la logística por lote y ventana de exportación con estimaciones de cosecha.',
  },
  {
    title: 'Procesamiento escalable de grandes volúmenes de datos',
    description: 'Diseñamos capacidad para ingerir más de 4 TB diarios mediante Kafka, Data Lake y Spark.',
  },
  {
    title: 'Mejor toma de decisiones mediante IA',
    description: 'Convertimos datos complejos de campo en alertas móviles claras y accionables para los agrónomos.',
  },
];

export function Conclusions() {
  const conclusionVideo = new URL('../../videos/Conclusion.mp4', import.meta.url).href;

  return (
    <section id="conclusiones" className="conclusions-section scroll-mt-6" aria-labelledby="conclusions-title">
      <div className="conclusions-wrap">
        <p className="conclusions-kicker"><strong>07</strong><span>Síntesis de impacto esperado · AgroVision Perú S.A.C.</span></p>
        <h2 id="conclusions-title">Conclusiones y Cierre</h2>
        <p className="conclusions-intro">Integramos Big Data, Deep Learning y el marco de trabajo Scrum como base tecnológica sostenible para las 12,000 hectáreas de palta Hass y arándanos.</p>
        <div className="conclusions-grid">
          {expectedImpacts.map((impact, index) => <article className={`conclusion-card${index === 6 ? ' conclusion-card-featured' : ''}`} key={impact.title}>
            <p>{String(index + 1).padStart(2, '0')} · Beneficio esperado</p>
            <h3>{impact.title}</h3>
            <span>{impact.description}</span>
          </article>)}
        </div>

        <div className="conclusions-closing-card">
          <video
            src={conclusionVideo}
            className="conclusions-video"
            aria-label="Video de cierre del proyecto AgroEye-DL"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="conclusions-closing-copy">
            <p className="conclusions-closing-kicker">AgroVision Perú S.A.C. · SENATI</p>
            <blockquote>“AgroEye-DL transforma los datos agrícolas en inteligencia predictiva para construir una agricultura más eficiente, sostenible y tecnológica.”</blockquote>
            <div className="conclusions-actions">
              <a href="#top"><ArrowUp size={15} /> Volver al inicio</a>
              <button type="button" onClick={() => window.print()}><Printer size={15} /> Imprimir / Guardar PDF</button>
            </div>
          </div>
        </div>

        <footer className="conclusions-footer">
          <p><strong>AGROEYE-DL</strong><span>·</span> AgroVision Perú S.A.C.</p>
          <p>Equipo: Elías Gonzales (Scrum Master) · Jordy Ticona (Product Owner) · Piero Aguilar (Developer)</p>
        </footer>
      </div>
    </section>
  );
}
