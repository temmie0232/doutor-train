import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Grade, StudySessionConfig } from '@/lib/spaced-repetition/types';
import { StudySession } from '@/lib/spaced-repetition/studySession';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Card as UICard,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ProgressVisualization from './ProgressVisualization';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import UserSettings from './UserSettings';

const SpacedRepetitionTraining: React.FC = () => {
    const { user } = useAuth();
    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [userAnswer, setUserAnswer] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [selfEvaluation, setSelfEvaluation] = useState<Grade | null>(null);
    const [sessionState, setSessionState] = useState<any>(null);
    const [progressData, setProgressData] = useState<any>(null);
    const [config, setConfig] = useState<StudySessionConfig>({
        maxNewCardsPerDay: 3,
        maxReviewCardsPerDay: 6
    });
    const db = getFirestore();

    useEffect(() => {
        if (user) {
            initializeStudySession();
        }
    }, [user]);

    const initializeStudySession = async () => {
        await loadConfig();
        const cards = await loadCards();
        const newSession = new StudySession(cards, config);
        await loadStudySessionState(newSession);
        setStudySession(newSession);
        getNextCard(newSession);
        updateProgressData(newSession);
    };

    const loadConfig = async () => {
        const configRef = doc(db, 'users', user!.uid, 'studyConfig', 'current');
        const configDoc = await getDoc(configRef);
        if (configDoc.exists()) {
            setConfig(configDoc.data() as StudySessionConfig);
        }
    };

    const loadCards = async (): Promise<Card[]> => {
        const cardsRef = collection(db, 'users', user!.uid, 'cards');
        const snapshot = await getDocs(cardsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Card));
    };

    const loadStudySessionState = async (session: StudySession) => {
        const stateRef = doc(db, 'users', user!.uid, 'studySession', 'current');
        const stateDoc = await getDoc(stateRef);
        if (stateDoc.exists()) {
            session.restoreSession(stateDoc.data());
        }
    };

    const getNextCard = (session: StudySession) => {
        const nextCard = session.getNextCard();
        setCurrentCard(nextCard);
        setShowAnswer(false);
        setUserAnswer(0);
        setSelfEvaluation(null);
        setSessionState(session.getSessionState());
    };

    const handleSubmitAnswer = () => {
        if (currentCard && studySession) {
            const isCorrect = userAnswer === currentCard.correctAnswers;
            if (currentCard.reviewCount === 0) {
                studySession.answerNewCard(currentCard, isCorrect);
            }
            setShowAnswer(true);
        }
    };

    const handleSelfEvaluation = async (grade: Grade) => {
        if (currentCard && studySession) {
            if (currentCard.reviewCount !== 0) {
                studySession.answerReviewCard(currentCard, grade);
            }
            await saveStudySessionState(studySession);
            getNextCard(studySession);
            updateProgressData(studySession);
        }
    };

    const saveStudySessionState = async (session: StudySession) => {
        const stateRef = doc(db, 'users', user!.uid, 'studySession', 'current');
        await setDoc(stateRef, session.getSessionState());
    };

    const updateProgressData = (session: StudySession) => {
        setProgressData(session.getProgressData());
    };

    const handleSaveSettings = async (newSettings: StudySessionConfig) => {
        setConfig(newSettings);
        const configRef = doc(db, 'users', user!.uid, 'studyConfig', 'current');
        await setDoc(configRef, newSettings);
        if (studySession) {
            studySession.updateConfig(newSettings);
            setSessionState(studySession.getSessionState());
        }
    };

    const renderCardFront = () => (
        <CardContent>
            <p>{currentCard?.question}</p>
            <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(Number(e.target.value))}
                min={0}
                max={currentCard?.correctAnswers}
            />
            <Button onClick={handleSubmitAnswer}>Submit</Button>
        </CardContent>
    );

    const renderCardBack = () => (
        <CardContent>
            <p>Correct Answers: {currentCard?.correctAnswers}</p>
            <p>Your Answer: {userAnswer}</p>
            <RadioGroup onValueChange={(value) => handleSelfEvaluation(Number(value) as Grade)}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">1 - Again</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">2 - Hard</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3">3 - Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4">4 - Easy</Label>
                </div>
            </RadioGroup>
        </CardContent>
    );

    if (!studySession || !currentCard) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-8">
            <UICard>
                <CardHeader>
                    <CardTitle>Spaced Repetition Training</CardTitle>
                    <CardDescription>
                        New cards: {sessionState.newCardsStudied} / {sessionState.totalNewCards}
                        <Progress value={(sessionState.newCardsStudied / sessionState.totalNewCards) * 100} className="mt-2" />
                        Review cards: {sessionState.reviewCardsStudied} / {sessionState.totalReviewCards}
                        <Progress value={(sessionState.reviewCardsStudied / sessionState.totalReviewCards) * 100} className="mt-2" />
                    </CardDescription>
                </CardHeader>
                {showAnswer ? renderCardBack() : renderCardFront()}
                <CardFooter>
                    <Button onClick={() => getNextCard(studySession)}>Next Card</Button>
                </CardFooter>
            </UICard>

            {progressData && <ProgressVisualization progressData={progressData} />}

            <UserSettings
                currentConfig={config}
                onSaveSettings={handleSaveSettings}
            />
        </div>
    );
};

export default SpacedRepetitionTraining;