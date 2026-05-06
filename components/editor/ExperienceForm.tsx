import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2 } from 'lucide-react';

// This component is likely deprecated or intended to be replaced by ListEditor
// as the ListEditor already handles 'experiences'
export default function ExperienceForm() {
  // Change addExperience -> addItem, etc.
  const { experiences, addItem, updateItem, removeItem, lang, translations } = useCVStore();
  const t = translations[lang];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{t.experience}</h2>
        <button
          onClick={() => addItem('experiences')} // Pass 'experiences' as the list name
          className="p-2 bg-blue-600 text-white rounded-full"
        >
          <Plus size={16}/>
        </button>
      </div>

      {experiences.map((exp) => (
        <div key={exp.id} className="p-4 border border-border rounded-xl space-y-3 bg-slate-50">
          <input 
            value={exp.title}
            placeholder="Role"
            className="w-full p-2 rounded border border-border"
            onChange={(e) => updateItem('experiences', exp.id, 'title', e.target.value)}
          />
          <input 
            value={exp.subtitle}
            placeholder="Company"
            className="w-full p-2 rounded border border-border"
            onChange={(e) => updateItem('experiences', exp.id, 'subtitle', e.target.value)}
          />
          <textarea 
            value={exp.desc}
            placeholder="Description"
            className="w-full p-2 rounded border border-border h-24"
            onChange={(e) => updateItem('experiences', exp.id, 'desc', e.target.value)}
          />
          <button onClick={() => removeItem('experiences', exp.id)} className="text-red-500 text-sm flex items-center gap-1">
            <Trash2 size={14}/> {t.remove}
          </button>
        </div>
      ))}
    </div>
  );
}