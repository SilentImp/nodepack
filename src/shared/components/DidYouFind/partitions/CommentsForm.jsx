import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Icon from '@plasma-platform/plasma-quark/lib/Icon';
import B2D from '@plasma-platform/plasma-quark/lib/Buttons/types/B2D';
import F4 from '@plasma-platform/plasma-quark/lib/Fields/types/F4';
import TA2 from '@plasma-platform/plasma-quark/lib/Textarea/types/TA2';

import '../icon/Experts.svg';
import '../icon/present.svg';

import styles from './CommentsForm.pcss';

class CommentsForm extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    email: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
  };

  submit = ({ name, email, description }) =>
    new Promise((resolve) => {
      const { t } = this.context;

      if (!name) {
        throw new SubmissionError({
          name: t('Please specify your name'),
          _error: 'Submit failed!',
        });
      } else if (!email) {
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
      } else if (!description) {
        throw new SubmissionError({
          description: t('Please describe your problem'),
          _error: 'Submit failed!',
        });
      } else {
        resolve();
      }
    });

  renderField = ({
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

    const { handleSubmit, invalid, submitSucceeded } = this.props;

    return (
      <div className={styles.CommentsForm}>
        <div className={styles.CommentsForm__info}>
          <Icon
            className={styles.CommentsForm__illustration}
            icon="Experts"
          />

          <h3 className={styles.CommentsForm__title}>{t('We’ll do the best to solve this problem')}</h3>

          <p className={styles.CommentsForm__descr}>{t('Just give us some details about your needs.')}</p>
        </div>

        <div
          className={`
            ${styles.CommentsForm__formWrap}
            ${submitSucceeded
            ? styles['CommentsForm__formWrap--success']
            : ''}`}
        >
          <form
            className={`
              ${styles.CommentsForm__form}
              ${invalid ? styles['CommentsForm__form--invalid'] : ''}`}
            onSubmit={handleSubmit(this.submit)}
          >
            <Field
              name="name"
              containerClassName={styles.CommentsForm__field}
              icon="user"
              placeholder={t('Enter your name')}
              component={this.renderField}
            />

            <Field
              name="email"
              containerClassName={styles.CommentsForm__field}
              icon="email"
              placeholder={t('Enter your email')}
              component={this.renderField}
            />

            <Field
              name="description"
              containerClassName={styles.CommentsForm__textarea}
              placeholder={t('Describe what feature you want to see')}
              component={this.renderDescriptionField}
            />

            <B2D
              className={styles.CommentsForm__button}
              type="submit"
            >
              <Icon
                className={styles.CommentsForm__buttonIcon}
                icon="send"
              />
              {t('Send My Opinion')}
            </B2D>
          </form>

          <div className={styles.CommentsFormSuccess}>
            <Icon
              className={styles.CommentsFormSuccess__icon}
              icon="present"
            />
            <h3 className={styles.CommentsFormSuccess__title}>{t('Thank you!')}</h3>
            <p className={styles.CommentsFormSuccess__descr}>{t('We just send you free e-Book on')}</p>
            <p className={styles.CommentsFormSuccess__email}>{this.props.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'didYouFindComment',
})(withStyles(styles)(CommentsForm));
