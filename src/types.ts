export interface StudyNote {
  time: string;
  title: string;
  content: string;
}

export interface FlashcardData {
  q: string;
  a: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface StudyKitData {
  id: string;
  title: string;
  videoUrl: string;
  guide: {
    sections: {
      title: string;
      content: string;
      bullets: string[];
      color: string;
    }[];
    takeaway: string;
  };
  flashcards: FlashcardData[];
  quiz: QuizQuestion[];
}
