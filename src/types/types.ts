import { Product } from '@/data/productData';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

// AuthContext types
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    saveUserName: (name: string) => Promise<void>;
    getUserName: () => Promise<string | null>;
}

// Quiz related types
export interface QuizAnswerItem {
    item: string;
    attributes?: { [key: string]: string };
    sizeDependent?: { [size: string]: string | null };
    quantity?: number | { [size: string]: number };
}

// Quiz related types
export interface SelectedItem {
    item: string;
    attributes?: { [key: string]: string };
    size?: string;
    quantity?: { [size: string]: number };
}

export interface QuizState {
    selectedItems: SelectedItem[];
    jetSteamerFoam: boolean;
    whippedCreamCount: { [size: string]: number };
    espressoSize: { [size: string]: string };
    hotCupTypes: { [size: string]: string };
}

export interface QuizContextType extends QuizState {
    submitted: boolean;
    isCorrect: (item: string) => boolean;
    toggleItem: (item: string, size?: string) => void;
    setJetSteamerFoam: (value: boolean) => void;
    setWhippedCreamCount: (size: string, count: number) => void;
    setEspressoSize: (size: string, espressoSize: string) => void;
    handleHotCupTypeSelection: (size: string, type: string) => void;
}

// Component prop types
export interface ProductQuizProps {
    productName: string;
}

export interface MaterialSelectorProps {
    correctAnswer: QuizAnswerItem[];
    product: Product;
    onSubmit: (score: number) => void;
    submitted: boolean;
}

export interface QuizResultProps {
    score: number;
    correctAnswer: QuizAnswerItem[];
    productName: string;
    answerChecked: boolean;
    onNextQuestion: () => void;  // 新しく追加したプロパティ
}

export interface ProductImageProps {
    product: Product | undefined;
}

export interface NavigationButtonsProps {
    productName: string;
}

export interface InstructionCarouselProps {
    productName: string;
    instructions: string[][];
}

export interface ProductGridProps {
    products: Product[];
    onProductClick: (productName: string) => void;
    quizResults: { [key: string]: { score: number; totalQuestions: number } };
}

export interface ProductCardProps {
    product: Product;
    onClick: (productName: string) => void;
    quizResult: { score: number; totalQuestions: number } | null;
}

export interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export interface SortDropdownProps {
    title: string;
    options: string[];
    selectedOptions: string[];
    onOptionToggle: (option: string) => void;
    allOption: string;
}

export interface UnderstandingBadgeProps {
    score: number | null;
    totalQuestions: number;
    showPercentage?: boolean;
}

export interface WelcomeMessageProps {
    user: User | null;
    userName: string | null;
}

export interface NameInputModalProps {
    isOpen: boolean;
    onClose: (name: string) => void;
}

// Category component props
export interface CategoryProps {
    category: string;
    items: string[];
    selectedItems: SelectedItem[];
    toggleItem: (item: string, size?: string) => void;
    submitted: boolean;
    isCorrect: (item: string) => boolean;
    product: Product;
}

// HotCupTypeSelector component props
export interface HotCupTypeSelectorProps {
    product: Product;
    hotCupTypes: { [size: string]: string };
    handleHotCupTypeSelection: (size: string, type: string) => void;
}

// WhippedCreamOption component props
export interface WhippedCreamOptionProps {
    product: Product;
}

// EspressoOption component props
export interface EspressoOptionProps {
    product: Product;
}

export interface CardDetails {
    productId: string;
    category: 'hot' | 'ice' | 'food';
    isNew: boolean;
    dueDate: Date;
    easeFactor: number;
    interval: number;
    correctCount: number;
    learningHistory: {
        date: Timestamp;
        score: number;
    }[];
}

export interface LearningHistoryItem {
    date: Date | Timestamp;
    score: number;
}

export interface CardData {
    productId: string;
    easeFactor: number;
    interval: number;
    dueDate: Date | Timestamp;
    isNew: boolean;
    correctCount: number;
    learningHistory: LearningHistoryItem[];
}

export interface UserProgress {
    cards: { [productId: string]: CardData };
    lastStudyDate: Date | Timestamp;
    lastQueueInitDate: Date | Timestamp;
    newQueue: string[];
    reviewQueue: string[];
}