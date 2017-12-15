import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { getDidYouFindDescribeForm, getDidYouFindCommentForm } from 'selectors';

import Icon from '@plasma-platform/plasma-quark/lib/Icon';

import SecondSectionForm from './partitions/DescribeForm';
import ThirdSectionForm from './partitions/CommentsForm';

import './icon/ManNormal.svg';
import './icon/ManGlad.svg';
import './icon/ManSad.svg';

import styles from './DidYouFind.pcss';

export class DidYouFind extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    describes: PropTypes.shape({
      notEnough: PropTypes.bool,
      cantFilterOrSort: PropTypes.bool,
      somethingIsBroken: PropTypes.bool,
      badQuality: PropTypes.bool,
      needConsultation: PropTypes.bool,
      addFeature: PropTypes.bool,
    }),
    email: PropTypes.string,
  };

  static defaultProps = {
    describes: {},
    email: '',
  };

  state = {
    visible: true,
    checked: null,
  };

  onRequestShow = () => {
    this.setState(() => ({
      checked: 'yes',
    }));
  };

  onRequestHide = () => {
    this.setState(() => ({
      checked: 'no',
    }));
  };

  hideDidYouFind = () => {
    this.setState(() => ({
      visible: false,
    }));
  };

  renderIllustration = (checked) => {
    if (checked === 'yes') {
      return 'ManGlad';
    } else if (checked === 'no') {
      return 'ManSad';
    }

    return 'ManNormal';
  };

  render() {
    const { t } = this.context;

    const { visible, checked } = this.state;

    const { describes, email } = this.props;

    const describesChecked = Object.keys(describes).filter(key => describes[key] === true);

    return (
      <article className={styles.DidYouFind}>
        <div className={`
          ${styles.DidYouFind__container}
          ${visible ? styles['DidYouFind__container--visible'] : ''}
        `}>
          <section className={styles.DidYouFindSection}>
            <div className={styles.DidYouFindSection__header}>
              <span className={styles.DidYouFindSection__step}>1</span>

              <h2
                className={`
                  ${styles.DidYouFindSection__title}
                  ${checked !== 'yes'
                  ? styles['DidYouFindSection__title--visible']
                  : ''}
                `}
              >
                {t('Did you find what you were looking for?')}
              </h2>

              <h2
                className={`
                  ${styles.DidYouFindSection__title}
                  ${styles['DidYouFindSection__title--success']}
                  ${checked ===
                  'yes'
                    ? styles['DidYouFindSection__title--visible']
                    : ''}
                `}
              >
                {t('We are glad to here it. Thank you!')}
              </h2>

              <button
                className={`
                  ${styles.DidYouFindSection__button}
                  ${styles['DidYouFindSection__button--yes']}
                  ${checked ===
                    'yes'
                      ? styles['DidYouFindSection__button--checked']
                      : ''}
                `}
                type="button"
                onClick={this.onRequestShow}
              >
                {t('Yes')}
              </button>

              <button
                className={`
                  ${styles.DidYouFindSection__button}
                  ${styles['DidYouFindSection__button--no']}
                  ${checked ===
                    'no'
                      ? styles['DidYouFindSection__button--checked']
                      : ''}
                  `}
                type="button"
                onClick={this.onRequestHide}
              >
                {t('No')}
              </button>
            </div>

            <button
              className={styles.DidYouFindSectionRemoveButton}
              type="button"
              onClick={this.hideDidYouFind}
            >
              <i className={styles.DidYouFindSectionRemoveButton__icon} />
            </button>
          </section>

          <section
            className={`
              ${styles.DidYouFindSection}
              ${checked === 'no' ? styles['DidYouFindSection--visible'] : ''}
            `}
          >
            <div className={styles.DidYouFindSection__header}>
              <span className={styles.DidYouFindSection__step}>2</span>

              <div className={styles.DidYouFindSection__titleWrap}>
                <p className={styles.DidYouFindSection__descr}>
                  {t('Please answer a couple of questions, help us become better and get a free e-book!')}
                </p>

                <h2 className={`
                  ${styles.DidYouFindSection__title}
                  ${styles['DidYouFindSection__title--visible']}
                `}>
                  {t('What best describes your issue?')}
                </h2>
              </div>
            </div>

            <SecondSectionForm />
          </section>

          <section
            className={`
              ${styles.DidYouFindSection}
              ${checked === 'no' && describesChecked.length > 0
                ? styles['DidYouFindSection--visible']
                : ''}
            `}
          >
            <div className={styles.DidYouFindSection__header}>
              <span className={styles.DidYouFindSection__step}>3</span>

              <h2 className={`
                ${styles.DidYouFindSection__title}
                ${styles['DidYouFindSection__title--visible']}
              `}>
                {t('Please leave some comments, help us become better')}
              </h2>
            </div>

            <ThirdSectionForm email={email} />
          </section>
        </div>

        {visible && (
          <Icon
            className={styles.DidYouFind__illustration}
            icon={this.renderIllustration(checked)}
          />
        )}

        {visible && (
          <div className={styles.DidYouFind__ovals}>
            <div className={styles.DidYouFind__oval} />
            <div className={styles.DidYouFind__oval} />
            <div className={styles.DidYouFind__oval} />
          </div>
        )}
      </article>
    );
  }
}

export default connect(state => ({
  describes: getDidYouFindDescribeForm(
    state,
    'notEnough',
    'cantFilterOrSort',
    'somethingIsBroken',
    'badQuality',
    'needConsultation',
    'addFeature',
  ),
  email: getDidYouFindCommentForm(state, 'email'),
}))(withStyles(styles)(DidYouFind));
