import React, { Component } from "react";
import Layout from "./layout";
import { graphql } from "gatsby";

// For static Query
// Used anywhere, doesn't accept variables. Can't use context.

// Page query.
// Must be used on pages.

export default class postLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data;

    return (
      <Layout>
        <h1> {markdownRemark.frontmatter.title} </h1>
      </Layout>
    );
  }
}

export const query = graphql`
  query PostQuery {
    markdownRemark(frontmatter: { slug: { eq: "/third-post" } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`;
