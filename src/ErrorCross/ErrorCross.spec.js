/* eslint-env mocha */
/* eslint-disable
  no-unused-expressions,
  react/jsx-filename-extension,
  import/no-extraneous-dependencies
*/

import React from 'react'
import { mount } from 'enzyme'
import blanket from 'blanket' // eslint-disable-line
import ErrorCross from './ErrorCross'

const mountWithProps = (props = {}) => mount(<ErrorCross {...props} />)

describe('ErrorCross', () => {
  it('should have error message in title', () => {
    const errorMessage = 'fake-message'
    const mounted = mountWithProps({ message: errorMessage })
    const div = mounted.find('div')

    div.prop('title').should.equal(errorMessage)
  })

  it('should provide a default message', () => {
    const mounted = mountWithProps()
    const div = mounted.find('div')

    div.prop('title').should.have.length.above(0)
  })
})
