import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2 } from 'lucide-react';

export default function ExperienceForm() {
  const { experiences, addExperience, updateExperience, removeExperience } = useCVStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Experience</h2>
        <button onClick={addExperience} className="p-2 bg-blue-600 text-white rounded-full"><Plus size={16}/></button>
      </div>

      {experiences.map((exp) => (
        <div key={exp.id} className="p-4 border border-border rounded-xl space-y-3 bg-slate-50">
          <input 
            placeholder="Job Role (e.g. Developer)"
            className="w-full p-2 rounded border border-border"
            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
          />
          <input 
            placeholder="Company Name"
            className="w-full p-2 rounded border border-border"
            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
          />
          <textarea 
            placeholder="Description of what you did"
            className="w-full p-2 rounded border border-border h-24"
            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
          />
          <button onClick={() => removeExperience(exp.id)} className="text-red-500 text-sm flex items-center gap-1">
            <Trash2 size={14}/> Remove
          </button>
        </div>
      ))}
    </div>
  );
}