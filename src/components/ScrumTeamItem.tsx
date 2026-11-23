import { useEffect, useState } from 'react';
import { BriefcaseBusiness, ChevronDown, ChevronUp, Cpu, ShieldCheck } from 'lucide-react';

const responsibilities = [
  'Facilito la aplicacion del marco de trabajo Scrum.',
  'Promuevo los cinco valores Scrum en el trabajo diario.',
  'Preparo y facilito los eventos Scrum con acuerdos claros.',
  'Identifico impedimentos y coordino con el equipo como resolverlos.',
  'Hago visible el avance, los riesgos y las decisiones del Sprint.',
  'Conduzco espacios de mejora continua y doy seguimiento a sus acuerdos.',
  'Ayudo al equipo a mantener el foco en el objetivo del Sprint.',
];

const pillars = [
  {
    tags: 'Planning · Daily · Review · Retrospectiva',
    title: 'Facilitación de Eventos Scrum',
    description: 'Facilito las ceremonias del Sprint de 2 semanas y cierro cada espacio con objetivos y acuerdos accionables.',
  },
  {
    tags: 'GPU · Acceso a Datos · Latencia',
    title: 'Remoción de Impedimentos',
    description: 'Coordino la solución de bloqueos de GPU, acceso a imágenes de drones y coordinación operativa.',
  },
  {
    tags: 'Compromiso · Foco · Franqueza · Respeto · Coraje',
    title: 'Custodia de Valores y DoD',
    description: 'Promuevo la transparencia de las métricas y ayudo a sostener los criterios de la Definition of Done.',
  },
  {
    tags: 'Sostenibilidad técnica',
    title: 'Mejora Continua del Flujo',
    description: 'Propongo mejoras en el flujo entre ingesta Spark, entrenamiento y validación, y doy seguimiento a su impacto.',
  },
];

const productOwnerResponsibilities = [
  'Represento las necesidades del negocio y las comparto con el equipo.',
  'Defino el Product Goal y comunico como guia las decisiones del producto.',
  'Mantengo el Product Backlog claro, ordenado y disponible.',
  'Priorizo los Product Backlog Items segun su valor y riesgo.',
  'Busco maximizar el valor que entrega cada incremento.',
  'Comunico al equipo los objetivos de AgroVision Peru.',
  'Valido que las funcionalidades respondan a necesidades agricolas reales.',
];

const productOwnerPillars = [
  {
    tags: '12,000 ha · Palta Hass y Arándanos',
    title: 'Definición del Product Goal',
    description: 'Convierto los problemas fitosanitarios e hídricos de AgroVision Perú en metas claras y medibles.',
  },
  {
    tags: 'PBI 01 al PBI 10 · 5 HU · 3 Spikes · 1 Bug · 1 DT',
    title: 'Priorización del Product Backlog',
    description: 'Ordeno los 10 elementos para equilibrar la mitigación temprana del riesgo Spark (PBI 01) y el valor en campo (PBI 02).',
  },
  {
    tags: 'La Libertad · Lambayeque · Ica',
    title: 'Enlace con AgroVision y Agronomía',
    description: 'Recojo las necesidades del especialista agrónomo para validar los criterios de negocio.',
  },
  {
    tags: 'Sprint Review · Retorno operativo',
    title: 'Validación del Incremento',
    description: 'Evalúo cada incremento con jefes de sanidad y agrónomos para confirmar su utilidad en campo.',
  },
];

const developerResponsibilities = [
  'Participo en la planificacion del Sprint y estimo el trabajo tecnico.',
  'Desarrollo las tareas acordadas en el Sprint Backlog.',
  'Desgloso los PBIs en tareas tecnicas claras y verificables.',
  'Diseno el procesamiento Big Data para manejar los datos del proyecto.',
  'Propongo arquitecturas de Deep Learning adecuadas al problema.',
  'Preparo y valido datasets antes de entrenar los modelos.',
  'Implemento las soluciones y compruebo sus resultados con metricas.',
  'Verifico que mi trabajo cumpla la Definition of Done.',
];

const developerSpecialties = [
  {
    title: 'Big Data Engineer',
    hours: '18 h',
    description: 'Implemento la ingesta distribuida con Apache Kafka y Data Lake, y proceso hasta 4 TB diarios con Hadoop / Apache Spark.',
    technologies: 'Apache Spark · Apache Kafka · Hadoop · Data Lake',
    sprint: 'Sprint 01: PBI 01 (T-01, T-03, T-04)',
  },
  {
    title: 'Deep Learning Engineer',
    hours: '32 h',
    description: 'Diseño, entreno y comparo redes CNN, ResNet, U-Net, Vision Transformers, LSTM y Temporal Fusion Transformers.',
    technologies: 'ResNet · U-Net · Vision Transformers · LSTM / TFT · PyTorch',
    sprint: 'Sprint 01: PBI 02 (T-08, T-09) · PBI 03 (T-11, T-12)',
  },
  {
    title: 'Computer Vision Specialist',
    hours: '26 h',
    description: 'Preparo datasets multiespectrales, aplico Data Augmentation y segmento Botrytis y arañita roja controlando el ruido atmosférico.',
    technologies: 'Imágenes multiespectrales · Data Augmentation · Segmentación · OpenCV / GDAL',
    sprint: 'Sprint 01: PBI 02 (T-06, T-07) · PBI 03 (T-13, T-14)',
  },
  {
    title: 'MLOps Engineer',
    hours: '14 h',
    description: 'Versiono código, datasets y pesos con DVC y MLflow; evalúo métricas, vigilo el overfitting y controlo la latencia.',
    technologies: 'DVC · MLflow · Benchmark Latencia · CI/CD ML',
    sprint: 'Sprint 01: PBI 01 (T-05) · PBI 02 (T-10) · PBI 03 (T-15)',
  },
  {
    title: 'Arquitecto Cloud',
    hours: '6 h',
    description: 'Configuro un entorno escalable en la nube, optimizo el particionado y cuido el presupuesto GPU y la seguridad.',
    technologies: 'Cloud Data Lake · Clúster Spark / GPU · IAM y Cifrado · FinOps',
    sprint: 'Sprint 01: PBI 01 (T-02)',
  },
];

export function ScrumTeamItem() {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSecondProfileExpanded, setIsSecondProfileExpanded] = useState(false);
  const [isThirdProfileExpanded, setIsThirdProfileExpanded] = useState(false);

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>('.scrum-member-video');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      });
    }, { threshold: 0.25 });

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [isProfileExpanded, isSecondProfileExpanded, isThirdProfileExpanded]);

  return (
    <section id="item-1" className="scrum-item-section scroll-mt-6" aria-labelledby="scrum-item-title">
      <div className="scrum-item-wrap">
        <div className="scrum-item-meta">
          <span className="scrum-item-number">ÍTEM 01</span>
          <span className="scrum-item-deliverable">
            Entregable obligatorio <span aria-hidden="true">·</span> Equipo oficial de 3 integrantes (&le; 10 personas)
          </span>
        </div>

        <h2 id="scrum-item-title" className="scrum-item-title">
          Constitución del Scrum Team
          <br className="hidden sm:block" /> y Compromiso de Valores
        </h2>

        <p className="scrum-item-description">
          Organigrama interactivo con los tres integrantes oficiales del proyecto. Haz clic en cualquier tarjeta para
          expandir su perfil avanzado, responsabilidades, competencias y el desglose de especialidades técnicas.
        </p>

        <div className="scrum-item-subsection">
          <p className="scrum-item-subsection-label">5.1 Constitución del Equipo Scrum</p>
          <h3>Organigrama y Perfiles Avanzados (3 Integrantes Oficiales)</h3>
        </div>

        <article className="scrum-member-card" aria-labelledby="scrum-member-name">
          <header className="scrum-member-header">
            <div className="scrum-member-identity">
              <span className="scrum-member-icon" aria-hidden="true"><ShieldCheck size={23} /></span>
              <div>
                <p className="scrum-member-kicker">INTEGRANTE 01 · SCRUM MASTER</p>
                <h4 id="scrum-member-name">Elías Gonzales</h4>
                <p className="scrum-member-summary">Facilito Scrum, ayudo a resolver bloqueos y protejo el objetivo del Sprint.</p>
              </div>
            </div>
            <div className="scrum-member-actions">
              <span className="scrum-responsibility-count">7 responsabilidades</span>
              <button
                type="button"
                    className="scrum-profile-toggle"
                onClick={() => setIsProfileExpanded((expanded) => !expanded)}
                aria-expanded={isProfileExpanded}
                aria-controls="scrum-member-profile"
              >
                {isProfileExpanded ? 'Contraer perfil' : 'Expandir perfil'}
                {isProfileExpanded ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
              </button>
            </div>
          </header>

          {isProfileExpanded && (
            <div id="scrum-member-profile" className="scrum-member-profile">
              <div className="scrum-member-overview">
                <div className="scrum-profile-column">
                  <section className="scrum-content-card scrum-responsibilities" aria-labelledby="scrum-responsibilities-title">
                    <h5 id="scrum-responsibilities-title">Responsabilidades oficiales en AgroEye-DL</h5>
                    <ol>
                      {responsibilities.map((responsibility, index) => (
                        <li key={responsibility}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <p>{responsibility}</p>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="scrum-content-card scrum-competencies" aria-label="Competencias y aporte estratégico">
                    <div>
                      <h5>Competencias clave</h5>
                      <p>Facilitación ágil · Gestión de impedimentos técnicos y operativos · Coaching de valores Scrum · Seguimiento del flujo del Sprint</p>
                    </div>
                    <div className="scrum-strategic-contribution">
                      <h5>Aporte estratégico al proyecto</h5>
                      <p>Protejo el foco del Sprint Backlog y mantengo una comunicación transparente entre negocio e ingeniería.</p>
                    </div>
                  </section>
                </div>

                <figure className="scrum-member-video-wrap">
                  <video
                    src={new URL('../../integrante/Integrante1.mp4', import.meta.url).href}
                    className="scrum-member-video"
                    aria-label="Video del integrante 01, Scrum Master"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </figure>
              </div>

              <section className="scrum-pillars-section" aria-labelledby="scrum-pillars-title">
                <p className="scrum-pillars-kicker">SCRUM MASTER</p>
                <h5 id="scrum-pillars-title">Pilares de Gestión del Scrum Master</h5>
                <div className="scrum-pillars-grid">
                  {pillars.map((pillar) => (
                    <article className="scrum-pillar-card" key={pillar.title}>
                      <p className="scrum-pillar-tags">{pillar.tags}</p>
                      <h6>{pillar.title}</h6>
                      <p className="scrum-pillar-description">{pillar.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}
        </article>

        <article className="scrum-member-card" aria-labelledby="scrum-member-name-02">
          <header className="scrum-member-header">
            <div className="scrum-member-identity">
              <span className="scrum-member-icon" aria-hidden="true"><BriefcaseBusiness size={23} /></span>
              <div>
                <p className="scrum-member-kicker">INTEGRANTE 02 · PRODUCT OWNER</p>
                <h4 id="scrum-member-name-02">Jordy Ticona</h4>
                <p className="scrum-member-summary">Defino el valor del producto y priorizo los PBIs 01–10 según las necesidades agroexportadoras.</p>
              </div>
            </div>
            <div className="scrum-member-actions">
              <span className="scrum-responsibility-count">7 responsabilidades</span>
              <button
                type="button"
                className="scrum-profile-toggle"
                onClick={() => setIsSecondProfileExpanded((expanded) => !expanded)}
                aria-expanded={isSecondProfileExpanded}
                aria-controls="scrum-member-profile-02"
              >
                {isSecondProfileExpanded ? 'Contraer perfil' : 'Expandir perfil'}
                {isSecondProfileExpanded ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
              </button>
            </div>
          </header>

          {isSecondProfileExpanded && (
            <div id="scrum-member-profile-02" className="scrum-member-profile">
              <div className="scrum-member-overview scrum-member-overview-reversed">
                <figure className="scrum-member-video-wrap">
                  <video
                    src={new URL('../../integrante/integrante2.mp4', import.meta.url).href}
                    className="scrum-member-video"
                    aria-label="Video del integrante 02, Product Owner"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </figure>

                <div className="scrum-profile-column">
                  <section className="scrum-content-card scrum-responsibilities" aria-labelledby="scrum-responsibilities-title-02">
                    <h5 id="scrum-responsibilities-title-02">Responsabilidades oficiales en AgroEye-DL</h5>
                    <ol>
                      {productOwnerResponsibilities.map((responsibility, index) => (
                        <li key={responsibility}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <p>{responsibility}</p>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="scrum-content-card scrum-competencies" aria-label="Competencias y aporte estratégico del Product Owner">
                    <div>
                      <h5>Competencias clave</h5>
                      <p>Estrategia de producto AgriTech · Priorización por valor y mitigación de riesgo · Alineación con objetivos agroexportadores · Gestión de interesados agrícolas</p>
                    </div>
                    <div className="scrum-strategic-contribution">
                      <h5>Aporte estratégico al proyecto</h5>
                      <p>Ordeno el Product Backlog para maximizar el impacto en fitosanidad, riego y cosecha.</p>
                    </div>
                  </section>
                </div>
              </div>

              <section className="scrum-pillars-section" aria-labelledby="scrum-pillars-title-02">
                <p className="scrum-pillars-kicker">PRODUCT OWNER</p>
                <h5 id="scrum-pillars-title-02">Pilares de Valor del Product Owner</h5>
                <div className="scrum-pillars-grid">
                  {productOwnerPillars.map((pillar) => (
                    <article className="scrum-pillar-card" key={pillar.title}>
                      <p className="scrum-pillar-tags">{pillar.tags}</p>
                      <h6>{pillar.title}</h6>
                      <p className="scrum-pillar-description">{pillar.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}
        </article>

        <article className="scrum-member-card" aria-labelledby="scrum-member-name-03">
          <header className="scrum-member-header">
            <div className="scrum-member-identity">
              <span className="scrum-member-icon" aria-hidden="true"><Cpu size={23} /></span>
              <div>
                <p className="scrum-member-kicker">INTEGRANTE 03 · DEVELOPER</p>
                <h4 id="scrum-member-name-03">Piero Aguilar</h4>
                <p className="scrum-member-summary">Implemento y valido cinco especialidades técnicas, con 96 horas estimadas en Sprint 01.</p>
              </div>
            </div>
            <div className="scrum-member-actions">
              <span className="scrum-responsibility-count">8 responsabilidades</span>
              <button
                type="button"
                className="scrum-profile-toggle"
                onClick={() => setIsThirdProfileExpanded((expanded) => !expanded)}
                aria-expanded={isThirdProfileExpanded}
                aria-controls="scrum-member-profile-03"
              >
                {isThirdProfileExpanded ? 'Contraer perfil' : 'Expandir perfil'}
                {isThirdProfileExpanded ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
              </button>
            </div>
          </header>

          {isThirdProfileExpanded && (
            <div id="scrum-member-profile-03" className="scrum-member-profile">
              <div className="scrum-member-overview scrum-developer-overview">
                <div className="scrum-profile-column">
                  <section className="scrum-content-card scrum-responsibilities" aria-labelledby="scrum-responsibilities-title-03">
                    <h5 id="scrum-responsibilities-title-03">Responsabilidades oficiales en AgroEye-DL</h5>
                    <ol>
                      {developerResponsibilities.map((responsibility, index) => (
                        <li key={responsibility}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <p>{responsibility}</p>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="scrum-content-card scrum-competencies" aria-label="Competencias y aporte estratégico del Developer">
                    <div>
                      <h5>Competencias clave</h5>
                      <p>Big Data (Kafka / Hadoop / Spark) · Deep Learning y Computer Vision (CNN / ViT / LSTM) · MLOps (DVC / MLflow) y Arquitectura Cloud · Desglose técnico y validación empírica</p>
                    </div>
                    <div className="scrum-strategic-contribution">
                      <h5>Aporte estratégico al proyecto</h5>
                      <p>Desarrollo y valido las soluciones técnicas del Sprint Backlog desde Big Data hasta arquitectura cloud.</p>
                    </div>
                  </section>
                </div>

                <figure className="scrum-member-video-wrap scrum-developer-video-wrap">
                  <video
                    src={new URL('../../integrante/integrante3.mp4', import.meta.url).href}
                    className="scrum-member-video"
                    aria-label="Video del integrante 03, Developer"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </figure>
              </div>

              <section className="scrum-developer-specialties" aria-labelledby="scrum-specialties-title">
                <div className="scrum-developer-specialties-heading">
                  <p className="scrum-pillars-kicker">5 ESPECIALIDADES TÉCNICAS · 96 H EN SPRINT 01</p>
                  <h5 id="scrum-specialties-title">Desglose de especialización técnica</h5>
                </div>
                <div className="scrum-specialties-grid">
                  {developerSpecialties.map((specialty) => (
                    <article className="scrum-specialty-card" key={specialty.title}>
                      <div className="scrum-specialty-heading">
                        <h6>{specialty.title}</h6>
                        <span>{specialty.hours}</span>
                      </div>
                      <p>{specialty.description}</p>
                      <div className="scrum-specialty-footer">
                        <span>{specialty.technologies}</span>
                        <span>{specialty.sprint}</span>
                      </div>
                    </article>
                  ))}
                  <article className="scrum-specialty-card scrum-specialty-total">
                    <p className="scrum-pillar-tags">Cobertura técnica consolidada</p>
                    <h6>96 horas · 5 áreas</h6>
                    <p>Piero Aguilar asume las cinco disciplinas de ingeniería dentro del Sprint Backlog (PBI 01, PBI 02 y PBI 03).</p>
                    <div className="scrum-specialty-footer"><span>18 h Big Data · 32 h Deep Learning · 26 h Computer Vision · 14 h MLOps · 6 h Cloud</span></div>
                  </article>
                </div>
              </section>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
