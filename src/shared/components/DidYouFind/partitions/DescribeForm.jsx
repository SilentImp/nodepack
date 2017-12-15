import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import C1 from '@plasma-platform/plasma-quark/lib/Checkbox/types/C1';

import styles from './DescribeForm.pcss';

class DescribeForm extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  renderCheckbox = ({ input, label, ...fieldProps }) => (
    <C1
      {...input}
      {...fieldProps}
    >
      {label}
    </C1>
  );

  render() {
    const { t } = this.context;

    const { handleSubmit } = this.props;

    return (
      <form
        className={styles.DescribeForm}
        onSubmit={handleSubmit}
      >
        <Field
          className={styles.DescribeForm__checkbox}
          name="notEnough"
          type="checkbox"
          id="NotEnoughSearchResults"
          label={t('Not enough search results')}
          component={this.renderCheckbox}
        />

        <Field
          className={styles.DescribeForm__checkbox}
          name="cantFilterOrSort"
          type="checkbox"
          id="ICantFilterOrSortMySearch"
          label={t(`I can\'t filter or sort my search`)}
          component={this.renderCheckbox}
        />

        <Field
          className={styles.DescribeForm__checkbox}
          name="somethingIsBroken"
          type="checkbox"
          id="SomethingIsBroken"
          label={t('Something is broken')}
          component={this.renderCheckbox}
        />

        <Field
          className={styles.DescribeForm__checkbox}
          name="badQuality"
          type="checkbox"
          id="BadQualityOfTheProducts"
          label={t('Bad quality of the products')}
          component={this.renderCheckbox}
        />

        <Field
          className={styles.DescribeForm__checkbox}
          name="needConsultation"
          type="checkbox"
          id="INeedAnExpertsConsultation"
          label={t(`I need an expert\'s consultation`)}
          component={this.renderCheckbox}
        />

        <Field
          className={styles.DescribeForm__checkbox}
          name="addFeature"
          type="checkbox"
          id="CouldYouAddAFeature?"
          label={t('Could you add a feature?')}
          component={this.renderCheckbox}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'didYouFindDescribe',
})(withStyles(styles)(DescribeForm));
