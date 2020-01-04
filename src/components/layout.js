import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
// import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";

import Header from "./header";
import Archive from "./archive";
import "./layout.css";

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
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

      <Spring
        from={{ height: location.pathname === "/" ? 100 : 500 }}
        to={{ height: location.pathname === "/" ? 500 : 100 }}
      >
        {styles => (
          <div style={{ overflow: "hidden", ...styles }}>
            <Img fluid={data.file.childImageSharp.fluid} />
          </div>
        )}
      </Spring>

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

Layout.defaultProps = {
  location: {},
};

export default Layout;
