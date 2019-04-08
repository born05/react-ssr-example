import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { updateTitleAction } from '../state/reducers/helmet';
import styling from '../constants/styling';
import Title from '../components/Title';

const Main = styled.main`
  background: ${styling.bodyBg};
  color: ${styling.bodyColor};
`;

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  updateTitleHandler: title => dispatch(updateTitleAction(title)),
});

class Page extends Component {
  static propTypes = {
    updateTitleHandler: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,

    title: PropTypes.string,
    body: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    body: '',
  };

  constructor(props) {
    super(props);

    if (!props.loading) {
      this.updateTitle();
    }
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.props;

    if (prevProps.loading && !loading) {
      this.updateTitle();
    }
  }

  updateTitle() {
    const {
      updateTitleHandler,
      title,
    } = this.props;

    updateTitleHandler(title);
  }

  render() {
    const {
      title,
      body,
      loading,
    } = this.props;

    return (
      <Main>
        <Title text={loading ? 'Loading' : title} />

        <p>{ body }</p>
      </Main>
    );
  }
}

const query = gql`
query PageQuery($slug: String!) {
  page(slug: $slug) {
    title
    body
  }
}
`;

const ConnectedPage = connect(mapStateToProps, mapDispatchToProps)(Page);

export default graphql(query, {
  options: (props) => {
    const {
      match,
    } = props;

    return {
      variables: {
        slug: match.params.slug,
      },
    };
  },
  props: ({ data: { loading, page } }) => ({ loading, ...page }),
})(ConnectedPage);
