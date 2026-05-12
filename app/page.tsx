"use client";

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Briefcase, GraduationCap, Heart, User, Globe, Upload } from 'lucide-react';

import { useCVStore } from '@/store/useCVStore';
import Resume from '@/components/preview/Resume';
import ListEditor from '@/components/editor/ListEditor';
import SkillsEditor from '@/components/editor/SkillsEditor';
import LanguageEditor from '@/components/editor/LanguageEditor';
import SoftSkillsEditor from '@/components/editor/SoftSkillsEditor';
import ThemeEditor from '@/components/editor/ThemeEditor';
import ImageCropper from '@/components/editor/ImageCropper';

export default function Home() {
  const [isCropping, setIsCropping] = useState(false);

  const { profileImage, croppedImage, setField, setImage, lang, toggleLang, translations, interests } = useCVStore();
  const componentRef = useRef<HTMLDivElement>(null);
  const t = translations[lang]; // Current localized titles

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Changed from 'content' to 'contentRef'
    documentTitle: 'My_Resume',
  });

  return (
    <main className="flex flex-col lg:flex-row h-screen bg-background">
      {/* LEFT: EDITOR SIDE */}
      <aside className="w-full lg:w-1/3 p-8 overflow-y-auto border-r border-border bg-card shadow-inner">
        <div className="space-y-8">
          <header className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">CV Editor</h1>
              <p className="text-sm text-foreground/70">Refine your professional profile.</p>
            </div>
            {/* Language Toggle Button[cite: 1] */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/20 transition-colors"
            >
              <Globe size={14} />
              {lang === 'en' ? 'EN 🇬🇧' : 'FR 🇫🇷'}
            </button>
          </header>

          <div className="space-y-10">
            {/* Image Upload[cite: 1, 2] */}
            <section className="space-y-4">
              <label className="text-[10px] font-bold uppercase text-foreground/50 flex items-center gap-2">
                <User size={14} /> Profile Picture
              </label>
              
              <div className="flex items-center gap-4">
                {/* Avatar Preview */}
                <div className="relative w-16 h-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                  {croppedImage ? (
                    <img src={croppedImage} className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} className="text-slate-400" />
                  )}
                </div>

                {/* Custom Button Layout */}
                <div className="flex-1">
                  <label className="cursor-pointer group">
                    <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-slate-600 transition-all group-hover:border-primary group-hover:text-primary shadow-sm">
                      <Upload size={16} />
                      {lang === 'en' ? 'Upload Photo' : 'Charger Photo'}
                    </div>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" // Hide the ugly default input
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setImage(e.target.files[0]);
                          setIsCropping(true);
                        }
                      }}
                    />
                  </label>
                  <p className="text-[10px] text-slate-400 mt-2 italic">
                    {lang === 'en' ? 'PNG or JPG, max 5MB' : 'PNG ou JPG, max 5Mo'}
                  </p>
                </div>
              </div>

              {isCropping && <ImageCropper onComplete={() => setIsCropping(false)} />}
            </section>

            {/* Personal Details[cite: 1, 2] */}
            <div className="grid grid-cols-1 gap-4">
              <input 
                placeholder="Ellen"
                onChange={(e) => setField('firstName', e.target.value)}
                className="p-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
              />
              <input 
                placeholder="Joe"
                onChange={(e) => setField('lastName', e.target.value)}
                className="p-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
              />
              <input 
                placeholder={"VHK Service Specialist"}
                onChange={(e) => setField('role', e.target.value)}
                className="p-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="ellen.joe@vhk.zzz"
                onChange={(e) => setField('email', e.target.value)}
                className="p-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
              />
              <input
                placeholder="Sixth Street, New Eridu"
                onChange={(e) => setField('location', e.target.value)}
                className="p-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
              />
              <input 
                placeholder="01 23 45 67 89"
                onChange={(e) => setField('phone', e.target.value)}
                className="p-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
              />
              <input 
                placeholder="qtqwill.dev"
                onChange={(e) => setField('website', e.target.value)}
                className="p-3 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Dynamic Sections*/}

            <LanguageEditor />

            <SoftSkillsEditor />
            
            <SkillsEditor />
            
            <ListEditor 
              title={t.experience} 
              listName="experiences" 
              icon={Briefcase} // Added Icon
              labels={{ title: 'Role', subtitle: 'Company' }} 
            />

            <ListEditor 
              title={t.education} 
              listName="education" 
              icon={GraduationCap} // Added Icon
              labels={{ title: 'Degree', subtitle: 'School' }} 
            />

            {/* Interests Section */}
            <section className="space-y-4">
              <h3 className="font-bold text-card-foreground text-sm uppercase tracking-wider flex items-center gap-2">
                <Heart size={16} className="text-primary" />
                {t.interests}
              </h3>
              <textarea 
                value={interests}
                onChange={(e) => setField('interests', e.target.value)}
                placeholder="Origami, Gaming, Graphic Design..."
                className="w-full p-3 bg-background border border-border rounded-xl text-sm h-24 outline-none focus:border-primary"
              />
            </section>
          </div>

          <ThemeEditor />
          
          <button 
            onClick={() => handlePrint()}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all sticky bottom-0"
          >
            <Download size={20} /> {t.download}
          </button>
        </div>
      </aside>

      {/* RIGHT: PREVIEW SIDE[cite: 1] */}
      <section className="hidden lg:flex w-2/3 bg-slate-200 items-start justify-center p-8 overflow-y-auto">
        <div className="shadow-2xl origin-top scale-90">
          <Resume ref={componentRef} />
        </div>
      </section>
    </main>
  );
}