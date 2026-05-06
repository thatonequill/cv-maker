import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2, Code } from 'lucide-react';

export default function SkillsEditor() {
  const { skills, addSkill, updateSkill, removeSkill, lang, translations } = useCVStore();
  const t = translations[lang]; // Pull the localized titles

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-card-foreground text-sm uppercase tracking-wider flex items-center gap-2">
          <Code size={16} className="text-primary" /> 
          {t.skills} {/* Now dynamically translates */}
        </h3>
        <button 
          onClick={addSkill} 
          className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
        >
          <Plus size={18} />
        </button>
      </div>

      {skills.map((skill: any) => (
        <div key={skill.id} className="p-4 bg-background border border-border rounded-xl space-y-4">
          <div className="flex justify-between gap-2">
            <input 
              placeholder={lang === 'en' ? "Skill Name" : "Nom de la compétence"}
              className="flex-1 p-2 bg-white border border-border rounded-lg text-sm outline-none"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
            />
            <button onClick={() => removeSkill(skill.id)} className="text-red-400 p-1">
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-foreground/50 uppercase">Level</span>
              <span className="text-[10px] font-bold text-primary">{skill.level}%</span>
            </div>
            
            <input 
              type="range"
              min="0"
              max="100"
              step={10}
              list="tickmarks"
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            
            <datalist id="tickmarks" className="flex justify-between w-full px-1">
              {[0, 10, 25, 40, 50, 60, 75, 90, 100].map(val => (
                <option key={val} value={val} />
              ))}
            </datalist>
          </div>
        </div>
      ))}
    </div>
  );
}