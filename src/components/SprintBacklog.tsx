import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, CircleHelp, Clock3, Target } from 'lucide-react';

type SprintTask = {
  pbi: string;
  title: string;
  specialty: string;
  hours: number;
  week: 1 | 2;
  start: number;
  duration: number;
};

const taskSeed: Omit<SprintTask, 'week'>[] = [
  { pbi: 'PBI 01', title: 'Analizo formatos de imágenes', specialty: 'Big Data Engineer', hours: 4, start: 1, duration: 1.5 },
  { pbi: 'PBI 01', title: 'Configuro el entorno de procesamiento', specialty: 'Arquitecto Cloud', hours: 6, start: 2, duration: 1.5 },
  { pbi: 'PBI 01', title: 'Implemento el particionamiento del Data Lake', specialty: 'Big Data Engineer', hours: 8, start: 3, duration: 2 },
  { pbi: 'PBI 01', title: 'Ejecuto pruebas de carga', specialty: 'Big Data Engineer', hours: 6, start: 6, duration: 2 },
  { pbi: 'PBI 01', title: 'Documento los resultados', specialty: 'MLOps Engineer', hours: 4, start: 9, duration: 1.5 },
  { pbi: 'PBI 02', title: 'Preparo el dataset de imágenes', specialty: 'Computer Vision Specialist', hours: 8, start: 1, duration: 2 },
  { pbi: 'PBI 02', title: 'Aplico Data Augmentation', specialty: 'Computer Vision Specialist', hours: 6, start: 3, duration: 2 },
  { pbi: 'PBI 02', title: 'Diseño la arquitectura base ResNet/U-Net', specialty: 'Deep Learning Engineer', hours: 10, start: 5, duration: 2 },
  { pbi: 'PBI 02', title: 'Entreno el modelo inicial', specialty: 'Deep Learning Engineer', hours: 12, start: 6, duration: 2.5 },
  { pbi: 'PBI 02', title: 'Evalúo las métricas', specialty: 'MLOps Engineer', hours: 6, start: 9, duration: 1.5 },
  { pbi: 'PBI 03', title: 'Investigo arquitecturas CNN', specialty: 'Deep Learning Engineer', hours: 5, start: 1, duration: 2 },
  { pbi: 'PBI 03', title: 'Investigo Vision Transformers', specialty: 'Deep Learning Engineer', hours: 5, start: 2, duration: 2 },
  { pbi: 'PBI 03', title: 'Defino el conjunto de validación', specialty: 'Computer Vision Specialist', hours: 4, start: 4, duration: 1.5 },
  { pbi: 'PBI 03', title: 'Ejecuto la prueba de concepto', specialty: 'Computer Vision Specialist', hours: 8, start: 6, duration: 2 },
  { pbi: 'PBI 03', title: 'Comparo los resultados', specialty: 'MLOps Engineer', hours: 4, start: 9, duration: 1.5 },
];

const tasks: SprintTask[] = taskSeed.map((task) => ({ ...task, week: task.start > 5 ? 2 : 1 }));
const specialtyHours = [
  { name: 'Big Data Engineer', hours: 18 },
  { name: 'Arquitecto Cloud', hours: 6 },
  { name: 'MLOps Engineer', hours: 14 },
  { name: 'Computer Vision Specialist', hours: 26 },
  { name: 'Deep Learning Engineer', hours: 32 },
];
const pbiDetails = [
  { id: 'PBI 01', type: 'Spike', hours: 28, title: 'Validación del pipeline Apache Spark', why: 'Lo priorizo primero porque necesito reducir el riesgo de cuello de botella al procesar 4 TB diarios sin desbordamiento de memoria.', value: 'Con este PBI preparo los datos y compruebo la viabilidad técnica del procesamiento masivo.' },
  { id: 'PBI 02', type: 'Historia de Usuario', hours: 42, title: 'Detección de Botrytis', why: 'Lo priorizo para atender las pérdidas en lotes de exportación y orientar la fumigación de manera focalizada.', value: 'Con este PBI desarrollo el primer prototipo funcional para detectar enfermedades a tiempo.' },
  { id: 'PBI 03', type: 'Spike', hours: 26, title: 'Evaluación de arquitecturas de Deep Learning', why: 'Lo priorizo para comparar CNN, ResNet, U-Net y Vision Transformers antes de comprometer más recursos GPU.', value: 'Con este PBI justifico técnicamente la arquitectura que usaré en el prototipo y en las siguientes iteraciones.' },
];

export function SprintBacklog() {
  const [statuses, setStatuses] = useState<Record<string, string>>({ 'T01': 'En progreso', 'T06': 'En progreso', 'T11': 'En progreso' });
  const [period, setPeriod] = useState<'Dos semanas' | 'Semana 1' | 'Semana 2'>('Dos semanas');
  const [expandedPbi, setExpandedPbi] = useState<string | null>(null);

  const visibleTasks = useMemo(() => tasks.filter((task) => period === 'Dos semanas' || task.week === (period === 'Semana 1' ? 1 : 2)), [period]);
  const startDay = period === 'Semana 2' ? 6 : 1;
  const dayCount = period === 'Dos semanas' ? 10 : 5;

  return (
    <section id="item-3" className="sprint-backlog-section scroll-mt-6" aria-labelledby="sprint-backlog-title">
      <div className="sprint-backlog-wrap">
        <div className="sprint-backlog-kicker"><strong>ÍTEM 03</strong><span>Entregable obligatorio · Planifico el Sprint Backlog como Developer</span></div>
        <h2 id="sprint-backlog-title">Cómo planifico el Sprint Backlog</h2>
        <p className="sprint-backlog-intro">Planifico un Sprint de dos semanas con un objetivo claro. Selecciono los tres primeros PBIs prioritarios (PBI 01, PBI 02 y PBI 03), los desgloso en 15 tareas técnicas y estimo 96 horas según mis áreas de especialidad.</p>

        <div className="sprint-overview-grid">
          <article className="sprint-justification-card">
            <header><span><CalendarDays size={15} /> 7.1 Planifico el Sprint en 2 semanas</span><strong>10 días hábiles</strong></header>
            <p>Organizo el trabajo en iteraciones de dos semanas porque necesito:</p>
            <ol>
              <li><b>01.</b> Reservo tiempo para entrenar redes neuronales (ResNet, U-Net y Vision Transformers).</li>
              <li><b>02.</b> Proceso de forma distribuida grandes volúmenes de imágenes con Apache Spark.</li>
              <li><b>03.</b> Aprovecho la disponibilidad y las ventanas de uso de los recursos GPU.</li>
              <li><b>04.</b> Valido rigurosamente los resultados y las métricas técnicas.</li>
              <li><b>05.</b> Incorporo a tiempo la retroalimentación de especialistas agrónomos.</li>
            </ol>
          </article>

          <article className="sprint-goal-card animated-border">
            <p className="sprint-section-label"><Target size={15} /> 7.2 Sprint Goal (Objetivo del Sprint)</p>
            <blockquote>“Construiré y validaré la base inicial del pipeline de ingesta de datos agrícolas y el primer prototipo de detección de enfermedades. Prepararé los datos y comprobaré la viabilidad técnica del procesamiento masivo.”</blockquote>
            <div className="sprint-goal-stats"><div><strong>3 PBIs</strong><span>Selecciono PBI 01, PBI 02 y PBI 03</span></div><div><strong>15 tareas</strong><span>Las asumo como Developer</span></div><div><strong>96 horas</strong><span>Es mi estimación total</span></div></div>
            <p className="sprint-note"><CircleHelp size={15} /> Asumo este Sprint Backlog como Developer. Presento estimaciones académicas propuestas; no representan resultados reales de ejecución.</p>
          </article>
        </div>

        <h3 className="sprint-subheading">7.3 Selecciono los tres primeros PBIs y contribuyo al Sprint Goal</h3>
        <div className="sprint-pbi-grid">
          {pbiDetails.map((pbi) => <article className={`sprint-pbi-card${expandedPbi === pbi.id ? ' is-expanded' : ''}`} key={pbi.id}>
            <button type="button" onClick={() => setExpandedPbi(expandedPbi === pbi.id ? null : pbi.id)} aria-expanded={expandedPbi === pbi.id}>
              <span><b>{pbi.id}</b><i>{pbi.type}</i><small>{pbi.hours}h</small></span>
              <strong>{pbi.title}</strong>
            </button>
            <div className="sprint-pbi-copy"><p><b>Por qué lo priorizo:</b> {pbi.why}</p><p><b>Cómo contribuyo al Sprint Goal:</b> {pbi.value}</p></div>
          </article>)}
        </div>

        <section className="sprint-tasks-section" aria-labelledby="sprint-tasks-title">
          <header className="sprint-table-heading"><div><h3 id="sprint-tasks-title">7.4 Organizo mis tareas técnicas (96 horas estimadas)</h3><p>Distribuyo mis horas así: PBI 01 (28 h) · PBI 02 (42 h) · PBI 03 (26 h).</p></div></header>
          <div className="sprint-table-scroll"><table className="sprint-task-table"><thead><tr><th>PBI que atiendo</th><th>Tarea que realizaré</th><th>Mi especialidad</th><th>Horas estimadas</th><th>Semana</th><th>Mi estado</th></tr></thead><tbody>
            {tasks.map((task, index) => { const taskId = `T${String(index + 1).padStart(2, '0')}`; return <tr key={taskId}><td><b>{task.pbi}</b></td><td>{task.title}</td><td>Yo <span>· {task.specialty}</span></td><td>{task.hours} h</td><td>Semana {task.week}</td><td><select aria-label={`Estado de ${taskId}: ${task.title}`} value={statuses[taskId] ?? 'Pendiente'} onChange={(event) => setStatuses((current) => ({ ...current, [taskId]: event.target.value }))}><option>Pendiente</option><option>En progreso</option><option>Completada</option></select></td></tr>; })}
          </tbody></table></div>
        </section>

        <div className="sprint-analytics-grid">
          <section className="sprint-timeline-card" aria-labelledby="sprint-timeline-title">
            <header><div><h3 id="sprint-timeline-title">7.5 Así organizo mis dos semanas</h3><p>En la primera semana preparo infraestructura, datos y pruebas; en la segunda entreno, evalúo y valido los modelos.</p></div></header>
            <div className="sprint-period-tabs" role="tablist" aria-label="Periodo del cronograma">{(['Dos semanas', 'Semana 1', 'Semana 2'] as const).map((option) => <button key={option} type="button" role="tab" aria-selected={period === option} className={period === option ? 'is-active' : ''} onClick={() => setPeriod(option)}>{option}</button>)}</div>
            <div className="sprint-timeline-scroll"><div className="sprint-timeline">
              <div className="sprint-timeline-header"><b>Tarea · Especialidad</b><div style={{ '--days': dayCount } as React.CSSProperties}>{Array.from({ length: dayCount }, (_, index) => <span key={index}>D{String(startDay + index).padStart(2, '0')}</span>)}</div></div>
              {visibleTasks.map((task) => {
                const index = tasks.indexOf(task); const taskId = `T${String(index + 1).padStart(2, '0')}`;
                const taskStart = Math.max(task.start, startDay); const taskEnd = Math.min(task.start + task.duration, startDay + dayCount);
                const left = ((taskStart - startDay) / dayCount) * 100; const width = ((taskEnd - taskStart) / dayCount) * 100;
                return <div className="sprint-timeline-row" key={taskId}><div className="sprint-timeline-label"><b>{task.pbi} · {task.specialty}</b><span>{task.title}</span></div><div className="sprint-timeline-track" style={{ '--days': dayCount } as React.CSSProperties}><div className={`sprint-timeline-bar sprint-bar-${task.pbi.slice(-2)}`} style={{ left: `${left}%`, width: `${width}%` }} title={`${taskId}: ${task.hours} horas`}><b>{task.hours} h</b></div></div></div>;
              })}
            </div></div>
          </section>

          <aside className="sprint-hours-card"><header><h3>Horas que asigno a cada especialidad</h3><p>Estimo 96 horas en total: 28 h para PBI 01, 42 h para PBI 02 y 26 h para PBI 03.</p></header><div className="sprint-hours-chart">{specialtyHours.map((entry) => <div className="sprint-hours-row" key={entry.name}><span>{entry.name}</span><div><i style={{ width: `${(entry.hours / 32) * 100}%` }} /></div><b>{entry.hours}h</b></div>)}</div><footer><CheckCircle2 size={15} /><span>Total que estimo</span><strong>96 horas</strong></footer></aside>
        </div>
      </div>
    </section>
  );
}
