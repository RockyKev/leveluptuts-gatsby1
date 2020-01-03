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
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`;
