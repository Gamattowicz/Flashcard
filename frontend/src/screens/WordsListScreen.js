import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import Word from '../components/Word'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listWords} from '../actions/wordActions'
import Paginate from '../components/Paginate'

const WordsListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const wordList = useSelector((state) => state.wordList)
  const { loading, error, words, pages, page } = wordList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let keyword = history.location.search

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listWords(keyword))
    }
  }, [dispatch, userInfo, history, keyword])

  return (
    <>
      <h1>Words</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {words.length <= 0 && (
              <div>
                <h3 className="text-warning fw-bold text-center text-uppercase">
                  No words
                </h3>
              </div>
            )}
            {words.map((word) => (
              <Col key={word.id} sm={12} md={6} lg={4} xl={3}>
                <Word word={word} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} path={'/words'} />
        </>
      )}
    </>
  )
}

export default WordsListScreen
