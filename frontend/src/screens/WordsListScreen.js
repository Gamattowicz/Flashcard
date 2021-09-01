import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Word from '../components/Word'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listWords } from '../actions/wordActions'
import Paginate from '../components/Paginate'

const WordsListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const wordList = useSelector((state) => state.wordList)
  const { loading, error, words, pages, page } = wordList

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listWords(keyword))
  }, [dispatch, history, keyword])

  return (
    <div>
      <h1>Words</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {words.map((word) => (
              <Col key={word.id} sm={12} md={6} lg={4} xl={3}>
                <Word word={word} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </div>
      )}
    </div>
  )
}

export default WordsListScreen
