import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SearchField from 'components/SearchField';
import styles from './ProductsSearch.pcss';

export class ProductsSearch extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = (tags) => {
    this.props.change('tags', tags);

    const searchParams = tags.map(tag => tag.value).join(' ');
    this.props.getProducts({
      locale: 'en',
      isRefresh: true,
      searchParams,
    });
  };

  renderField = ({ input, ...props }) => (
    <SearchField
      tags={input.value || []}
      onChange={this.handleChange}
      {...props}
    />
  );

  render() {
    return (
      <form
        className={styles.ProductsSearch}
        id="search-form"
        onSubmit={this.handleSubmit}
      >
        <Field
          name="tags"
          className={styles.ProductsSearch__field}
          placeholder="Start typing platform, subject, etc."
          placeholderForTags="Continue specifine..."
          component={this.renderField}
          autoFocus
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'productsSearch',
})(withStyles(styles)(ProductsSearch));
