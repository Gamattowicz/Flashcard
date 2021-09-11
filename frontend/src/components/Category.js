import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
  return (
    <Card
      className="my-3 p-3 rounded text-center"
      style={{ backgroundColor: category.color }}
    >
      <Link to={`/category/${category.id}`}>{category.name}</Link>
    </Card>
  )
}

export default Category
