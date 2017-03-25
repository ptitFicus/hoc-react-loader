import React, { Component, PropTypes } from 'react'

const getTypeOf = (something) => {
  const getType = {}
  return something && getType.toString.call(something)
}

// http://stackoverflow.com/a/7356528
const isFunction = (functionToCheck) => {
  const type = getTypeOf(functionToCheck)
  return type && type === '[object Function]'
}

const isString = (stringToCheck) => {
  const type = getTypeOf(stringToCheck)
  return type && type === '[object String]'
}

const getDisplayName = (c) => c.displayName || c.name || 'Component'

export default (
  ComposedComponent,
  {
    LoadingIndicator,
    print = ['loaded'],
    load = undefined,
  } = {},
) => {
  const loadFunctionName = isString(load) ? load : 'load'

  return class extends Component {
    static displayName = `Loader(${getDisplayName(ComposedComponent)})`
    static propTypes = {
      load: PropTypes.func,
    }

    state = {
      props: {},
    }

    isLoaded = () => {
      // Print is an array
      // Implicitly meaning that this is an array of props
      if (Array.isArray(print)) {
        return print
          .map(p => Boolean(this.props[p]))
          .reduce((allProps, currentProp) => allProps && currentProp)
      }

      // Print is a function
      if (isFunction(print)) {
        return print(this.props, this.context)
      }

      // Anything else
      return print
    }

    omitLoadInProps = (props) => {
      const isLoadAFunction = isFunction(props[loadFunctionName])

      if (isLoadAFunction) {
        this.setState({
          props: {
            ...props,
            [loadFunctionName]: undefined,
          },
        })
      } else {
        this.setState({ props })
      }

      return isLoadAFunction
    }

    componentWillMount() {
      // Load from hoc argument
      if (isFunction(load)) {
        load()
      }

      // Load from props
      if (this.omitLoadInProps(this.props)) {
        this.props[loadFunctionName]()
      }
    }

    componentWillReceiveProps = (nextProps) => {
      this.omitLoadInProps(nextProps)
    }

    render() {
      if (!this.isLoaded()) {
        return <LoadingIndicator {...this.state.props} />
      }

      return <ComposedComponent {...this.state.props} />
    }
  }
}
