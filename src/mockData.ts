import { StudyKitData } from './types';

export const MOCK_STUDY_KIT: StudyKitData = {
  id: '1',
  title: 'Introduction to Quantum Mechanics',
  videoUrl: 'https://youtube.com/watch?v=...',
  guide: {
    sections: [
      {
        title: 'The Wave-Particle Duality',
        content: 'One of the most fundamental concepts in quantum mechanics is that every particle or quantum entity may be described as either a particle or a wave.',
        bullets: [
          'Light as a Wave: Demonstrated by interference patterns.',
          'Light as a Particle: Proven by the photoelectric effect.',
          'De Broglie Hypothesis: Matter also has wave properties.'
        ],
        color: 'bg-brand-blue'
      },
      {
        title: 'The Schrödinger Equation',
        content: 'The Schrödinger equation is a linear partial differential equation that governs the wave function of a quantum-mechanical system.',
        bullets: [
          'Ψ contains all the information we can know about a system.',
          '|Ψ|² represents the probability density.'
        ],
        color: 'bg-brand-purple'
      }
    ],
    takeaway: 'Quantum mechanics is probabilistic, not deterministic.'
  },
  flashcards: [
    { q: "What is the de Broglie wavelength formula?", a: "λ = h / p" },
    { q: "What does |Ψ|² represent?", a: "The probability density of finding a particle." }
  ],
  quiz: [
    {
      q: "Which phenomenon supports the particle nature of light?",
      options: ["Interference", "Diffraction", "Photoelectric Effect", "Polarization"],
      correct: 2
    }
  ]
};
