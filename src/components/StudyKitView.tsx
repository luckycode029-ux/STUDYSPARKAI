import React, { useState } from 'react';
import { FileText, Layout, BrainCircuit, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { motion, AnimatePresence } from 'motion/react';

import { StudyKitData, FlashcardData, QuizQuestion, StudyNote } from '../types';

interface StudyKitViewProps {
  data: StudyKitData;
  onBack: () => void;
}

export const StudyKitView: React.FC<StudyKitViewProps> = ({ data, onBack }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'flashcards' | 'quiz'>('guide');

  const tabs = [
    { id: 'guide', label: 'Guide 📘', icon: FileText },
    { id: 'flashcards', label: 'Cards 🧠', icon: Layout },
    { id: 'quiz', label: 'Quiz ⚡', icon: BrainCircuit },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={onBack} className="w-fit text-text-secondary hover:text-text-primary">
          Back
        </Button>
        <div className="flex glass-panel p-1 rounded-2xl border-white/5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="tab-pill"
                  className="absolute inset-0 spark-gradient rounded-xl -z-10 shadow-lg shadow-brand-blue/20"
                />
              )}
              <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'guide' && <StudyGuide key="guide" title={data.title} sections={data.guide.sections} takeaway={data.guide.takeaway} />}
        {activeTab === 'flashcards' && <Flashcards key="flashcards" cards={data.flashcards} />}
        {activeTab === 'quiz' && <Quiz key="quiz" questions={data.quiz} />}
      </AnimatePresence>
    </div>
  );
};

const StudyGuide: React.FC<{ title: string, sections: StudyKitData['guide']['sections'], takeaway: string }> = ({ title, sections, takeaway }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-6 sm:space-y-8 pb-20"
  >
    <Card className="p-6 sm:p-12 border-white/5 bg-brand-bg-alt/40 backdrop-blur-xl prose prose-invert max-w-none">
      <h1 className="text-2xl sm:text-4xl font-display font-black text-text-primary mb-6 sm:mb-10 leading-tight">{title}</h1>
      
      {sections.map((section, idx) => (
        <section key={idx} className="mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center gap-3">
            <div className={`w-1.5 h-6 sm:h-8 rounded-full spark-gradient shadow-lg shadow-brand-blue/20`} />
            {section.title}
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
            {section.content}
          </p>
          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-text-secondary">
            {section.bullets.map((bullet, bIdx) => (
              <li key={bIdx} className="flex gap-4">
                <span className="text-brand-cyan font-black">⚡</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 sm:pt-12 border-t border-white/5">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-[10px] sm:text-xs font-black text-brand-cyan uppercase tracking-[0.2em]">Key Takeaway</span>
          <p className="text-sm sm:text-base font-bold text-text-primary italic">"{takeaway}"</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          icon={FileText} 
          className="w-full sm:w-fit"
          onClick={() => alert('Study guide download will be available soon!')}
        >
          Download PDF
        </Button>
      </div>
    </Card>
  </motion.div>
);

const Flashcards: React.FC<{ cards: FlashcardData[] }> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length), 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length), 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center gap-8 sm:gap-12 py-10 sm:py-16"
    >
      <div className="w-full max-w-[340px] sm:max-w-lg perspective-1000 h-72 sm:h-96">
        <motion.div
          className="relative w-full h-full cursor-pointer preserve-3d transition-all duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden">
            <Card className="w-full h-full flex flex-col items-center justify-center p-8 sm:p-12 text-center border-white/10 bg-white/5 shadow-2xl shadow-brand-blue/5">
              <span className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.2em] mb-6 sm:mb-10">Question</span>
              <h3 className="text-xl sm:text-3xl font-bold text-text-primary leading-tight">{cards[currentIndex].q}</h3>
              <p className="mt-auto text-[10px] sm:text-xs text-text-secondary font-bold uppercase tracking-widest">Tap to reveal answer</p>
            </Card>
          </div>
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <Card className="w-full h-full flex flex-col items-center justify-center p-8 sm:p-12 text-center border-brand-purple/20 bg-brand-purple/5 shadow-2xl shadow-brand-purple/10">
              <span className="text-[10px] font-black text-brand-pink uppercase tracking-[0.2em] mb-6 sm:mb-10">Answer</span>
              <p className="text-lg sm:text-2xl font-bold text-text-primary leading-relaxed">{cards[currentIndex].a}</p>
              <p className="mt-auto text-[10px] sm:text-xs text-text-secondary font-bold uppercase tracking-widest">Tap to see question</p>
            </Card>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6 sm:gap-10">
        <Button variant="outline" size="sm" icon={ChevronLeft} onClick={handlePrev} className="rounded-full w-12 h-12 sm:w-16 sm:h-16 p-0" />
        <span className="text-base sm:text-lg font-black text-text-primary tracking-widest">{currentIndex + 1} / {cards.length}</span>
        <Button variant="outline" size="sm" icon={ChevronRight} onClick={handleNext} className="rounded-full w-12 h-12 sm:w-16 sm:h-16 p-0" />
      </div>
    </motion.div>
  );
};

const Quiz: React.FC<{ questions: QuizQuestion[] }> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  if (currentQuestion >= questions.length) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 sm:py-32">
        <div className="w-20 h-20 sm:w-24 sm:h-24 spark-gradient text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-blue/20 glow-primary">
          <CheckCircle2 size={40} className="sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-text-primary mb-4">Quiz Completed! 🏆</h2>
        <p className="text-text-secondary mb-12 text-lg sm:text-2xl font-bold">You scored {score} out of {questions.length}</p>
        <Button icon={RotateCcw} size="lg" onClick={() => { setCurrentQuestion(0); setScore(0); }}>Try Again</Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="max-w-2xl mx-auto py-10 sm:py-16"
    >
      <div className="mb-10 sm:mb-12 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-black text-brand-cyan uppercase tracking-[0.2em]">Question {currentQuestion + 1} of {questions.length}</span>
        <div className="h-2 w-32 sm:w-48 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full spark-gradient transition-all duration-700 shadow-lg shadow-brand-blue/20" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <h3 className="text-2xl sm:text-4xl font-black text-text-primary mb-10 sm:mb-16 leading-tight">{questions[currentQuestion].q}</h3>

      <div className="space-y-4 mb-12 sm:mb-16">
        {questions[currentQuestion].options.map((option, i) => {
          const isCorrect = i === questions[currentQuestion].correct;
          const isSelected = selectedOption === i;
          
          let stateStyles = "border-white/10 hover:border-brand-cyan/50 hover:bg-white/5";
          if (isSubmitted) {
            if (isCorrect) stateStyles = "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10";
            else if (isSelected) stateStyles = "border-brand-coral bg-brand-coral/10 text-brand-coral shadow-lg shadow-brand-coral/10";
            else stateStyles = "border-white/5 opacity-30";
          } else if (isSelected) {
            stateStyles = "border-brand-cyan bg-brand-cyan/10 text-brand-cyan shadow-lg shadow-brand-cyan/10 glow-cyan";
          }

          return (
            <button
              key={i}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(i)}
              className={`w-full flex items-center justify-between p-5 sm:p-7 rounded-2xl border-2 text-base sm:text-xl font-bold transition-all text-left ${stateStyles}`}
            >
              <span>{option}</span>
              {isSubmitted && isCorrect && <CheckCircle2 size={22} className="sm:w-6 sm:h-6" />}
              {isSubmitted && isSelected && !isCorrect && <XCircle size={22} className="sm:w-6 sm:h-6" />}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        {!isSubmitted ? (
          <Button disabled={selectedOption === null} size="lg" onClick={handleSubmit} className="w-full sm:w-fit">Submit Answer</Button>
        ) : (
          <Button size="lg" onClick={nextQuestion} className="w-full sm:w-fit">
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
