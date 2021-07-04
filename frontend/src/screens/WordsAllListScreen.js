import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Word from '../components/Word'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAllWords } from '../actions/wordActions'

const WordsAllListScreen = () => {
  const dispatch = useDispatch()
  const wordAllList = useSelector((state) => state.wordAllList)
  const { error, loading, words } = wordAllList

  useEffect(() => {
    dispatch(listAllWords())
  }, [dispatch])

  return (
    <div>
      <h1>All Words</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {words.map((word) => (
            <Col key={word.id} sm={12} md={6} lg={4} xl={3}>
              <Word word={word} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default WordsAllListScreen
