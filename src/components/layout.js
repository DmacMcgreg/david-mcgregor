import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
//import Container from './container'
import Navigation from './navigation'
import styled from 'styled-components'

const Container = styled.div` 
  maxWidth: 1180;
  margin: '0 auto';
  padding: 20px 60px 60px 60px;
  border-radius: 40px;
  max-height: 100vh;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation />
        {children}
      </Container>
    )
  }
}

export default Template
