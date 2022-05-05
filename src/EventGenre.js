import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = () => {
            const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS', 'AngularJS-Remote'];
            const data = genres.map((genre) => {
                const value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length;
                return { name: genre, value }
            });
            return data.filter(genre => genre.value !== 0);
        };
        setData(() => getData());
    }, [events]);
    // points from Api documentation
    const colors = [
        "#00171cf0",
        "#ff1493",
        "#00d5ff",
        "#ffffff",
        "#8884d8"
    ];

    return (
        <ResponsiveContainer
            className="pie-chart-wrapper" height={400} >
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >
                    {
                        data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenre;
