import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Filter.pcss';

class Filter extends Component {
  static propTypes = {
    className: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
    min: 0,
    max: 100,
    value: {
      min: 0,
      max: 100,
    },
  };

  getValueColor = (value) => {
    if (value <= 24) {
      return '#d84315';
    } else if (value <= 49) {
      return '#ffb302';
    } else if (value <= 74) {
      return '#2196f3';
    }

    return '#1ab744';
  };

  getRangeLengthInPoints = () => {
    const {
      max,
      min,
    } = this.props;

    return max - min;
  }

  getValuePointsCount = (value) => {
    const { min } = this.props;

    return value - min;
  }

  handleMinChange = (event) => {
    this.props.onChange({
      min: parseInt(event.target.value, 10),
      max: Math.min(this.props.max, this.props.value.max),
    });
  };

  handleMaxChange = (event) => {
    this.props.onChange({
      min: Math.max(this.props.min, this.props.value.min),
      max: parseInt(event.target.value, 10),
    });
  };

  render() {
    const {
      min,
      max,
      value,
      className,
      onChange,
      ...props
    } = this.props;

    const valueMin = Math.max(min, value.min);
    const valueMax = Math.min(max, value.max);

    const middle = (valueMax - valueMin) / 2;
    const minMax = Math.floor(valueMin + middle);
    const maxMin = Math.ceil(valueMax - middle);
    const minWidth = minMax;
    const maxWidth = 100 - minMax;

    const rangeLength = this.getRangeLengthInPoints();

    const valueMinPointsCount = this.getValuePointsCount(valueMin);
    const valueMaxPointsCount = this.getValuePointsCount(valueMax);

    const valueMinRangeLengthPart = 100 * (valueMinPointsCount / rangeLength);
    const valueMaxRangeLengthPart = 100 * (valueMaxPointsCount / rangeLength);

    const minLeftPos = Math.max(valueMinRangeLengthPart, 0);
    const maxRightPos = Math.min(valueMaxRangeLengthPart, 100);

    return (
      <span className={`
        ${styles.TMFilter}
        ${className || ''}
      `}>
        <input
          className={`
            ${styles.TMFilter__input}
            ${styles['TMFilter__input--type--min']}
          `}
          type="range"
          min={min}
          max={minMax}
          value={valueMin}
          onChange={this.handleMinChange}
          style={{
            width: `${minWidth}%`,
          }}
          {...props}
        />

        <input
          className={`
            ${styles.TMFilter__input}
            ${styles['TMFilter__input--type--max']}
          `}
          type="range"
          min={maxMin}
          max={max}
          value={valueMax}
          onChange={this.handleMaxChange}
          style={{
            width: `${maxWidth}%`,
          }}
          {...props}
        />

        <span className={styles.TMFilter__track} />

        <span
          className={styles.TMFilter__selectedRange}
          style={{
            left: `${minLeftPos}%`,
            right: `${Math.max(100 - valueMaxRangeLengthPart, 0)}%`,
          }}
        />

        <span
          className={`
            ${styles.TMFilter__value}
            ${styles['TMFilter__value--type--min']}
          `}
          style={{
            left: `${minLeftPos}%`,
            transform: `translateY(-50%) translateX(-${minLeftPos}%)`,
          }}
        >
          {valueMin}

          <span
            className={styles['TMFilter__colored-value']}
            style={{
              color: this.getValueColor(valueMin),
            }}
          >
            {valueMin}
          </span>
        </span>

        <span
          className={`
            ${styles.TMFilter__value}
            ${styles['TMFilter__value--type--max']}
          `}
          style={{
            left: `${maxRightPos}%`,
            transform: `translateY(-50%) translateX(-${maxRightPos}%)`,
          }}
        >
          {valueMax}

          <span
            className={styles['TMFilter__colored-value']}
            style={{
              color: this.getValueColor(valueMax),
            }}
          >
            {valueMax}
          </span>
        </span>
      </span>
    );
  }
}

export default withStyles(styles)(Filter);
