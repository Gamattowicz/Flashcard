import React from 'react'
import {Cell, Pie, PieChart, Tooltip} from 'recharts'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
const ExerciseChart = ({ data = [], colors = [] }) => {
  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data}
        cx={250}
        cy={200}
        outerRadius={100}
        stroke="none"
        label={renderCustomizedLabel}
        labelLine={false}
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
