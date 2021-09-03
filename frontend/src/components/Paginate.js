import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, path }) => {
  return (
    pages > 1 && (
      <Pagination size="lg">
        <LinkContainer
          to={`/words/?page=1`}
          className={`${page === 1 ? 'disabled' : ''}`}
        >
          <Pagination.First />
        </LinkContainer>
        <LinkContainer
          to={`/words/?page=${page - 1}`}
          className={`${page === 1 ? 'disabled' : ''}`}
        >
          <Pagination.Prev />
        </LinkContainer>
        {[...Array(pages).keys()].map((x) => (
          <div>
            <LinkContainer key={x + 1} to={`${path}/?page=${x + 1}`}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          </div>
        ))}
        <LinkContainer
          to={`/words/?page=${page + 1}`}
          className={`${page === pages ? 'disabled' : ''}`}
        >
          <Pagination.Next />
        </LinkContainer>
        <LinkContainer
          to={`/words/?page=${pages}`}
          className={`${page === pages ? 'disabled' : ''}`}
        >
          <Pagination.Last />
        </LinkContainer>
      </Pagination>
    )
  )
}

export default Paginate
