import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import { WOW } from 'wowjs/dist/wow';
import styled from 'styled-components'
import Img from 'gatsby-image'


const InnerContainer = styled.main`
  border-radius: 40px;
  background: #fff;
  box-shadow: 5px -5px 34px 0px rgba(16, 19, 43, 0.3), 5px -5px 37px 0px rgba(60, 97, 155, 0.3), 5px -5px 112px -6px rgba(237, 214, 196, 0.3);
  overflow: scroll;
  max-height: 100%;
  height: 100%;
  scrollbar-gutter: auto;
`

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`

const Wrapper = styled.section`
`

class RootIndex extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined') { 
      const wow = new WOW()
      wow.init()
    } 
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const logo = get(this, 'props.data.contentfulLogo.logo')
    const logos = get(this, 'props.data.contentfulLogo.logos', [])
    const backgroundImage = get(this, 'props.data.contentfulAsset.backgroundImage')

    const banner = logos.find(logo => logo.title.match(/banner/))

    return (
      <Layout location={this.props.location} >
        <BackgroundImage>
          <Img fluid={backgroundImage} />
        </BackgroundImage>
        <InnerContainer>
          <Helmet>
            <title>{siteTitle}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
          </Helmet>
          <Hero author={author.node} logo={logo} banner={banner} />
          <Wrapper>
            <h2 className="section-headline wow animated fadeInLeft">Recent articles</h2>

            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug} className="wow animated fadeInUp">
                    <ArticlePreview  article={node} />
                  </li>
                )
              })}
            </ul>
          </Wrapper>
        </InnerContainer>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, cropFocus: CENTER) {
             ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    contentfulAsset(contentful_id: {eq: "7515J4ZYjKJ4djoBuNkYda"}) {
      backgroundImage: fluid(
              maxWidth: 1583,
              maxHeight: 989,
              resizingBehavior: SCALE
            ) {
              ...GatsbyContentfulFluid_tracedSVG
      }
    }
    contentfulLogo(contentful_id: {eq: "LxRxthQzpfcds0MBd4qT3"}) {
      logo: image {
        title
        fluid(
              maxWidth: 1180,
              maxHeight: 480,
              resizingBehavior: SCALE
            ) {
              ...GatsbyContentfulFluid_tracedSVG
        }
      }
      logos: images {
        title
        fluid(
              maxWidth: 935,
              maxHeight: 400,
              resizingBehavior: FILL
            ) {
              ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
    allContentfulPerson(filter: { contentful_id: { eq: "6jBoLbM9sq47jpBtClMQz" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
