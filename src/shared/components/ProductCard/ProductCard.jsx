import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import StarsRating from '@plasma-platform/plasma-quark/lib/StarsRating';
import B2E from '@plasma-platform/plasma-quark/lib/Buttons/types/B2E';
import B3E from '@plasma-platform/plasma-quark/lib/Buttons/types/B3E';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';

import convertor from './iconConvert';
import DefaultLoader from './partitions/DefaultLoader';

import styles from './ProductCard.pcss';

import './monoicon/like.svg';
import './monoicon/design-rating.svg';
import './monoicon/support-rating.svg';
import './monoicon/user-rating.svg';

class ProductCard extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    dqi: PropTypes.number,
    feature: PropTypes.string.isRequired,
    formFactor: PropTypes.shape({
      bigSize720: PropTypes.bool,
      bigSize960: PropTypes.bool,
      bigSize1340: PropTypes.bool,
      bigSize1520: PropTypes.bool,
      bigSize1880: PropTypes.bool,
      bigSize2480: PropTypes.bool,
    }),
    isWeblium: PropTypes.bool,
    label: PropTypes.string,
    liveDemo: PropTypes.string,
    oldPrice: PropTypes.string,
    platform: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    reviewsCount: PropTypes.number,
    reviewUrl: PropTypes.string,
    salesCount: PropTypes.number,
    sqi: PropTypes.number,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.shape({
      min720: PropTypes.string,
      min960: PropTypes.string,
      min1340: PropTypes.string,
      min1520: PropTypes.string,
      min1880: PropTypes.string,
      min2480: PropTypes.string,
    }),
    t: PropTypes.func.isRequired,
    templateUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    toggleLike: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    uqi: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    description: null,
    dqi: 0,
    formFactor: null,
    isWeblium: false,
    label: null,
    liveDemo: null,
    oldPrice: null,
    rating: 0,
    reviewsCount: 0,
    reviewUrl: null,
    salesCount: 0,
    sqi: 0,
    srcSet: null,
    templateUrl: null,
    uqi: 0,
  };

  state = {
    fullImageError: false,
    previewError: false,
    showFullImage: false,
    showPreview: false,
    showLoader: true,
  };

  defineIndexColor = (value) => {
    if (value > 0 && value < 25) {
      return 'TMLibraryProductCard__indexCount--red';
    } else if (value >= 25 && value < 50) {
      return 'TMLibraryProductCard__indexCount--yellow';
    } else if (value >= 50 && value < 75) {
      return 'TMLibraryProductCard__indexCount--blue';
    } else if (value >= 75) {
      return 'TMLibraryProductCard__indexCount--green';
    }

    return '';
  };

  handlePreviewLoad = () => {
    this.setState(() => ({
      showPreview: true,
      showLoader: false,
    }));
  };

  handlePreviewError = () => {
    this.setState(() => ({
      previewError: true,
      showLoader: false,
    }));
  };

  handleImageLoad = () => {
    this.setState(() => ({
      showFullImage: true,
      showLoader: false,
    }));
  };

  handleImageError = () => {
    this.setState(() => ({
      fullImageError: true,
      showLoader: false,
    }));
  };

  render() {
    const {
      className,
      description,
      dqi,
      feature,
      formFactor,
      isWeblium,
      label,
      liveDemo,
      oldPrice,
      platform,
      price,
      rating,
      reviewsCount,
      reviewUrl,
      salesCount,
      sqi,
      src,
      srcSet,
      t,
      templateUrl,
      title,
      toggleLike,
      type,
      uqi,
    } = this.props;

    const {
      fullImageError, previewError, showFullImage, showLoader, showPreview,
    } = this.state;

    const formFactorClass = classNames({
      [styles['TMLibraryProductCard--big-720']]: formFactor && formFactor.bigSize720,
      [styles['TMLibraryProductCard--big-960']]: formFactor && formFactor.bigSize960,
      [styles['TMLibraryProductCard--big-1340']]: formFactor && formFactor.bigSize1340,
      [styles['TMLibraryProductCard--big-1520']]: formFactor && formFactor.bigSize1520,
      [styles['TMLibraryProductCard--big-1880']]: formFactor && formFactor.bigSize1880,
      [styles['TMLibraryProductCard--big-2480']]: formFactor && formFactor.bigSize2480,
    });

    return (
      <article className={`
          ${styles.TMLibraryProductCard}
          ${formFactorClass}
          ${className}
        `}>
        {label && <div className={styles.TMLibraryProductCard__label}>{label}</div>}

        <div className={styles.TMLibraryProductCard__info}>
          <div className={styles.TMLibraryProductCard__imageContainer}>
            {(showLoader || (previewError && fullImageError)) && (
              <DefaultLoader loading={showLoader} />
            )}

            {!previewError && (
              <img
                className={`
                  ${styles.TMLibraryProductCard__preview}
                  ${!showFullImage && showPreview
                    ? styles['TMLibraryProductCard__preview--show']
                    : ''}
                `}
                src={`${src.match(/[^?]+(?=\?|$)/)[0]}?width=30&height=40`}
                alt={t('Preview')}
                onLoad={this.handlePreviewLoad}
                onError={this.handlePreviewError}
              />
            )}

            <picture className={styles.TMLibraryProductCard__picture}>
              {srcSet &&
                srcSet.min2480 && <source
                  media="(min-width: 2480px)"
                  srcSet={srcSet.min2480}
                />}

              {srcSet &&
                srcSet.min1880 && <source
                  media="(min-width: 1880px)"
                  srcSet={srcSet.min1880}
                />}

              {srcSet &&
                srcSet.min1520 && <source
                  media="(min-width: 1520px)"
                  srcSet={srcSet.min1520}
                />}

              {srcSet &&
                srcSet.min1340 && <source
                  media="(min-width: 1340px)"
                  srcSet={srcSet.min1340}
                />}

              {srcSet &&
                srcSet.min960 && <source
                  media="(min-width: 960px)"
                  srcSet={srcSet.min960}
                />}

              {srcSet &&
                srcSet.min720 && <source
                  media="(min-width: 720px)"
                  srcSet={srcSet.min720}
                />}

              <img
                className={`
                  ${styles.TMLibraryProductCard__illustration}
                  ${showFullImage
                    ? styles['TMLibraryProductCard__illustration--show']
                    : ''}
                  `}
                srcSet={src}
                alt={t('Illustration')}
                onLoad={this.handleImageLoad}
                onError={this.handleImageError}
              />
            </picture>
          </div>

          <div className={styles.TMLibraryProductCard__additionalInfo}>
            <a
              className={styles.TMLibraryProductCard__overlay}
              href={templateUrl}
              target="_blank"
            >
              {t('Details')}
            </a>

            <div className={styles.TMLibraryProductCard__indexes}>
              <p className={`
                ${styles.TMLibraryProductCard__index}
                ${styles['TMLibraryProductCard__index--design']}
              `}>
                <span className={`
                  ${styles.TMLibraryProductCard__indexCount}
                  ${this.defineIndexColor(dqi)}
                `}>
                  <Icon
                    className={styles.TMLibraryProductCard__indexIcon}
                    icon="design-rating"
                  />
                  {dqi === 0 ? '—' : dqi}
                </span>
                {t('Design')}
              </p>

              <p className={`
                ${styles.TMLibraryProductCard__index}
                ${styles['TMLibraryProductCard__index--support']}
              `}>
                <span className={`
                  ${styles.TMLibraryProductCard__indexCount}
                  ${this.defineIndexColor(sqi)}
                `}>
                  <Icon
                    className={styles.TMLibraryProductCard__indexIcon}
                    icon="support-rating"
                  />
                  {sqi === 0 ? '—' : sqi}
                </span>
                {t('Support')}
              </p>

              <p className={`
                ${styles.TMLibraryProductCard__index}
                ${styles['TMLibraryProductCard__index--user']}
              `}>
                <span className={`
                  ${styles.TMLibraryProductCard__indexCount}
                  ${this.defineIndexColor(uqi)}
                `}>
                  <Icon
                    className={styles.TMLibraryProductCard__indexIcon}
                    icon="user-rating"
                  />
                  {uqi === 0 ? '—' : uqi}
                </span>
                {t('User Rating')}
              </p>
            </div>

            <nav className={styles.TMLibraryProductCard__controls}>
              <B2E
                className={`
                  ${styles.TMLibraryProductCard__button}
                  ${styles['TMLibraryProductCard__button--liveDemo']}
                `}
                type={liveDemo && 'link'}
                href={liveDemo}
                target="_blank"
                disabled={!liveDemo}
              >
                {t('Live Demo')}
              </B2E>

              <B3E
                className={`
                  ${styles.TMLibraryProductCard__button}
                  ${styles['TMLibraryProductCard__button--details']}
                `}
                type={templateUrl && 'link'}
                href={templateUrl}
                target="_blank"
                disabled={!templateUrl}
              >
                {t('Details')}
              </B3E>
            </nav>

            <div className={styles.TMLibraryProductCard__statistics}>
              <p className={styles.TMLibraryProductCard__reviews}>
                <span className={styles.TMLibraryProductCard__reviewsCount}>{reviewsCount}</span>
                {t('Reviews')}
              </p>

              <a
                className={styles.TMLibraryProductCard__reviewsLink}
                href={reviewUrl}
                target="_blank"
              >
                <StarsRating
                  defaultRating={rating || 0}
                  value={rating}
                  noHovered
                  disabled
                />
              </a>

              <p className={styles.TMLibraryProductCard__sales}>
                <span className={styles.TMLibraryProductCard__salesCount}>{salesCount}</span>
                {t('Sales')}
              </p>
            </div>

            {description && <div className={styles.TMLibraryProductCard__description}>{description}</div>}
          </div>
        </div>

        <section className={styles.TMLibraryProductCard__details}>
          <Icon
            className={styles.TMLibraryProductCard__platform}
            icon={convertor(platform.toLowerCase())}
          />

          <header className={styles.TMLibraryProductCard__meta}>
            <h2 className={styles.TMLibraryProductCard__title}>{title}</h2>
            <p className={styles.TMLibraryProductCard__type}>
              {feature} {type}
            </p>
          </header>

          {!!oldPrice && <p className={styles.TMLibraryProductCard__oldPrice}>{oldPrice}</p>}

          <p className={styles.TMLibraryProductCard__price}>
            {price === 0 ? t('Free') : `${price}$`}
            {isWeblium ? `/${t('mo')}` : ''}
          </p>

          <Icon
            className={styles.TMLibraryProductCard__like}
            icon="like"
            onClick={toggleLike}
          />
        </section>

        <a
          className={styles.TMLibraryProductCard__overlay}
          href={templateUrl}
          target="_blank"
        >
          {t('Details')}
        </a>
      </article>
    );
  }
}

export default translate(['translation'])(withStyles(styles)(ProductCard));
