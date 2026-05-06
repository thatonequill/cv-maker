import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2, Languages } from 'lucide-react';

export default function LanguageEditor() {
  const { languages, addLanguage, updateLanguage, removeLanguage, lang, translations } = useCVStore();
  const t = translations[lang]; // Get current translations

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-card-foreground text-sm uppercase tracking-wider flex items-center gap-2">
          <Languages size={16} className="text-primary" /> 
          {t.languages} {/* Dynamic Title */}
        </h3>
        <button onClick={addLanguage} className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
          <Plus size={18} />
        </button>
      </div>

      {languages.map((langItem) => (
        <div key={langItem.id} className="grid grid-cols-12 gap-2 bg-background p-2 rounded-xl border border-border">
          <input 
            placeholder={lang === 'en' ? "Language" : "Langue"}
            className="col-span-6 p-2 bg-white border border-border rounded-lg text-xs outline-none focus:border-primary"
            value={langItem.name}
            onChange={(e) => updateLanguage(langItem.id, 'name', e.target.value)}
          />
          <input 
            placeholder={lang === 'en' ? "Level" : "Niveau"}
            className="col-span-4 p-2 bg-white border border-border rounded-lg text-xs outline-none focus:border-primary"
            value={langItem.level}
            onChange={(e) => updateLanguage(langItem.id, 'level', e.target.value)}
          />
          <button onClick={() => removeLanguage(langItem.id)} className="col-span-2 text-red-500 flex justify-center items-center">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}