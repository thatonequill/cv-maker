import { useCVStore } from '@/store/useCVStore';
import { Tag, X } from 'lucide-react';
import { useState } from 'react';

export default function SoftSkillsEditor() {
  const { softSkills, addSoftSkill, removeSoftSkill, lang, translations } = useCVStore();
  const t = translations[lang]; // Get current translations
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addSoftSkill(input.trim());
      setInput("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-card-foreground text-sm uppercase tracking-wider flex items-center gap-2">
        <Tag size={16} className="text-primary" />
        {t.tags} {/* Dynamic Title */}
      </h3>
      
      <div className="flex gap-2">
        <input 
          placeholder={lang === 'en' ? "e.g. Creativity" : "ex: Créativité"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1 p-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-primary"
        />
        <button 
          onClick={handleAdd} 
          className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
        >
          {lang === 'en' ? 'Add' : 'Ajouter'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {softSkills.map((skill) => (
          <span key={skill} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
            {skill}
            <button onClick={() => removeSoftSkill(skill)} className="hover:text-red-500 transition-colors">
              <X size={12}/>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}