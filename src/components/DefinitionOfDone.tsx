import { useMemo, useState } from 'react';
import { AlertCircle, Check, CheckCheck, RotateCcw, ShieldCheck } from 'lucide-react';

const criteria = [
  {
    title: 'Calidad de datos',
    description: 'Valido, limpio y preparo los datos que recibo de drones y sensores IoT antes de usarlos.',
    method: 'Ejecuto controles de formato, integridad, valores faltantes y consistencia radiométrica sobre una muestra representativa.',
    evidence: 'Guardo el reporte de calidad, los registros del pipeline y la versión del conjunto de datos validado.',
  },
  {
    title: 'Rendimiento del modelo',
    description: 'Compruebo que el modelo alcance el umbral acordado de precisión o mAP en el conjunto de validación, cuando corresponda al modelo.',
    method: 'Evalúo el modelo sobre un conjunto de validación separado y comparo sus métricas con el umbral definido para el caso de uso.',
    evidence: 'Registro las curvas Precision-Recall y el informe de IoU/mAP en MLflow, con la versión del modelo evaluado.',
  },
  {
    title: 'Ausencia de overfitting',
    description: 'Verifico que la diferencia entre entrenamiento y validación permita generalizar a imágenes que el modelo no ha visto.',
    method: 'Comparo las métricas de entrenamiento y validación por época, reviso las curvas de pérdida y evalúo datos no usados para ajustar el modelo.',
    evidence: 'Conservo las curvas de aprendizaje, la configuración del entrenamiento y los resultados del conjunto de validación.',
  },
  {
    title: 'Procesamiento distribuido',
    description: 'Optimizo los jobs de Spark para evitar problemas críticos de data skew y respetar el presupuesto de cómputo en la nube.',
    method: 'Ejecuto pruebas de carga y reviso distribución de particiones, memoria, duración de jobs y consumo de recursos.',
    evidence: 'Adjunto logs de Spark, métricas de uso de recursos y resultados de las pruebas de carga.',
  },
  {
    title: 'Latencia de inferencia',
    description: 'Mido la inferencia y compruebo que cumpla el límite acordado para los dispositivos Edge o móviles.',
    method: 'Mido tiempos de respuesta con cargas representativas y en el entorno objetivo, incluyendo el preprocesamiento necesario.',
    evidence: 'Registro percentiles de latencia, tamaño del lote y configuración del dispositivo o servicio probado.',
  },
  {
    title: 'Versionamiento MLOps',
    description: 'Versiono el código, los datasets y los pesos del modelo con DVC y MLflow para poder reproducir cada experimento.',
    method: 'Verifico que cada ejecución apunte a versiones identificables de código, datos, parámetros y artefactos del modelo.',
    evidence: 'Guardo referencias de DVC, el identificador de ejecución de MLflow y los artefactos asociados.',
  },
  {
    title: 'Seguridad',
    description: 'Protejo los datos corporativos y aplico los controles de acceso definidos para el proyecto.',
    method: 'Reviso permisos por rol, credenciales, cifrado y acceso a los recursos usados en el pipeline.',
    evidence: 'Documento los permisos revisados y adjunto el resultado de la validación de seguridad correspondiente.',
  },
];

const increments = [
  { tag: 'Entregable esperado del Sprint 1 (PBI 01)', title: 'Pipeline inicial de ingesta validado', description: 'Dejo lista una arquitectura Spark probada para procesar imágenes de forma masiva y registro sus resultados de carga.' },
  { tag: 'Base curada y versionada en DVC', title: 'Dataset preparado', description: 'Entrego imágenes limpiadas, normalizadas y aumentadas, listas para entrenar de forma reproducible.' },
  { tag: 'Primer incremento funcional (PBI 02)', title: 'Prototipo de detección de Botrytis', description: 'Construyo un modelo inicial ResNet/U-Net y documento sus métricas objetivas de validación.' },
  { tag: 'Resultado de investigación técnica (PBI 03)', title: 'Evaluación comparativa de arquitecturas', description: 'Comparo CNN, ResNet, U-Net y Vision Transformers para orientar mis siguientes iteraciones.' },
  { tag: 'Trazabilidad arquitectónica', title: 'Documentación técnica', description: 'Documento el particionado del Data Lake, los hiperparámetros y las lecciones que obtengo de cada Spike.' },
  { tag: 'Respaldo verificable para Sprint Review', title: 'Evidencias de pruebas', description: 'Presento logs de carga Spark, corridas MLflow y la auditoría de mis siete criterios de la DoD.' },
];

export function DefinitionOfDone() {
  const [completed, setCompleted] = useState<boolean[]>(criteria.map(() => false));
  const [expanded, setExpanded] = useState<number[]>([]);
  const completedCount = useMemo(() => completed.filter(Boolean).length, [completed]);
  const progress = Math.round((completedCount / criteria.length) * 100);

  const toggleCriterion = (index: number) => setCompleted((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  const toggleEvidence = (index: number) => setExpanded((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  return (
    <section id="item-4" className="dod-section scroll-mt-6" aria-labelledby="dod-title">
      <div className="dod-wrap">
        <div className="dod-kicker"><strong>ÍTEM 04</strong><span>Entregable obligatorio · Reviso la calidad de mi incremento</span></div>
        <h2 id="dod-title">Cómo defino que terminé (DoD) y entrego valor</h2>
        <p className="dod-intro">Reviso mis siete criterios oficiales antes de declarar terminado un incremento de AgroEye-DL. No marco ningún criterio como cumplido hasta verificarlo y guardar su evidencia.</p>

        <div className="dod-progress-card animated-border">
          <div className="dod-progress-status"><ShieldCheck size={16} /><span>Estado general: <b>{completedCount === criteria.length ? 'Verificado' : completedCount === 0 ? 'Pendiente de verificación' : 'Verificación en curso'}</b></span></div>
          <div className="dod-progress-controls"><strong className="dod-progress-percent">{progress}% <span>de avance</span></strong><div className="dod-count"><b>{completedCount}</b><span>Criterios completados</span></div><div className="dod-count"><b>{criteria.length - completedCount}</b><span>Criterios pendientes</span></div><button className="dod-complete-button" type="button" onClick={() => setCompleted(criteria.map(() => true))}><CheckCheck size={15} /> Simular verificación completa</button><button className="dod-reset-button" type="button" onClick={() => setCompleted(criteria.map(() => false))}><RotateCcw size={14} /> Reiniciar</button></div>
          <div className="dod-progress-track" role="progressbar" aria-label="Avance de verificación de DoD" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
        </div>

        <div className="dod-criteria-grid">
          {criteria.map((criterion, index) => <article className={`dod-criterion-card${completed[index] ? ' is-complete' : ''}`} key={criterion.title}>
            <label className="dod-check-label"><input type="checkbox" checked={completed[index]} onChange={() => toggleCriterion(index)} aria-label={`Marcar criterio ${index + 1}: ${criterion.title}`} /><span className="dod-checkbox-mark"><Check size={14} /></span></label>
            <div className="dod-criterion-content"><div className="dod-criterion-topline"><span>Criterio {String(index + 1).padStart(2, '0')}</span><b>{completed[index] ? 'Verificado' : 'Pendiente'}</b></div><h3>Criterio {String(index + 1).padStart(2, '0')} · {criterion.title}</h3><p>{criterion.description}</p><button className="dod-evidence-toggle" type="button" aria-expanded={expanded.includes(index)} onClick={() => toggleEvidence(index)}>{expanded.includes(index) ? 'Ocultar verificación' : 'Ver método y evidencia'}<span aria-hidden="true">{expanded.includes(index) ? '⌃' : '⌄'}</span></button>{expanded.includes(index) && <div className="dod-evidence-details"><p><b>Método de verificación:</b> {criterion.method}</p><p><b>Evidencia que guardaré:</b> {criterion.evidence}</p></div>}</div>
          </article>)}
        </div>

        <section className="dod-increment-section" aria-labelledby="dod-increment-title">
          <p className="dod-section-label">8.3 Incremento de valor</p>
          <h3 id="dod-increment-title">Qué entregaré al finalizar el Sprint</h3>
          <div className="dod-academic-note"><AlertCircle size={17} /><p><b>Distinción académica importante:</b> Presento resultados esperados y criterios de aceptación planificados para el Sprint 1. No afirmo que ya alcancé el 85% de precisión o mAP, porque todavía debo ejecutar pruebas productivas reales en campo.</p></div>
          <div className="dod-increment-grid">{increments.map((increment, index) => <article className="dod-increment-card" key={increment.title}><div><span>{String(index + 1).padStart(2, '0')}</span><small>{increment.tag}</small></div><h4>{increment.title}</h4><p>{increment.description}</p></article>)}</div>
        </section>
      </div>
    </section>
  );
}
