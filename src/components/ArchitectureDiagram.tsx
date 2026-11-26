import { useRef, useState } from 'react';
import {
  BellRing,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Cloud,
  Database,
  RadioTower,
  ScanLine,
  Smartphone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ArchitectureStage = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  technologies: string;
  video: string;
  Icon: LucideIcon;
};

const stages: ArchitectureStage[] = [
  {
    number: '01',
    eyebrow: 'Captura en Campo',
    title: 'Drones agr\u00edcolas + Sensores IoT + Estaciones meteorol\u00f3gicas',
    description: '+4 TB/d\u00eda \u00b7 25,000 sensores IoT',
    detail: 'Recolecto continuamente im\u00e1genes multiespectrales e hiperespectrales, datos de humedad del suelo y registros meteorol\u00f3gicos en tiempo real en La Libertad, Lambayeque e Ica.',
    technologies: 'Drones / Sensores / Telemetr\u00eda',
    video: new URL('../../videos/Captura en Campo.mp4', import.meta.url).href,
    Icon: ScanLine,
  },
  {
    number: '02',
    eyebrow: 'Ingesta Streaming',
    title: 'Apache Kafka',
    description: 'Flujo distribuido en tiempo real',
    detail: 'Recibo y organizo en Apache Kafka los eventos de 25,000 sensores IoT, las estaciones meteorol\u00f3gicas y los metadatos de vuelos de drones para procesarlos sin perder mensajes.',
    technologies: '25,000 sensores / Estaciones / Drones',
    video: new URL('../../videos/Ingesra Streaning.mp4', import.meta.url).href,
    Icon: RadioTower,
  },
  {
    number: '03',
    eyebrow: 'Almacenamiento Escalable',
    title: 'Data Lake en la nube',
    description: 'Particionado por fundo y fecha',
    detail: 'Almaceno ortomosaicos originales, telemetr\u00eda hist\u00f3rica y conjuntos de datos versionados; as\u00ed organizo grandes vol\u00famenes y optimizo su costo de almacenamiento.',
    technologies: 'Ortomosaicos / Telemetr\u00eda / Datasets',
    video: new URL('../../videos/Escalamiento Masivo.mp4', import.meta.url).href,
    Icon: Database,
  },
  {
    number: '04',
    eyebrow: 'Procesamiento Masivo',
    title: 'Hadoop / Apache Spark',
    description: 'ETL distribuido sin desbordamiento',
    detail: 'Normalizo los distintos formatos, filtro el ruido atmosf\u00e9rico y proceso m\u00e1s de 4 TB al d\u00eda para preparar conjuntos de datos limpios para el entrenamiento.',
    technologies: 'ETL / Filtrado / Datasets limpios',
    video: new URL('../../videos/Procesamiento Masivo.mp4', import.meta.url).href,
    Icon: BrainCircuit,
  },
  {
    number: '05',
    eyebrow: 'Modelado Predictivo',
    title: 'CNN / Vision Transformers / LSTM / Temporal Fusion Transformers',
    description: 'Deep Learning Multimodal',
    detail: 'Entreno modelos CNN, ResNet, U-Net y Vision Transformers para identificar Botrytis y ara\u00f1ita roja; adem\u00e1s, uso LSTM y Temporal Fusion Transformers para anticipar el estr\u00e9s h\u00eddrico hasta con 7 d\u00edas de anticipaci\u00f3n.',
    technologies: 'CNN / ResNet / U-Net / ViT / LSTM / TFT',
    video: new URL('../../videos/Modelo Predictivo.mp4', import.meta.url).href,
    Icon: BrainCircuit,
  },
  {
    number: '06',
    eyebrow: 'Operaci\u00f3n en Terreno',
    title: 'Sistema de predicci\u00f3n y alertas para dispositivos m\u00f3viles',
    description: 'Inferencia Edge / Baja latencia',
    detail: 'Presento mapas de calor georreferenciados y alertas claras en dispositivos m\u00f3viles para ayudar a decidir d\u00f3nde fumigar y cu\u00e1ndo regar.',
    technologies: 'Mapas de calor / Alertas m\u00f3viles / Edge',
    video: new URL('../../videos/Operacion en Terreno.mp4', import.meta.url).href,
    Icon: Smartphone,
  },
];
export function ArchitectureDiagram() {
  const [activeStage, setActiveStage] = useState(0);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);
  const touchStartY = useRef<number | null>(null);
  const selected = stages[activeStage];

  const positionFor = (index: number) => {
    const offset = (index - activeStage + stages.length) % stages.length;
    if (offset === 0) return 'center';
    if (offset === 1) return 'down-1';
    if (offset === 2) return 'down-2';
    if (offset === 3) return 'hidden';
    if (offset === stages.length - 1) return 'up-1';
    return 'up-2';
  };

  const selectStage = (index: number) => {
    setActiveStage(index);
    setIsDescriptionVisible(true);
  };

  const move = (step: number) => {
    setActiveStage((index) => (index + step + stages.length) % stages.length);
    setIsDescriptionVisible(true);
  };

  return (
    <div className="architecture-section" aria-labelledby="architecture-title">
      <header className="architecture-heading">
        <p className="architecture-kicker">SOLUCI&#xD3;N PROPUESTA</p>
        <h2 id="architecture-title">Arquitectura Tecnol&#xF3;gica Big Data &amp; Deep Learning</h2>
        <p className="architecture-subtitle">Diagrama Interactivo de Flujo de Datos</p>
      </header>

      <div className="architecture-panel">
        <div className="architecture-carousel-layout">
          <div
            className="architecture-carousel"
            role="group"
            aria-label="Carrusel de etapas de la arquitectura. Usa las flechas arriba y abajo para navegar."
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                move(-1);
              } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                move(1);
              }
            }}
            onTouchStart={(event) => {
              touchStartY.current = event.changedTouches[0].screenY;
            }}
            onTouchEnd={(event) => {
              if (touchStartY.current === null) return;
              const distance = touchStartY.current - event.changedTouches[0].screenY;
              if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1);
              touchStartY.current = null;
            }}
          >
            <button className="architecture-mobile-arrow architecture-mobile-arrow-up" type="button" onClick={() => move(-1)} aria-label="Etapa anterior">
              <ChevronUp size={22} aria-hidden="true" />
            </button>

            <div className="architecture-track">
              {stages.map((stage, index) => {
                const position = positionFor(index);
                const isActiveCard = position === 'center';
                return (
                  <button
                    key={stage.number}
                    type="button"
                    className={`architecture-node architecture-node-${position}`}
                    onClick={() => selectStage(index)}
                    aria-pressed={activeStage === index}
                    aria-label={`Ver video de la etapa ${stage.number}: ${stage.eyebrow}`}
                    tabIndex={position === 'hidden' || position === 'up-2' || position === 'down-2' ? -1 : 0}
                  >
                    <video
                      className="architecture-node-video"
                      src={stage.video}
                      aria-hidden="true"
                      autoPlay={isActiveCard}
                      loop
                      muted
                      playsInline
                      preload={isActiveCard ? 'metadata' : 'none'}
                    />
                  </button>
                );
              })}
            </div>

            <button className="architecture-mobile-arrow architecture-mobile-arrow-down" type="button" onClick={() => move(1)} aria-label="Siguiente etapa">
              <ChevronDown size={22} aria-hidden="true" />
            </button>
          </div>

          <div className="architecture-controls">
            <div className="architecture-nav-controls" aria-label="Controles del diagrama">
              <button type="button" onClick={() => move(-1)} aria-label="Etapa anterior" className="architecture-nav-arrow">
                <ChevronUp size={21} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Siguiente etapa" className="architecture-nav-arrow">
                <ChevronDown size={21} aria-hidden="true" />
              </button>
            </div>

            <div className="architecture-stage-details" id="architecture-stage-details" aria-live="polite" aria-atomic="true">
              <div className="architecture-detail-copy">
                <p className="architecture-detail-label">{selected.number} · {selected.eyebrow}</p>
                <h3>{selected.title}</h3>
                <button
                  type="button"
                  className="architecture-toggle"
                  onClick={() => setIsDescriptionVisible((visible) => !visible)}
                  aria-expanded={isDescriptionVisible}
                >
                  {isDescriptionVisible ? 'Ocultar' : 'Ver detalles'}
                </button>
                {isDescriptionVisible && <p className="architecture-stage-explanation">{selected.detail}</p>}
                <span className="architecture-tech">{selected.technologies}</span>
              </div>
              <Cloud className="architecture-detail-watermark" size={100} strokeWidth={0.8} aria-hidden="true" />
            </div>

            <div className="architecture-dots" aria-label="Seleccionar etapa">
              {stages.map((stage, index) => (
                <button
                  key={stage.number}
                  type="button"
                  className={`architecture-dot${index === activeStage ? ' is-active' : ''}`}
                  onClick={() => setActiveStage(index)}
                  aria-label={`Mostrar etapa ${stage.number}: ${stage.title}`}
                  aria-current={index === activeStage ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="architecture-hint">Selecciona una etapa para explorar el flujo de datos.</p>
    </div>
  );
}
