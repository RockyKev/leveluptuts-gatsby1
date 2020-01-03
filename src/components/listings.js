import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

import Image from "../components/image";
import SEO from "../components/seo";

const LISTING_QUERY = graphql`
  query BlogPostListing {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          wordCount {
            words
          }
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(edge => (
        <article key={edge.node.frontmatter.slug}>
          <Link to={`/posts${edge.node.frontmatter.slug}`}>
            <h2> {edge.node.frontmatter.title} </h2>
          </Link>

          <p>{edge.node.frontmatter.date}</p>
          <p>
            {edge.node.excerpt}, Words: {edge.node.wordCount.words}
          </p>
          <Link to={`/posts${edge.node.frontmatter.slug}`}>Read More</Link>
        </article>
      ))
    }
  />

  // <div>
  //   <SEO title="Home" />
  //   <h1>Hi people</h1>
  //   <p>Welcome to your new Gatsby site.</p>
  //   <p>Now go build something great.</p>
  //   <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
  //     <Image />
  //   </div>
  //   <Link to="/page-2/">Go to page 2</Link>
  // </div>
);

export default Listing;
