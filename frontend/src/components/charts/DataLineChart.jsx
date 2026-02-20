import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";

import { colors } from '../../constants/colors';

export const DataLineChart = ({
    data
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <CartesianGrid stroke={colors.graphBackground} />
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>

            <Line
                type="monotone"
                dataKey="demand_forecast"
                stroke={colors.graphPrimary}
                strokeWidth={3}
            />
            <Line
                type="monotone"
                dataKey="selling_price"
                stroke={colors.graphSecondary}
                strokeWidth={3}
            />
        </LineChart>
    </ResponsiveContainer>
  )
}
