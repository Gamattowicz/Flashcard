import React, {useEffect, useRef} from 'react'
import {Button} from 'react-bootstrap'

const Timer = ({ setTime, time }) => {
  const counterRef = useRef(time)

  const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  useEffect(() => {
    counterRef.current = time
  })

  useEffect(() => {
    setInterval(() => {
      setTime(counterRef.current + 1)
    }, 1000)
  }, [])

  return (
    <Button variant="light my-3" className="float-none disabled fw-bold">
      {formatTime(time)}
    </Button>
  )
}

export default Timer
