import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LearningHistoryChartProps {
    history: {
        date: Date;
        score: number;
    }[];
}

const LearningHistoryChart: React.FC<LearningHistoryChartProps> = ({ history }) => {
    const data = history.map(item => ({
        date: item.date.toLocaleDateString(),
        score: item.score
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LearningHistoryChart;