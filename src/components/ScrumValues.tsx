import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Leaf, Sprout } from 'lucide-react';

const scrumValues = [
  {
    spanish: 'Compromiso', english: 'Compromiso',
    description: 'El equipo se compromete a cumplir el Sprint Goal y entregar un incremento de valor para AgroVision Peru.',
    example: 'Completar las pruebas del pipeline de procesamiento en Apache Spark y la evaluacion inicial del modelo de deteccion.',
    boundary: 'No abandonar tareas criticas sin comunicar los riesgos o impedimentos.',
  },
  {
    spanish: 'Foco', english: 'Foco',
    description: 'El equipo concentra sus esfuerzos en los tres PBIs prioritarios seleccionados para el Sprint.',
    example: 'Priorizar el procesamiento de imagenes multiespectrales y la investigacion de arquitecturas de Deep Learning.',
    boundary: 'No incorporar funcionalidades ajenas al objetivo del Sprint sin evaluar su impacto.',
  },
  {
    spanish: 'Franqueza / Transparencia', english: 'Franqueza',
    description: 'Los tres integrantes comunican abiertamente los problemas tecnicos, errores, avances y riesgos.',
    example: 'Informar sobre overfitting en las CNN, datos corruptos provenientes de drones o costos elevados de GPU.',
    boundary: 'No ocultar metricas deficientes ni presentar modelos no validados como exitosos.',
  },
  {
    spanish: 'Respeto', english: 'Respeto',
    description: 'Cada integrante valora las opiniones y aportes de los demas.',
    example: 'Considerar las observaciones tecnicas del Developer (Piero Aguilar) y las prioridades definidas por el Product Owner (Jordy Ticona).',
    boundary: 'No desacreditar opiniones tecnicas ni ignorar los acuerdos del equipo.',
  },
  {
    spanish: 'Coraje', english: 'Coraje',
    description: 'El equipo tiene la capacidad de reconocer errores y afrontar problemas tecnicos.',
    example: 'Detener un entrenamiento defectuoso y proponer una arquitectura alternativa cuando los resultados no sean adecuados.',
    boundary: 'No mantener modelos deficientes solamente para cumplir una fecha.',
  },
];

export function ScrumValues() {
  const [selected, setSelected] = useState(0);
  const value = scrumValues[selected];

  return (
    <section className="scrum-values-section" aria-labelledby="scrum-values-title">
      <div className="scrum-values-wrap">
        <article className="agronomist-card">
          <span className="agronomist-icon" aria-hidden="true"><Sprout size={22} /></span>
          <div className="agronomist-copy">
            <p className="agronomist-kicker">Perfil de conocimiento del negocio / Interesado del proyecto</p>
            <h3>Especialista Agronomo</h3>
            <p>No forma parte de los tres integrantes del Scrum Team. Aporta el criterio fitosanitario en campo sobre palta Hass y arandanos (Botrytis, aranita roja y estres hidrico), colaborando con Jordy Ticona en la definicion de necesidades agricolas y en la validacion biologica de los resultados.</p>
          </div>
          <aside className="agronomist-relation">
            <h4>Relacion con Scrum Team</h4>
            <p>Aporta criterio de campo y validacion biologica en coordinacion con <strong>Jordy Ticona</strong> (Product Owner).</p>
          </aside>
        </article>

        <div className="scrum-values-heading">
          <p>5.2 Acuerdo de los Cinco Valores Scrum</p>
          <h2 id="scrum-values-title">Compromiso de Valores entre Elias, Jordy y Piero</h2>
          <span>Acuerdo etico y tecnico que guia las decisiones del equipo en riesgos de datos, modelos Deep Learning y entregas iterativas.</span>
        </div>

        <div className="scrum-values-layout">
          <div className="scrum-values-list" role="tablist" aria-label="Valores Scrum">
            {scrumValues.map((item, index) => (
              <button
                className={`scrum-value-option${selected === index ? ' is-selected' : ''}`}
                key={item.english}
                id={`scrum-value-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls="scrum-value-panel"
                onClick={() => setSelected(index)}
              >
                <span className="scrum-value-option-heading">
                  <span><i>{String(index + 1).padStart(2, '0')}</i><b>{item.spanish}</b></span>
                  <small>{item.english}</small>
                </span>
                <span className="scrum-value-option-description">{item.description}</span>
              </button>
            ))}
          </div>

          <article className="scrum-value-detail animated-border" id="scrum-value-panel" role="tabpanel" aria-labelledby={`scrum-value-tab-${selected}`}>
            <p className="scrum-value-kicker">Valor {String(selected + 1).padStart(2, '0')} · {value.english}</p>
            <h3>{value.spanish}</h3>
            <div className="scrum-value-description">
              <small>Descripcion</small>
              <p>{value.description}</p>
            </div>
            <div className="scrum-value-example">
              <h4><CheckCircle2 size={15} /> Ejemplo aplicado a AgroEye-DL</h4>
              <p>{value.example}</p>
            </div>
            <div className="scrum-value-boundary">
              <h4><AlertTriangle size={15} /> Linea roja (lo que el equipo no debe hacer)</h4>
              <p>{value.boundary}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
