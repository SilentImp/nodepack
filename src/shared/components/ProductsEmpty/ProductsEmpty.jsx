import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import Icon from '@plasma-platform/plasma-quark/lib/Icon';
import B2D from '@plasma-platform/plasma-quark/lib/Buttons/types/B2D';
import F4 from '@plasma-platform/plasma-quark/lib/Fields/types/F4';
import TA2 from '@plasma-platform/plasma-quark/lib/Textarea/types/TA2';

import TAG3 from 'components/Quark-extended/tags/TAG3';

import SearchByPopular from 'components/SearchByPopular';

import './icon/NotFound.svg';
import './icon/Experts.svg';

import './monoicon/send.svg';

import styles from './ProductsEmpty.pcss';

class ProductsEmpty extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    handleClickTag: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    lastTag: PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    lastTag: null,
  };

  removeLastTag = () => {
    const { lastTag, handleClickTag } = this.props;

    handleClickTag(lastTag.id);
  };

  submit = ({ email, description }) =>
    new Promise(() => {
      const { t } = this.context;

      if (!email) {
        throw new SubmissionError({ email: t('Please enter new email'), _error: 'Submit failed!' });
      } else if (!/^[^<>]+$/gi.test(email)) {
        throw new SubmissionError({
          email: t('Please remove special symbols'),
          _error: 'Submit failed!',
        });
      } else if (!/^(.{1,64})@(\S+)\.(.{2,})/gi.test(email) || email.length > 72) {
        throw new SubmissionError({
          email: t('Please specify a valid email'),
          _error: 'Submit failed!',
        });
      }
      if (!description) {
        throw new SubmissionError({
          description: t('Please specify what you want to find'),
          _error: 'Submit failed!',
        });
      }
    });

  renderEmailField = ({
    input: { onBlur, onFocus, ...inputProps },
    meta: { touched, error },
    ...fieldProps
  }) => (
    <F4
      {...inputProps}
      {...fieldProps}
      invalid={!!touched && !!error}
      errorMessage={
        error
          ? {
            type: 'N2I',
            content: error,
          }
          : {}
      }
      focused={!!error}
    />
  );

  renderDescriptionField = ({
    input: { onBlur, onFocus, ...inputProps },
    meta: { touched, error },
    ...fieldProps
  }) => (
    <TA2
      {...inputProps}
      {...fieldProps}
      invalid={!!touched && !!error}
      errorMessage={
        error
          ? {
            type: 'N2I',
            content: error,
          }
          : {}
      }
      focused={!!error}
    />
  );

  render() {
    const { t } = this.context;

    const { lastTag, handleSubmit, invalid } = this.props;

    return (
      <article className={styles.ProductsEmpty}>
        <section className={styles.ProductsEmpty__info}>
          <Icon
            className={styles.ProductsEmpty__illustration}
            icon="NotFound"
          />

          <div className={styles.ProductsEmpty__content}>
            <h2 className={styles.ProductsEmpty__title}>
              {t('Sorry, but We didn’t find products According to Your Request')}
            </h2>

            <p className={styles.ProductsEmpty__descr}>
              {t('Try to delete the last request and we’ll find something interesting for you:')}
            </p>

            {lastTag && (
              <TAG3
                className={styles.ProductsEmpty__tag}
                key={lastTag.id}
                type="button"
                onClick={this.removeLastTag}
              >
                {lastTag.value}
              </TAG3>
            )}
          </div>
        </section>

        <div className={styles.ProductsEmptyForm}>
          <div className={styles.ProductsEmptyForm__info}>
            <h2 className={styles.ProductsEmptyForm__title}>{t('Let Our Experts Help You')}</h2>

            <Icon
              className={styles.ProductsEmptyForm__illustration}
              icon="Experts"
            />

            <p className={styles.ProductsEmptyForm__descr}>
              {t("We'll do the best to help you find the perfect template for your future website!  Just describe what exactly you are looking for?")}
            </p>
          </div>

          <form
            className={`
              {styles.ProductsEmptyForm__form}
              ${invalid
                ? styles['ProductsEmptyForm__form--invalid']
                : ''}
            `}
            onSubmit={handleSubmit(this.submit)}
          >
            <Field
              name="email"
              containerClassName={styles.ProductsEmptyForm__field}
              icon="email"
              placeholder={t('Enter your email')}
              component={this.renderEmailField}
            />

            <Field
              name="description"
              containerClassName={styles.ProductsEmptyForm__field}
              placeholder={t('Describe what exactly you are looking for')}
              component={this.renderDescriptionField}
            />

            <B2D
              className={styles.ProductsEmptyForm__button}
              type="submit"
            >
              <Icon
                className={styles.ProductsEmptyForm__buttonIcon}
                icon="send"
              />
              {t('Send Message')}
            </B2D>
          </form>
        </div>

        <SearchByPopular />
      </article>
    );
  }
}

export default reduxForm({
  form: 'productsEmpty',
})(withStyles(styles)(ProductsEmpty));
