import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

const Page = ({ title, children }) => (
  <DocumentTitle title={title}>
    {children}
  </DocumentTitle>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
