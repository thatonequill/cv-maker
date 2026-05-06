import { useCVStore } from '@/store/useCVStore';
import { Plus, Trash2, LucideIcon } from 'lucide-react'; // Import LucideIcon type

interface ListEditorProps {
  title: string;
  listName: 'experiences' | 'education';
  labels: { title: string; subtitle: string };
  icon: LucideIcon; // New prop for the icon
}

export default function ListEditor({ title, listName, labels, icon: Icon }: ListEditorProps) {
  const { [listName]: items, addItem, updateItem, removeItem, lang } = useCVStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-card-foreground text-sm uppercase tracking-wider flex items-center gap-2">
          <Icon size={16} className="text-primary" /> {/* The Dynamic Icon */}
          {title}
        </h3>
        <button 
          onClick={() => addItem(listName)}
          className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="p-4 bg-background border border-border rounded-xl space-y-3 relative group">
          <input 
            placeholder={labels.title}
            className="w-full p-2 bg-white border border-border rounded-lg text-sm"
            onChange={(e) => updateItem(listName, item.id, 'title', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <input 
              placeholder={labels.subtitle}
              className="p-2 bg-white border border-border rounded-lg text-sm"
              onChange={(e) => updateItem(listName, item.id, 'subtitle', e.target.value)}
            />
            <input 
              placeholder="Period (e.g. 2023 - 2024)"
              className="p-2 bg-white border border-border rounded-lg text-sm"
              onChange={(e) => updateItem(listName, item.id, 'period', e.target.value)}
            />
          </div>
          <textarea 
            placeholder="Description..."
            className="w-full p-2 bg-white border border-border rounded-lg text-sm h-20"
            onChange={(e) => updateItem(listName, item.id, 'desc', e.target.value)}
          />
          <button 
            onClick={() => removeItem(listName, item.id)}
            className="absolute -top-2 -right-2 p-1 bg-white text-red-500 border border-border rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}