import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Config from 'Config';

import Product from 'components/ProductCard';
import Benefit from 'components/Benefit';

import {
  gridScheme720,
  gridScheme960,
  gridScheme1520,
  gridScheme1880,
  gridScheme2480,
  amountCells,
  insertionPlaces,
} from './gridClassNamesSchemes';

import benefitsData from './mockBenefits';

import styles from './ProductsList.pcss';

class ProductsList extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    multiplier: PropTypes.number.isRequired,
  };

  getSrcFromScreenshots = (screenshots = [], id = 334) => {
    const thumbScreen = screenshots.find(screenshot => screenshot.scr_type_id === id);

    if (thumbScreen) {
      const { templ_id: thumbTeplateId, filename: thumbFilename } = thumbScreen;

      return `${Config.tmimgcdnURL}${Math.floor(thumbTeplateId / 100) * 100}/${thumbFilename}`;
    }

    return null;
  };

  renderBenefit = ({
    src, title, description, buttonLink, buttonName,
  }, index) => (
    <Benefit
      className={styles.ProductsList__item}
      src={src}
      title={title}
      description={description}
      buttonLink={buttonLink}
      buttonName={buttonName}
      key={index}
    />
  );

  renderProduct = (product, index) => {
    const { multiplier } = this.props;

    const {
      anchorFeature,
      anchorTitle,
      anchorType,
      designIndex,
      downloads,
      price,
      properties,
      screenshots,
      sqi,
      templateDemoMetaDescription,
      templateId,
      templatePreviewMetaDescription,
      typeShortName,
      userRating,
    } = product;

    const key720 = index % amountCells;
    const key960 = index % amountCells;
    const key1520 = index % amountCells;
    const key1880 = index % amountCells;
    const key2480 = index % amountCells;

    const bigCardClassName720 = gridScheme720[key720];
    const bigCardClassName960 = gridScheme960[key960];
    const bigCardClassName1520 = gridScheme1520[key1520];
    const bigCardClassName1880 = gridScheme1880[key1880];
    const bigCardClassName2480 = gridScheme2480[key2480];

    const productClassName = classNames({
      [styles.ProductsList__item]: true,
      [styles[`ProductsList__item${bigCardClassName720}`]]: bigCardClassName720,
      [styles[`ProductsList__item${bigCardClassName960}`]]: bigCardClassName960,
      [styles[`ProductsList__item${bigCardClassName1520}`]]: bigCardClassName1520,
      [styles[`ProductsList__item${bigCardClassName1880}`]]: bigCardClassName1880,
      [styles[`ProductsList__item${bigCardClassName2480}`]]: gridScheme2480[key2480],
    });

    const supportQualityIndex = sqi
    && !isNaN(Number(sqi)) // eslint-disable-line
    && Number(sqi) <= 100 ? Number(sqi) : 0;

    let liveDemo = properties && properties.livePreviewURL;

    const avarageRating =
      properties && properties.reviewAverageScore ? parseFloat(properties.reviewAverageScore) : 0;

    const reviewsTotal =
      properties && properties.reviewsTotal ? parseFloat(properties.reviewsTotal) : 0;

    const isWeblium = liveDemo && liveDemo.indexOf('weblium') > -1;

    if (liveDemo && !isWeblium) {
      liveDemo = `${Config.monsterURL}demo/${templateId}.html`;
    }

    const formFactor = {
      bigSize720: !!bigCardClassName720,
      bigSize960: !!bigCardClassName960,
      bigSize1340: !!bigCardClassName960,
      bigSize1520: !!bigCardClassName1520,
      bigSize1880: !!bigCardClassName1880,
      bigSize2480: !!bigCardClassName2480,
    };

    const src = this.getSrcFromScreenshots(screenshots);

    const srcSet = {
      min720: bigCardClassName720
        ? `${src}?width=${640 * multiplier}&height=${780 * multiplier}`
        : `${src}?width=${300 * multiplier}&height=${340 * multiplier}`,
      min960: bigCardClassName960
        ? `${src}?width=${575 * multiplier}&height=${690 * multiplier}`
        : `${src}?width=${265 * multiplier}&height=${295 * multiplier}`,
      min1340: bigCardClassName960
        ? `${src}?width=${760 * multiplier}&height=${930 * multiplier}`
        : `${src}?width=${340 * multiplier}&height=${395 * multiplier}`,
      min1520: bigCardClassName1520
        ? `${src}?width=${640 * multiplier}&height=${770 * multiplier}`
        : `${src}?width=${280 * multiplier}&height=${315 * multiplier}`,
      min2480: bigCardClassName2480
        ? `${src}?width=${720 * multiplier}&height=${875 * multiplier}`
        : `${src}?width=${320 * multiplier}&height=${365 * multiplier}`,
    };

    return (
      <Product
        className={productClassName}
        key={templateId}
        description={templatePreviewMetaDescription || templateDemoMetaDescription}
        dqi={designIndex ? Math.floor(parseFloat(designIndex)) : 0}
        feature={anchorFeature}
        formFactor={formFactor}
        isWeblium={isWeblium}
        liveDemo={liveDemo}
        platform={typeShortName.trim().toLowerCase()}
        price={price}
        rating={avarageRating}
        reviewsCount={reviewsTotal}
        reviewUrl={`${Config.monsterURL}templates.php?keywords=${templateId}#tab-reviews`}
        salesCount={downloads}
        sqi={supportQualityIndex}
        src={`${src}?width=680&height=845`}
        srcSet={srcSet}
        templateId={templateId}
        templateUrl={`${Config.monsterURL}templates.php?keywords=${templateId}`}
        title={anchorTitle}
        toggleLike={() => {}}
        type={anchorType}
        uqi={userRating ? Math.floor(parseFloat(userRating) * 20) : 0}
      />
    );
  };

  render() {
    let { products } = this.props;

    let insertionKey = 0;
    let listItemIndex = 0;
    const listToRender = [];

    const insertions = benefitsData;

    while (products.length > 0) {
      const product = products[0];
      products = products.slice(1);

      listItemIndex += 1;
      const key = listItemIndex % amountCells;

      if (insertionPlaces[key]) {
        const insertionIndex = insertionKey % Object.keys(insertions).length;
        insertionKey += 1;
        listItemIndex += 1;
        listToRender.push(insertions[insertionIndex]);
      }

      listToRender.push(product);
    }

    return (
      <div className={styles.ProductsList}>
        {listToRender.map((item, index) => {
          if (item.templateId) {
            return this.renderProduct(item, index);
          }

          return this.renderBenefit(item, index);
        })}
      </div>
    );
  }
}

export default withStyles(styles)(ProductsList);
