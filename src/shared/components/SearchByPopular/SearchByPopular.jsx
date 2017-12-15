import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';

import Config from 'Config';

import { getPlatformTypesItems, getMainTopics } from 'selectors';

import convertor from 'components/IconsSet/iconConvert';

import styles from './SearchByPopular.pcss';

const SearchByPopular = ({ platformTypes, mainTopics }, { t }) => {
  const wordpress = platformTypes.find(item => item.id === 19);
  const website = platformTypes.find(item => item.id === 4);
  const joomla = platformTypes.find(item => item.id === 10);
  const prestaShop = platformTypes.find(item => item.id === 6);
  const magento = platformTypes.find(item => item.id === 7);
  const wooCommerce = platformTypes.find(item => item.id === 8);
  const moto = platformTypes.find(item => item.id === 81);
  const shopify = platformTypes.find(item => item.id === 16);
  const openCart = platformTypes.find(item => item.id === 9);

  const platforms = [
    wordpress,
    website,
    joomla,
    prestaShop,
    magento,
    wooCommerce,
    moto,
    shopify,
    openCart,
  ];

  const business = mainTopics.find(item => item.id === 199);
  const design = mainTopics.find(item => item.id === 68);
  const fashion = mainTopics.find(item => item.id === 348);
  const sports = mainTopics.find(item => item.id === 552);
  const estate = mainTopics.find(item => item.id === 431);
  const gifts = mainTopics.find(item => item.id === 404);
  const computers = mainTopics.find(item => item.id === 238);
  const education = mainTopics.find(item => item.id === 98);

  const topics = [business, design, fashion, sports, estate, gifts, computers, education];

  return (
    <section className={styles.SearchByPopular}>
      <div className={styles.SearchByPopular__type}>
        <h3 className={styles.SearchByPopular__title}>{t('Try to search by platform')}</h3>

        {platformTypes.length > 0 &&
          platforms.length > 0 && (
            <div className={styles.SearchByPopular__links}>
              {platforms.map((platform, index) => {
                const titleLowerCase = platform.title.toLowerCase();

                const platformURL = titleLowerCase
                  .replace(/templates|template/gi, 'templates')
                  .replace(/themes|theme/gi, 'themes')
                  .trim()
                  .replace(/\s/g, '-');

                return (
                  <a
                    className={classNames({
                      [styles.SearchByPopular__link]: true,
                      [styles['SearchByPopular__link--360']]: index < 4,
                      [styles['SearchByPopular__link--960']]: index < 5,
                      [styles['SearchByPsopular__link--1340']]: index < 6,
                      [styles['SearchByPopular__link--1520']]: index < 7,
                      [styles['SearchByPopular__link--1880']]: index < 8,
                      [styles['SearchByPopular__link--2480']]: index < 9,
                    })}
                    href={`${Config.monsterURL}${platformURL}.php`}
                    key={platform.id}
                    aria-label={platform.title}
                  >
                    <Icon
                      className={styles.SearchByPopular__icon}
                      icon={convertor(titleLowerCase)}
                    />

                    <p className={styles.SearchByPopular__name}>{platform.title}</p>
                  </a>
                );
              })}
            </div>
          )}
      </div>

      {mainTopics.length > 0 &&
        topics.length > 0 && (
          <div className={styles.SearchByPopular__type}>
            <h3 className={styles.SearchByPopular__title}>
              {t('Try to search by')}
              <a
                className={`
                  ${styles.SearchByPopular__title}
                  ${styles['SearchByPopular__title--subject']}
                `}
                href={`${Config.monsterURL}${t('category/')}`}
                aria-label={t('Category')}
              >
                {t('subject')}
              </a>
            </h3>

            <div className={styles.SearchByPopular__links}>
              {topics.map((topic, index) => {
                const convertedNameToURL = topic.name
                  .toLowerCase()
                  .replace(/& |services|templates|,/gi, '')
                  .trim()
                  .replace(/\s/g, '-');
                const topicURL = t(`category/${convertedNameToURL}`);

                return (
                  <a
                    className={classNames({
                      [styles.SearchByPopular__link]: true,
                      [styles['SearchByPopular__link--360']]: index < 3,
                      [styles['SearchByPopular__link--960']]: index < 4,
                      [styles['SearchByPopular__link--1340']]: index < 5,
                      [styles['SearchByPopular__link--1520']]: index < 6,
                      [styles['SearchByPopular__link--1880']]: index < 7,
                      [styles['SearchByPopular__link--2480']]: index < 8,
                    })}
                    href={`${Config.monsterURL}${topicURL}`}
                    key={topic.id}
                    aria-label={topic.name}
                  >
                    <img
                      className={styles.SearchByPopular__icon}
                      src={topic.icon}
                      alt={t('Topic icon')}
                    />
                    <p className={styles.SearchByPopular__name}>{topic.name}</p>
                  </a>
                );
              })}

              <a
                className={`
                  ${styles.SearchByPopular__link}
                  ${styles['SearchByPopular__link--360']}
                `}
                href={`${Config.monsterURL}${t('category/')}`}
                aria-label={t('Category')}
              >
                <div className={styles.SearchByPopular__arrow} />

                <p className={`
                  ${styles.SearchByPopular__name}
                  ${styles['SearchByPopular__name--moreSmall']}
                `}>
                  {t('13+ More')}
                </p>

                <p className={`
                  ${styles.SearchByPopular__name}
                  ${styles['SearchByPopular__name--moreBig']}
                `}>
                  {t('12+ More')}
                </p>
              </a>
            </div>
          </div>
        )}
    </section>
  );
};

SearchByPopular.contextTypes = {
  t: PropTypes.func,
};

SearchByPopular.propTypes = {
  platformTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  mainTopics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(state => ({
  platformTypes: getPlatformTypesItems(state),
  mainTopics: getMainTopics(state),
}))(withStyles(styles)(SearchByPopular));
