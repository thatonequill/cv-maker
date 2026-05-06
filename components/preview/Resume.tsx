import React, { forwardRef } from 'react';
import { useCVStore } from '@/store/useCVStore';
import { Mail, MapPin, Phone, Globe, Briefcase, GraduationCap, Heart, Code, UserCircle } from 'lucide-react';

const Resume = forwardRef<HTMLDivElement>((props, ref) => {
  const data = useCVStore();
  const t = data.translations[data.lang]; // Get current language translations[cite: 1]

  return (
    <div 
      id="resume"
      ref={ref} 
      style={{ 
        "--primary": data.accentColor,
        "--sidebar": data.sidebarColor 
      } as React.CSSProperties}
      className="w-[210mm] min-h-[297mm] bg-white grid grid-cols-12 text-slate-700 shadow-2xl print:shadow-none print:w-full print:h-[297mm] print:overflow-hidden"
    >
      {/* --- SIDEBAR (4 Columns) --- */}
      <div className="col-span-4 p-8 flex flex-col gap-8 print:h-[297mm]" style={{ backgroundColor: 'var(--sidebar)' }}> 
        <div className="text-center">
          {data.croppedImage ? (
            <img src={data.croppedImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-md" />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-slate-200 flex items-center justify-center text-slate-400">
              <UserCircle size={48}/>
            </div>
          )}
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
            {data.firstName} <br /> 
            <span style={{ color: 'var(--primary)' }}>{data.lastName}</span>
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wider">{data.role}</p>
        </div>

        {/* Contact Info[cite: 2] */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3">
            <Mail size={14} style={{ color: 'var(--primary)' }} />
            <span className="truncate">{data.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={14} style={{ color: 'var(--primary)' }} />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={14} style={{ color: 'var(--primary)' }} />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe size={14} style={{ color: 'var(--primary)' }} />
            <span>{data.website}</span>
          </div>
        </div>

        {/* Languages Section */}
        {data.languages.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 border-b border-black/5 pb-2">
              {t.languages} {/* Translated Title[cite: 1] */}
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-[10px] font-bold uppercase">
                  <span>{lang.name}</span>
                  <span className="text-slate-400">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills / Tags Section */}
        {data.softSkills.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 border-b border-black/5 pb-2">
              {t.tags} {/* Translated Title */}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.softSkills.map((skill, index) => (
                <span key={index} className="px-2 py-1 rounded-md text-[10px] font-bold bg-white border border-black/5" style={{ color: 'var(--primary)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests Section - Moved to sidebar with original styling */}
        {data.interests && (
          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100 print:break-inside-avoid">
            <div className="flex items-center gap-3 mb-3">
              <Heart size={18} style={{ color: 'var(--primary)' }} />
              <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">
                {t.interests}
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              {data.interests}
            </p>
          </section>
        )}
      </div>

      {/* --- MAIN CONTENT (8 Columns) --- */}
      <div className="col-span-8 p-12 space-y-10 bg-white print:h-[297mm]">        
        {/* Professional Experience[cite: 2] */}
        <section className="print:break-inside-avoid">
          <div className="flex items-center gap-3 mb-6 print:break-inside-avoid">
            <Briefcase size={20} style={{ color: 'var(--primary)' }} />
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800">
              {t.experience}
            </h2>
          </div>
          
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100 last:pb-0 pb-2">
                <div 
                  className="absolute -left-[7px] top-0 w-3 h-3 rounded-full" 
                  style={{ backgroundColor: 'var(--primary)' }}
                ></div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900">{exp.title || "Role"}</h3>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-500 italic">
                    {exp.period}
                  </span>
                </div>
                <div className="text-sm font-medium mb-2" style={{ color: 'var(--primary)' }}>
                  {exp.subtitle || "Company"}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education[cite: 2] */}
        <section className="print:break-inside-avoid">
          <div className="flex items-center gap-3 mb-6 print:break-inside-avoid">
            <GraduationCap size={20} style={{ color: 'var(--primary)' }} />
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800">
              {t.education}
            </h2>
          </div>
          
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative pl-6 border-l-2 border-slate-100 last:pb-0 pb-2">
                <div 
                  className="absolute -left-[7px] top-0 w-3 h-3 rounded-full opacity-50" 
                  style={{ backgroundColor: 'var(--primary)' }}
                ></div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900">{edu.title || "Degree"}</h3>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">
                    {edu.period}
                  </span>
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
                  {edu.subtitle || "School/University"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section Moved to Main Body */}
        <section className="print:break-inside-avoid">
          <div className="flex items-center gap-3 mb-6 print:break-inside-avoid"><Code size={20} style={{ color: 'var(--primary)' }} /><h2 className="text-lg font-bold uppercase tracking-widest text-slate-800">{t.skills}</h2></div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between text-[10px] font-bold mb-1 uppercase"><span>{skill.name}</span></div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-700" style={{ backgroundColor: 'var(--primary)', width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

Resume.displayName = "Resume";
export default Resume;