import React, { Component } from 'react'
import Loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='news-spinner' role='status' aria-live='polite'>
        <img src={Loading} alt='Loading headlines' />
        <span className='visually-hidden'>Loading headlines...</span>
      </div>
    )
  }
}
