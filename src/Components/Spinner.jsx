import React, { Component } from 'react'
import Loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='body d-flex justify-content-center text-center align-items-center'>
        <img src={Loading} alt={Loading} />
      </div>
    )
  }
}
