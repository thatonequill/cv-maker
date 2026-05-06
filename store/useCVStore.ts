import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Interfaces for Type Safety ---
interface CVItem {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  desc: string;
}

interface Skill {
  id: number;
  name: string;
  level: number;
}

interface Language {
  id: number;
  name: string;
  level: string;
}

interface CVState {
  // Personal Info[cite: 2]
  croppedImage: string | null;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  location: string;
  phone: string;
  website: string;
  profileImage: string;
  interests: string;
  
  // Theme & Language Settings[cite: 1, 3]
  lang: 'en' | 'fr';
  accentColor: string;
  sidebarColor: string;
  translations: Record<'en' | 'fr', Record<string, string>>;

  // Dynamic Lists
  experiences: CVItem[];
  education: CVItem[];
  skills: Skill[];
  languages: Language[];
  softSkills: string[]; // These are the "Tags" like "Creativity"

  // Actions[cite: 1]
  setField: (field: string, value: any) => void;
  setImage: (file: File) => void;
  setTheme: (accent: string, sidebar: string) => void;
  toggleLang: () => void;
  
  // Experience/Education Helpers
  addItem: (list: 'experiences' | 'education') => void;
  updateItem: (list: 'experiences' | 'education', id: number, field: string, value: string) => void;
  removeItem: (list: 'experiences' | 'education', id: number) => void;

  // Skill Helpers
  addSkill: () => void;
  updateSkill: (id: number, field: string, value: any) => void;
  removeSkill: (id: number) => void;

  // Language & Soft Skill Helpers[cite: 1]
  addLanguage: () => void;
  updateLanguage: (id: number, field: string, value: string) => void;
  removeLanguage: (id: number) => void;
  addSoftSkill: (skill: string) => void;
  removeSoftSkill: (skill: string) => void;
}

export const useCVStore = create<CVState>()(
  persist( // Added Persist so data isn't lost on refresh[cite: 1]
    (set) => ({
      // --- Initial State ---
      croppedImage: null,
      firstName: "John",
      lastName: "Doe",
      role: "Software Engineer",
      email: "john.doe@example.com",
      location: "Paris, France",
      phone: "+33 6 00 00 00 00",
      website: "portfolio.com",
      profileImage: "",
      interests: "",
      lang: 'en',
      accentColor: "#7c3aed", // Deep Violet[cite: 3]
      sidebarColor: "#f5f3ff", // Mauve Tint[cite: 3]

      translations: {
        en: {
          experience: "Experience",
          education: "Education",
          skills: "Skills",
          contact: "Contact",
          interests: "Interests",
          languages: "Languages",
          tags: "Soft Skills",
          download: "Download PDF"
        },
        fr: {
          experience: "Expériences",
          education: "Formations",
          skills: "Compétences",
          contact: "Contact",
          interests: "Centres d'intérêt",
          languages: "Langues",
          tags: "Atouts",
          download: "Télécharger PDF"
        }
      },

      experiences: [],
      education: [],
      skills: [],
      languages: [],
      softSkills: ["Creativity", "Adaptability"], // Default tags[cite: 1]

      // --- Actions ---[cite: 1]
      setField: (field, value) => set((state) => ({ ...state, [field]: value })),
      setImage: (file: File) => set({ profileImage: URL.createObjectURL(file) }),
      setCroppedImage: (img: string) => set({ croppedImage: img }),
      setTheme: (accent, sidebar) => set({ accentColor: accent, sidebarColor: sidebar }),
      toggleLang: () => set((state) => ({ lang: state.lang === 'en' ? 'fr' : 'en' })),

      addItem: (list) => set((state) => ({
        [list]: [...state[list], { id: Date.now(), title: '', subtitle: '', period: '', desc: '' }]
      })),
      updateItem: (list, id, field, value) => set((state) => ({
        [list]: state[list].map((item) => item.id === id ? { ...item, [field]: value } : item)
      })),
      removeItem: (list, id) => set((state) => ({
        [list]: state[list].filter((item) => item.id !== id)
      })),

      addSkill: () => set((state) => ({
        skills: [...state.skills, { id: Date.now(), name: '', level: 50 }]
      })),
      updateSkill: (id, field, value) => set((state) => ({
        skills: state.skills.map((s) => s.id === id ? { ...s, [field]: value } : s)
      })),
      removeSkill: (id) => set((state) => ({
        skills: state.skills.filter((s) => s.id !== id)
      })),

      addLanguage: () => set((state) => ({
        languages: [...state.languages, { id: Date.now(), name: '', level: '' }]
      })),
      updateLanguage: (id, field, value) => set((state) => ({
        languages: state.languages.map((l) => l.id === id ? { ...l, [field]: value } : l)
      })),
      removeLanguage: (id) => set((state) => ({
        languages: state.languages.filter((l) => l.id !== id)
      })),

      addSoftSkill: (skill) => set((state) => ({
        softSkills: [...state.softSkills, skill]
      })),
      removeSoftSkill: (skill) => set((state) => ({
        softSkills: state.softSkills.filter((s) => s !== skill)
      })),
    }),
    { name: 'cv-storage' } // LocalStorage Key[cite: 1]
  )
);