import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,

    pages: PropTypes.arrayOf(PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
    })),
  };

  static defaultProps = {
    pages: [],
  };

  render() {
    const { loading, pages } = this.props;

    return (
      <nav>
        {!loading && pages.map(page => (
          <NavLink key={page.slug} to={`/${page.slug}`} exact>
            {page.title}
          </NavLink>
        ))}
      </nav>
    );
  }
}

const query = gql`
query MenuQuery {
  pages {
    slug
    title
  }
}
`;

export default graphql(query, {
  props: ({ data: { loading, pages } }) => ({ loading, pages }),
})(Menu);
