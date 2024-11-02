import React from 'react'
import {Helmet} from 'react-helmet'

const Head = ({title}) => {
  return (
    <div>
        <Helmet>
           <title>Isakay | {title}</title> 
        </Helmet>
    </div>
  )
}

export default Head
