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
    wait = ['loaded'],
    load = undefined,
    error = ['error'],
    ErrorIndicator,
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

    isInState = (prop, propProcessor) => {
      // Prop is an array
      // Implicitly meaning that this is an array of props
      if (Array.isArray(prop)) {
        const boolProps = prop.map(p => Boolean(this.props[p]))
        return propProcessor(boolProps)
      }

      // Prop is a function
      if (isFunction(prop)) {
        return prop(this.props, this.context)
      }

      // Anything else
      return !!prop
    }

    isLoading = () => this.isInState(wait, boolProps => boolProps.includes(false))
    isInError = () => this.isInState(error, boolProps => boolProps.includes(true))

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
      if (this.isInError()) {
        return <ErrorIndicator {...this.state.props} />
      } else if (this.isLoading()) {
        return <LoadingIndicator {...this.state.props} />
      }

      return <ComposedComponent {...this.state.props} />
    }
  }
}
