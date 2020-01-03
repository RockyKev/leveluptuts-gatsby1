import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Archive = () => {
  const data = useStaticQuery(graphql`
    query BlogPostArchive {
      allMarkdownRemark {
        edges {
          node {
            wordCount {
              words
            }
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <aside>
        <h3>Archive</h3>
        {data.allMarkdownRemark.edges.map(edge => (
          <li> {edge.node.frontmatter.title} </li>
        ))}
      </aside>
    </>
  )
}

export default Archive
