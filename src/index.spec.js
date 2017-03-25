/* eslint-env mocha */
/* eslint-disable
  no-unused-expressions,
  react/jsx-filename-extension,
  import/no-extraneous-dependencies
*/

import React from 'react'
import { mount } from 'enzyme'
import { expect, spy } from 'chai'
import blanket from 'blanket' // eslint-disable-line
import loader from './index'
import TailSpin from './TailSpin'


const Component = () => <div />
const LoadingIndicator = () => <div />
const getWrapped = (config, props) => {
  const Container = loader(Component, config)
  return mount(<Container {...props} />)
}

const isLoading = (load, loaded, CustomLoader) => {
  // Load function is called
  // Graphic component isn't called
  // LoadingIndicator should be TailSpin
  load.should.have.been.called.once
  expect(loaded.find(Component).node).to.be.undefined
  loaded.find(CustomLoader || TailSpin).node.should.exists
}

const isLoadingCustomLoader = (load, loaded) => {
  // Load function is called
  // Graphic component isn't called
  // LoadingIndicator should be `LoadingIndicator` and not `TailSpin`
  isLoading(load, loaded, LoadingIndicator)
  expect(loaded.find(TailSpin).node).to.be.undefined
}

const isLoaded = (load, loaded, CustomLoader) => {
  // Load function is not called twice
  // Graphic component is called
  // LoadingIndicator shouldn't be printed
  load.should.have.been.called.once
  loaded.find(Component).node.should.exists
  expect(loaded.find(CustomLoader || TailSpin).node).to.be.undefined
}

const isLoadedCustomLoader = (load, loaded) => {
  // Load function is not called twice
  // Graphic component is called
  // `LoadingIndicator` shouldn't be printed
  isLoaded(load, loaded, LoadingIndicator)
  expect(loaded.find(TailSpin).node).to.be.undefined
}

const isLoadedTwice = (load, loaded) => {
  // Load function is called twice
  // Graphic is printed
  // Loader shouldn't be printed
  load.should.have.been.called.twice
  loaded.find(Component).node.should.exists
  expect(loaded.find(TailSpin).node).to.be.undefined
}

describe('react-loader', () => {
  it('should wait for a `data` props [readme]', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ print: ['data'] }, { load })

    isLoading(load, loaded)

    // Change `data` value
    loaded.setProps({ data: true })

    isLoaded(load, loaded)
  })

  it('should wait for a `loaded` props [default]', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped(undefined, { load })

    isLoading(load, loaded)

    // Change `loaded` value
    loaded.setProps({ loaded: true })

    isLoaded(load, loaded)
  })

  it('should wait for an array of props', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ print: ['prop1', 'prop2'] }, { load })

    isLoading(load, loaded)

    // Change `prop1` value
    loaded.setProps({ prop1: true })

    isLoading(load, loaded)

    // Change `prop3` value
    loaded.setProps({ prop3: true })

    isLoading(load, loaded)

    // Change `prop2` value
    loaded.setProps({ prop2: true })

    isLoaded(load, loaded)
  })

  it('should handle `print` parameter to be a function', () => {
    // Mount (false case)
    const load = spy(() => {})
    let loaded = getWrapped({ print: () => false }, { load })

    isLoading(load, loaded)

    // Mount (true case)
    loaded = getWrapped({ print: () => true }, { load })

    isLoadedTwice(load, loaded)
  })

  it('should handle `print` parameter to be a boolean', () => {
    // Mount (false case)
    const load = spy(() => {})
    const loaded = getWrapped({ print: true }, { load })

    isLoaded(load, loaded)
  })

  it('should print a different LoadingIndicator component', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ LoadingIndicator, print: ['data'] }, { load })

    isLoadingCustomLoader(load, loaded)

    // Change `data` value
    loaded.setProps({ data: true })

    isLoadedCustomLoader(load, loaded)
  })

  it('should call the `load` function parameter if present', () => {
    // Mount
    const loadProp = spy(() => {})
    const loadParam = spy(() => {})
    const loaded = getWrapped({ load: loadParam }, { load: loadProp })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    loadProp.should.have.been.called.once
    loadParam.should.have.been.called.once
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(TailSpin).node.should.exists
  })

  it('should call matching props if the load parameter is a string', () => {
    // Mount
    const loadProp = spy(() => {})
    const loadPropName = 'customLoadFunction'
    const loaded = getWrapped({ load: loadPropName }, { [loadPropName]: loadProp })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    loadProp.should.have.been.called.once
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(TailSpin).node.should.exists
  })

  it('should handle a `null` `load` props/parameter', () => {
    // Mount
    const loaded = getWrapped()

    // Graphic component isn't called
    // Dots should be printed
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(TailSpin).node.should.exists
  })
})

/* eslint-enable no-unused-expressions */
