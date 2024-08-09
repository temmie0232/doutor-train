import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProgressData {
    totalCards: number;
    masteredCards: number;
    newCardsCount: number;
    reviewCardsCount: number;
    scoreHistory: { date: string; score: number }[];
    averageScores: { date: string; averageScore: number }[];
    streakDays: number;
    weeklyCardCounts: { [week: string]: number };
    monthlyCardCounts: { [month: string]: number };
}

interface ProgressVisualizationProps {
    progressData: ProgressData;
}

const ProgressVisualization: React.FC<ProgressVisualizationProps> = ({ progressData }) => {
    const formatData = (data: { date: string; score: number }[] | { date: string; averageScore: number }[]) => {
        return data.map(item => ({
            date: new Date(item.date).toLocaleDateString(),
            score: 'score' in item ? item.score : item.averageScore
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>学習進捗</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">統計情報</h3>
                        <p>総カード数: {progressData.totalCards}</p>
                        <p>マスターしたカード: {progressData.masteredCards}</p>
                        <p>新規カード: {progressData.newCardsCount}</p>
                        <p>復習カード: {progressData.reviewCardsCount}</p>
                        <p>連続学習日数: {progressData.streakDays}日</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">スコア履歴</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={formatData(progressData.scoreHistory)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="score" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">平均スコア</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={formatData(progressData.averageScores)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProgressVisualization;