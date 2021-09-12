import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'

const ExerciseChart = ({ data = [], colors = [] }) => {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={250}
        cy={200}
        outerRadius={100}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}

export default ExerciseChart
