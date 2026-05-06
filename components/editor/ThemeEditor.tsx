import { useCVStore } from '@/store/useCVStore';
import { Palette, Check } from 'lucide-react';

const THEME_PRESETS = [
  { name: 'Deep Violet', primary: '#7c3aed', sidebar: '#f5f3ff' },
  { name: 'Rose Slate', primary: '#be185d', sidebar: '#fff1f2' },
  { name: 'Emerald', primary: '#059669', sidebar: '#ecfdf5' },
  { name: 'Ocean', primary: '#0284c7', sidebar: '#f0f9ff' },
  { name: 'Midnight', primary: '#334155', sidebar: '#f8fafc' },
];

export default function ThemeEditor() {
  const { accentColor, sidebarColor, setTheme, setField } = useCVStore();

  return (
    <div className="p-6 bg-card border border-border rounded-2xl space-y-6">
      <div className="flex items-center gap-2">
        <Palette size={18} className="text-primary" />
        <h3 className="font-bold text-card-foreground text-sm uppercase tracking-wider">CV Themes</h3>
      </div>

      {/* Preset Circles - Two-tone representation[cite: 1] */}
      <div className="flex flex-wrap gap-4">
        {THEME_PRESETS.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.primary, t.sidebar)}
            className={`relative w-10 h-10 rounded-full border-2 transition-all hover:scale-105 ${
              accentColor === t.primary ? 'border-primary scale-110' : 'border-transparent'
            }`}
            title={t.name}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden flex -rotate-45">
              {/* Left half represents the Sidebar color, Right half the Accent[cite: 1] */}
              <div style={{ backgroundColor: t.sidebar }} className="w-1/2 h-full" />
              <div style={{ backgroundColor: t.primary }} className="w-1/2 h-full" />
            </div>
            {accentColor === t.primary && (
              <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                <Check size={16} />
              </div>
            )}
          </button>
        ))}
      </div>

      <hr className="border-border" />

      {/* Manual Fine-Tuning for custom colors[cite: 1] */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-bold uppercase text-foreground/50 block mb-1">Accent</label>
          <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 py-1">
            <input 
              type="color" 
              value={accentColor}
              onChange={(e) => setField('accentColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-none"
            />
            <span className="text-[10px] font-mono uppercase text-foreground/70">{accentColor}</span>
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase text-foreground/50 block mb-1">Sidebar</label>
          <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 py-1">
            <input 
              type="color" 
              value={sidebarColor}
              onChange={(e) => setField('sidebarColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-none"
            />
            <span className="text-[10px] font-mono uppercase text-foreground/70">{sidebarColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}