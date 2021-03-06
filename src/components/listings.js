import React from "react";
import { Link, StaticQuery, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

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

const Post = styled.article`
  box-shadow: 0px 3px 10px rgba(25, 17, 34, 0.05);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  a {
    color: #000;
    text-decoration: none;
  }
  p {
    font-size: 0.8rem;
  }
  h2 {
    margin-bottom: 0;
    color: green;
  }
  .read-more {
    font-family: Helvetica;
    font-size: 0.8rem;
    text-decoration: underline;
    color: purple;
  }
`;

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(edge => (
        <Post key={edge.node.frontmatter.slug}>
          <Link to={`/posts${edge.node.frontmatter.slug}`}>
            <h2> {edge.node.frontmatter.title} </h2>
          </Link>

          <p>{edge.node.frontmatter.date}</p>
          <p>
            {edge.node.excerpt}, Words: {edge.node.wordCount.words}
          </p>
          <Link
            className="read-more"
            to={`/posts${edge.node.frontmatter.slug}`}
          >
            Read More
          </Link>
        </Post>
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
