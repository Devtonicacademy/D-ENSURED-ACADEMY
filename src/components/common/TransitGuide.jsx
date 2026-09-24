import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  ShieldCheck, 
  Bus,
  Car,
  Footprints,
  ExternalLink
} from 'lucide-react';

export const TRANSIT_ROUTES = [
  {
    id: 'iyana-iba',
    origin: 'From Iyana-Iba / LASU Gate',
    travelTime: '10 – 15 Mins',
    transportMode: 'Commercial Bus or Keke NAPEP',
    fareEstimate: '₦150 – ₦250',
    summary: 'Straight path along Lagos-Badagry Expressway toward Okomaiko.',
    steps: [
      'Board any bus or keke heading towards Okomaiko / Agbara at Iyana-Iba interchange.',
      'Pass Volks Bus Stop and execute straight travel along the expressway.',
      'Alight at Igboelerin Bus Stop (directly adjacent to the pedestrian bridge).',
      'Cross over or walk into the service lane right beside Primemart supermarket.',
      'Spot the prominent Doyin Plaza multi-story complex on the right wing. D Ensured Consult Academy is on Floor 1.'
    ],
    landmarkNotes: 'Directly beside Primemart Supermarket at Igboelerin Busstop. If you reach Alaba Rago, you have passed the bus stop.'
  },
  {
    id: 'mile2-alaba',
    origin: 'From Mile 2 / Festac / Trade Fair',
    travelTime: '20 – 30 Mins',
    transportMode: 'BRT / Danfo / Expressway Transit',
    fareEstimate: '₦300 – ₦500',
    summary: 'Westbound movement along the Badagry Expressway.',
    steps: [
      'Take a direct bus or expressway transport heading towards Okomaiko, Agbara or Badagry.',
      'Proceed past Trade Fair complex, Abule-Ado, and Volkswagen (Volks) junction.',
      'Immediately after Volks, inform the driver/conductor you are stopping at Igboelerin Bus Stop.',
      'Drop at Igboelerin Bus Stop. Look towards the right-hand commercial plaza belt.',
      'Doyin Plaza is located right beside Primemart with clear D Ensured Consult signage.'
    ],
    landmarkNotes: 'Key checkpoint: Volkswagen Bus Stop is the immediate preceding landmark.'
  },
  {
    id: 'badagry-agbara',
    origin: 'From Badagry / Agbara / Morogbo',
    travelTime: '25 – 35 Mins',
    transportMode: 'Eastbound Commercial Danfo',
    fareEstimate: '₦300 – ₦600',
    summary: 'Eastbound journey towards Iyana-Iba / Mile 2.',
    steps: [
      'Board any vehicle heading towards Iyana-Iba, Mile 2, or CMS.',
      'Pass through Okokomaiko main bus stop, Ajangbadi junction, and Cassidy.',
      'Alight at Igboelerin Bus Stop just after Cassidy / Church gate axis.',
      'Use the pedestrian overhead bridge to cross to the North service lane.',
      'Doyin Plaza stands prominently adjacent to Primemart.'
    ],
    landmarkNotes: 'Pedestrian bridge at Igboelerin provides safe, direct crossing into Doyin Plaza compound.'
  },
  {
    id: 'igando-ikotun',
    origin: 'From Igando / Ikotun / LASU-Iba Road',
    travelTime: '20 – 30 Mins',
    transportMode: 'Bus to Iyana-Iba, then Keke',
    fareEstimate: '₦300 – ₦450',
    summary: 'Southbound to Iyana-Iba, then short hop west to Igboelerin.',
    steps: [
      'Board a vehicle from Ikotun or Igando down to Iyana-Iba terminus.',
      'At Iyana-Iba roundabout, connect to an Okomaiko-bound bus or tricycle.',
      'Drop at Igboelerin Busstop (approx. 5 minutes drive from Iyana-Iba).',
      'Walk 30 meters into the plaza lane beside Primemart to enter Doyin Plaza.'
    ],
    landmarkNotes: 'Very swift transit once reaching Iyana-Iba round-about.'
  }
];

export default function TransitGuide() {
  const [activeRouteId, setActiveRouteId] = useState('iyana-iba');
  const activeRoute = TRANSIT_ROUTES.find(r => r.id === activeRouteId) || TRANSIT_ROUTES[0];

  return (
    <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Compass size={13} className="text-blue-400" />
            <span>Turn-by-Turn Transit Guides</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            How to Locate & Visit Our Campus
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Situated at <strong className="text-amber-400">Doyin Plaza, Igboelerin Busstop, Beside Primemart, Okomaiko, Lagos State</strong>.
          </p>
        </div>

        <a
          href="https://maps.google.com/?q=Igboelerin+Bus+Stop+Okomaiko+Lagos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 rounded-xl text-xs font-bold text-white transition self-start md:self-auto shrink-0"
        >
          <ExternalLink size={14} className="text-amber-400" />
          <span>Open in Google Maps</span>
        </a>
      </div>

      {/* Main Grid: Interactive Map Embed + Route Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Map Frame */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
            {/* Embedded Interactive OpenStreet/Google Map representation */}
            <iframe
              title="D Ensured Consult Campus Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?q=Igboelerin%20Bus%20Stop%2C%20Okomaiko%2C%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full filter saturate-150 contrast-125 opacity-90 hover:opacity-100 transition-opacity"
            />
            {/* Overlay Campus Badge */}
            <div className="absolute bottom-3 left-3 bg-navy-950/95 border border-amber-400/40 p-3 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <MapPin size={16} />
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-white">D Ensured Consult Academy</p>
                <p className="text-[10px] text-amber-300 font-mono">Doyin Plaza, Igboelerin, Lagos</p>
              </div>
            </div>
          </div>

          {/* Safety Guidelines Box */}
          <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldCheck size={16} /> Commuter & Visitor Safety Guidelines
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              When arriving by public transit on the expressway, always use the designated overhead pedestrian bridge to cross between lanes. Doyin Plaza has secure perimeter parking and on-duty security marshals from 7:30 AM to 7:00 PM daily.
            </p>
          </div>
        </div>

        {/* Right: Turn-by-Turn Route Selection & Directions */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Route selector buttons */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Select Your Starting Point:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {TRANSIT_ROUTES.map(route => {
                const isActive = route.id === activeRouteId;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setActiveRouteId(route.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      isActive
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-bold block truncate">{route.origin}</span>
                    <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1 mt-1">
                      <Clock size={10} /> {route.travelTime}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Route Details Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div>
                <h4 className="font-heading font-bold text-base text-white">{activeRoute.origin}</h4>
                <p className="text-xs text-slate-400">{activeRoute.summary}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">Estimated Fare</span>
                <span className="text-xs font-mono font-bold text-amber-300">{activeRoute.fareEstimate}</span>
              </div>
            </div>

            {/* Turn-by-turn steps */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Turn-by-Turn Navigation Steps:
              </span>
              <ol className="space-y-2.5">
                {activeRoute.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-amber-400/40 text-amber-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Prominent Landmark Highlight */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-amber-400 flex items-center gap-1 text-[11px] font-mono uppercase">
                <MapPin size={12} /> Key Landmark Checkpoint:
              </strong>
              <p className="text-[11px] text-slate-400">{activeRoute.landmarkNotes}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
