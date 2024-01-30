import React from 'react'
import { useNavigate } from 'react-router-dom'

const SpotMeUpIcon = () => {
    const navigate = useNavigate()

    const goHome = () => {
        navigate("/")
    }


  return (
    <>
    <div className='SpotMeUp-MainIcon' onClick={goHome}></div>
    </>
  )
}

export default SpotMeUpIcon