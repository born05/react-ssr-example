import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { TransitionGroup, Transition } from 'react-transition-group';

import { createGlobalStyle } from 'styled-components';

import Menu from './components/Menu';
import Home from './pages/Home';
import Page from './pages/Page';
import NoMatch from './pages/NoMatch';

import normalizedStyles from './styling/normalized';
import scaffoldingStyles from './styling/scaffolding';

const mapStateToProps = state => ({
  title: state.helmet.title,
});

const mapDispatchToProps = null;

const Layout = (props) => {
  const GlobalStyle = createGlobalStyle`
    ${normalizedStyles}
    /* other styles */
    ${scaffoldingStyles}
  `;

  const { title } = props;

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Helmet>

      <Menu />

      <Route
        render={({ location }) => (
          <TransitionGroup className="wrapper">
            <Transition key={location.key} timeout={300}>
              {transitionState => (
                <Switch location={location}>
                  <Route
                    render={rest => (<Home transitionState={transitionState} {...rest} />)}
                    path="/"
                    exact
                  />
                  <Route
                    render={rest => (<Page transitionState={transitionState} {...rest} />)}
                    path="/:slug"
                  />
                  <Route
                    render={rest => (<NoMatch transitionState={transitionState} {...rest} />)}
                  />
                </Switch>
              )}
            </Transition>
          </TransitionGroup>
        )}
      />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
};

const ConnectedLayout = withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
export default hot(module)(ConnectedLayout);
