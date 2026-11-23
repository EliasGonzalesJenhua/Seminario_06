/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeroSection } from './components/HeroSection';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { ScrumTeamItem } from './components/ScrumTeamItem';
import { ScrumValues } from './components/ScrumValues';
import { ProductBacklog } from './components/ProductBacklog';
import { SprintBacklog } from './components/SprintBacklog';
import { DefinitionOfDone } from './components/DefinitionOfDone';
import { Conclusions } from './components/Conclusions';
import { useEffect, useState } from 'react';

const avocadoVideo = new URL('../8662277-sd_640_360_30fps.mp4', import.meta.url).href;
const blueberryVideo = new URL('../12082044_640_360_24fps.mp4', import.meta.url).href;

export default function App() {
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top" className="w-full min-h-screen">
      <HeroSection />
      <section
        id="contexto"
        aria-labelledby="context-title"
        className="reveal-on-scroll scroll-rise-section bg-slate-50 text-slate-900 px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="reveal-on-scroll reveal-delay-1 text-slate-600 text-xs uppercase tracking-[0.2em]">
            <span className="text-emerald-700">02</span>
            <span className="mx-3">·</span>
            AgroVision Perú S.A.C. · La Libertad, Lambayeque e Ica
          </p>

          <h2
            id="context-title"
            className="reveal-on-scroll reveal-delay-2 mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Contexto Empresarial y Problemática
          </h2>

          <p className="reveal-on-scroll reveal-delay-3 mt-4 max-w-4xl text-slate-600 text-base md:text-lg font-light leading-relaxed">
            AgroVision Perú S.A.C. es una empresa agroexportadora con más de 12,000 hectáreas de
            cultivos de palta Hass y arándanos distribuidas en La Libertad, Lambayeque e Ica.
            AgroEye-DL integra Big Data y Deep Learning para anticipar riesgos fitosanitarios e
            hídricos.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <article className="reveal-on-scroll reveal-delay-1 min-h-44 rounded-xl border border-emerald-100 bg-white shadow-sm p-5 md:p-6 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl md:text-4xl text-emerald-600">+12,000</span>
                <span className="text-sm text-slate-700">hectáreas</span>
              </div>
              <h3 className="mt-2 text-sm md:text-base font-semibold">Cultivos de palta Hass y arándanos</h3>
              <p className="mt-auto pt-6 text-xs text-slate-500">La Libertad, Lambayeque e Ica</p>
            </article>

            <article className="reveal-on-scroll reveal-delay-2 min-h-44 rounded-xl border border-emerald-100 bg-white shadow-sm p-5 md:p-6 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl md:text-4xl text-emerald-600">+4 TB</span>
                <span className="text-sm text-slate-700">diarios</span>
              </div>
              <h3 className="mt-2 text-sm md:text-base font-semibold">Imágenes multiespectrales e hiperespectrales</h3>
              <p className="mt-auto pt-6 text-xs text-slate-500">Captura aérea mediante drones</p>
            </article>

            <article className="reveal-on-scroll reveal-delay-3 min-h-44 rounded-xl border border-emerald-100 bg-white shadow-sm p-5 md:p-6 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl md:text-4xl text-emerald-600">25,000</span>
                <span className="text-sm text-slate-700">sensores IoT</span>
              </div>
              <h3 className="mt-2 text-sm md:text-base font-semibold">Telemetría y clima en tiempo real</h3>
              <p className="mt-auto pt-6 text-xs text-slate-500">Humedad del suelo y estaciones meteorológicas</p>
            </article>

            <article className="reveal-on-scroll reveal-delay-4 min-h-44 rounded-xl border border-emerald-100 bg-white shadow-sm p-5 md:p-6 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl md:text-4xl text-emerald-600">7 días</span>
                <span className="text-sm text-slate-700">horizonte objetivo</span>
              </div>
              <h3 className="mt-2 text-sm md:text-base font-semibold">Predicción de estrés hídrico</h3>
              <p className="mt-auto pt-6 text-xs text-slate-500">Meta analítica del sistema predictivo</p>
            </article>
          </div>
          <div id="problemas" className="mt-12 grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <h2 id="problems-title" className="reveal-on-scroll reveal-delay-2 mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                  8 problemas identificados en AgroVision Perú
                </h2>
              </div>
              <span className="shrink-0 font-mono text-xs text-emerald-700">01 — 08</span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['Detección tardía de enfermedades', 'La inspección visual manual detecta síntomas cuando el patógeno ya comprometió gran parte de los lotes.'],
                ['Aparición de arañita roja', 'Plaga crítica en palto Hass que deteriora el vigor foliar y el calibre exportable.'],
                ['Presencia del hongo Botrytis', 'Infección de alto impacto en floración y fruto de arándanos frente a humedad costera.'],
                ['Estrés hídrico no detectado a tiempo', 'Déficit de riego en suelos variables que afecta rendimiento y calidad poscosecha.'],
                ['Grandes volúmenes de imágenes heterogéneas', 'Más de 4 TB diarios provenientes de múltiples cámaras, resoluciones y formatos de vuelo.'],
                ['Ruido atmosférico en las imágenes de drones', 'Neblina costera y variaciones lumínicas que distorsionan índices espectrales.'],
                ['Costos elevados de entrenamiento en GPU', 'Necesidad de seleccionar arquitecturas y particionado eficientes antes de escalar.'],
                ['Necesidad de alertas móviles sin latencia', 'Los agrónomos en campo requieren alertas oportunas y claras en sus dispositivos móviles.'],
              ].map(([title, description], index) => (
                <button
                  key={title}
                  type="button"
                  aria-pressed={selectedProblem === index}
                  onClick={() => setSelectedProblem(index)}
                  className={`reveal-on-scroll reveal-delay-${(index % 4) + 1} w-full rounded-xl border bg-white p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 md:p-5 ${
                    selectedProblem === index
                      ? 'border-emerald-300 shadow-lg shadow-emerald-900/10'
                      : 'border-emerald-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-900/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-xs text-emerald-700">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-sm font-semibold leading-snug text-slate-900">{title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">{description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 content-start gap-5 self-start sm:grid-cols-2 lg:grid-cols-1">
            <figure className="reveal-on-scroll reveal-delay-2 h-fit self-start overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
              <video
                src={avocadoVideo}
                aria-label="Video de cultivo de palta Hass"
                className="block h-56 w-full object-cover md:h-64"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-xs md:px-5">
                <span className="font-medium text-slate-800">Palta Hass · La Libertad / Ica</span>
                <span className="text-right text-slate-500">Arañita roja y estrés hídrico</span>
              </figcaption>
            </figure>
            <figure className="reveal-on-scroll reveal-delay-3 h-fit self-start overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
              <video
                src={blueberryVideo}
                aria-label="Video de cultivo de arándanos"
                className="block h-56 w-full object-cover md:h-64"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-xs md:px-5">
                <span className="font-medium text-slate-800">Arándanos de exportación</span>
                <span className="text-right text-slate-500">Detección temprana de Botrytis</span>
              </figcaption>
            </figure>
          </div>
        </div>
        </div>
        <ArchitectureDiagram />
      </section>
      <ScrumTeamItem />
      <ScrumValues />
      <ProductBacklog />
      <SprintBacklog />
      <DefinitionOfDone />
      <Conclusions />
    </main>
  );
}
