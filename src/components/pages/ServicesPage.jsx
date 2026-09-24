import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES_LIST } from '../../data/servicesData';
import { 
  Building2, 
  BookOpenCheck, 
  UserCheck, 
  GraduationCap, 
  FileCheck, 
  CreditCard, 
  Award, 
  Key, 
  UploadCloud, 
  MailCheck, 
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  BookOpenCheck,
  UserCheck,
  GraduationCap,
  FileCheck,
  CreditCard,
  Award,
  Key,
  UploadCloud,
  MailCheck,
  Compass
};

export default function ServicesPage() {
  const { openServiceModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'Admission Services', 'Certificate & Documentation', 'Academic Support'];

  const filteredServices = SERVICES_LIST.filter(s => {
    const matchesCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchesQuery = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
          Services Directory
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
          Admission Consultancy & Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Certified support for JAMB CAPS portal modifications, O'Level result uploads, WAEC/NECO scratch cards, and 1-on-1 admission advisory.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search service by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = ICON_MAP[service.iconName] || GraduationCap;
          return (
            <div
              key={service.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-400/50 transition duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-navy-900 border border-amber-400/30 text-amber-400 rounded-xl flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition">
                    <IconComponent size={22} />
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    {service.fee}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  {service.category}
                </span>

                <h3 className="font-heading font-bold text-lg text-white mt-1 group-hover:text-amber-300 transition">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {service.fullDesc}
                </p>

                {service.requirements && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <p className="text-[10px] text-slate-400 font-mono uppercase mb-1">Required Documents:</p>
                    <ul className="text-[11px] text-slate-400 space-y-1">
                      {service.requirements.slice(0, 3).map((req, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-amber-400 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  Time: <strong className="text-slate-300">{service.processingTime}</strong>
                </span>
                <button
                  onClick={() => openServiceModal(service)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition flex items-center gap-1"
                >
                  Apply Now <ArrowRight size={13} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
