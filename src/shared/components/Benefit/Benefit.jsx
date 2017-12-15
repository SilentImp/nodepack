import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import B3E from '@plasma-platform/plasma-quark/lib/Buttons/types/B3E';

import styles from './Benefit.pcss';

const Benefit = ({
  src, title, description, buttonLink, buttonName,
}, { t }) => (
  <article className={styles.Benefit}>
    <img
      src={src}
      className={styles.Benefit__icon}
      alt={t('Benefit icon')}
    />

    <h3 className={styles.Benefit__title}>{title}</h3>

    <p
      className={styles.Benefit__description}
      dangerouslySetInnerHTML={{ __html: description }} // eslint-disable-line react/no-danger
    />

    {buttonLink && buttonName && (
      <B3E
        className={styles.Benefit__button}
        type="link"
        href={buttonLink}
        aria-label={buttonName}
      >
        {buttonName}
      </B3E>
    )}
  </article>
);

Benefit.contextTypes = {
  t: PropTypes.func,
};

Benefit.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLink: PropTypes.string,
  buttonName: PropTypes.string,
};

Benefit.defaultProps = {
  buttonLink: null,
  buttonName: null,
};

export default withStyles(styles)(Benefit);
