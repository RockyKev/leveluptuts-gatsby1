import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import { Spring } from "react-spring";

import Header from "./header";
import Archive from "./archive";
import "./layout.css";

const MainLayout = styled.main`
  max-width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`;

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(relativePath: { regex: "/bg/" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            # src
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />

      <Spring from={{ height: 100 }} to={{ height: 200 }}>
        {styles => (
          <div style={{ overflow: "hidden", ...styles }}>
            <Img fluid={data.file.childImageSharp.fluid} />
          </div>
        )}
      </Spring>
      {/* {location.pathname === "/" && (
        <Img fluid={data.file.childImageSharp.fluid} />
      )} */}

      <div>
        <MainLayout>
          <div>{children}</div>

          <Archive />
        </MainLayout>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
