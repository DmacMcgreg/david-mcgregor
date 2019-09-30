import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'
import styled from "styled-components"

const Hero = styled.div`
  position: relative;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: -50px -8px 0 -8px;
  border-radius: 40px 40px 10px 10px;
`

export default ({ author, logo, banner }) => {

  const heroImage = banner.fluid || logo.fluid

  return (
    <Hero id="Hero">
        <Img className={styles.heroImage} alt={author.name}  fluid={heroImage} />
      <div className={styles.heroDetails}>
        <h3 className={styles.heroHeadline}>{author.name}</h3>
        <p className={styles.heroTitle}>{author.title}</p>
        <p>{author.shortBio.shortBio}</p>
      </div>
    </Hero>
  
  )
}
