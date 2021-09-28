import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import Exercise from '../components/Exercise'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listAllExercises} from '../actions/exerciseActions'
import Paginate from '../components/Paginate'

const ExercisesAllListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const exerciseAllList = useSelector((state) => state.exerciseAllList)
  const { error, loading, exercises, pages, page } = exerciseAllList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let keyword = history.location.search

  useEffect(() => {
    if (!userInfo.is_admin) {
      history.push('/login')
    } else {
      dispatch(listAllExercises(keyword))
    }
  }, [dispatch, history, userInfo, keyword])

  return (
    <>
      <h1>All Exercises</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {exercises.length <= 0 && (
              <div>
                <h3 className="text-warning fw-bold text-center text-uppercase">
                  No exercises
                </h3>
              </div>
            )}
            {exercises.map((exercise) => (
              <Col key={exercise.id} sm={12} md={6} lg={4} xl={3}>
                <Exercise exercise={exercise} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} path={'/admin/exercises'} />
        </>
      )}
    </>
  )
}

export default ExercisesAllListScreen
