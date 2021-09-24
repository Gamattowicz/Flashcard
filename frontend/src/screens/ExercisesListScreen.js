import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Exercise from '../components/Exercise'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listExercises} from '../actions/exerciseActions'
import Paginate from '../components/Paginate'

const ExercisesListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const exerciseList = useSelector((state) => state.exerciseList)
  const { error, loading, exercises, pages, page } = exerciseList

  let keyword = history.location.search

  useEffect(() => {
    dispatch(listExercises(keyword))
  }, [dispatch, history, keyword])

  return (
    <div>
      <h1>Exercises</h1>
      <Link onClick={history.goBack} className="btn btn-outline-primary my-3">
        GO BACK
      </Link>
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
          <Paginate pages={pages} page={page} path={'/exercises'} />
        </>
      )}
    </div>
  )
}

export default ExercisesListScreen
