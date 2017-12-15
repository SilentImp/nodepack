import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Icon from '@plasma-platform/plasma-quark/lib/Icon';
import B3N from '@plasma-platform/plasma-quark/lib/Buttons/types/B3N';

import SearchTags from './partitions/SearchTags';

import './monoicon/search.svg';

import styles from './SearchField.pcss';

class SearchField extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderForTags: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    autoFocus: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    placeholder: null,
    placeholderForTags: null,
    tags: [],
    autoFocus: false,
    onBlur: null,
    onFocus: null,
  };

  constructor(props) {
    super(props);

    this.handleBlurInput = ::this.handleBlurInput;
    this.createTag = ::this.createTag;
  }

  state = {
    value: '',
    isFocused: false,
  };

  handleFocusInput = () => {
    const tagsToString = this.props.tags.map(tag => tag.value).join(', ');
    const value = tagsToString.length > 0 ? `${tagsToString}, ` : '';
    this.setState({
      isFocused: true,
      value,
    });

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  async handleBlurInput() {
    if (this.state.value.length > 0) {
      await this.createTag();
    }

    this.setState({
      isFocused: false,
      value: '',
    });

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.createTag();
    }
  };

  handleChangeInput = (event) => {
    const {
      target: {
        value,
      },
    } = event;

    if (value.length === 1 && value === ' ') return null;

    return this.setState({ value });
  };

  handleClickContainer = (event) => {
    if (this.state.isFocused) {
      event.preventDefault();
      event.stopPropagation();
    } else if (event.target.dataset.click === 'focus') {
      this.input.focus();
    }
  };

  handleContainerKeyUp = (event) => {
    if (event.keyCode === 13) {
      if (this.state.isFocused) {
        event.preventDefault();
        event.stopPropagation();
      } else if (event.target.dataset.click === 'focus') {
        this.input.focus();
      }
    }
  }

  handleClickTag = (id) => {
    this.props.onChange(this.props.tags.filter(tag => tag.id !== id));
  };

  handleButtonClick = () => {
    if (this.state.value.length > 0) {
      this.createTag();
    }
  };

  async createTag() {
    const values = this.state.value.split(',');

    const tags = values.reduce((items, item, index) => {
      const value = item.trim();

      if (value.length > 0) {
        return [...items, { value, id: `tag${index}` }];
      }

      return items;
    }, []);

    await this.props.onChange(tags);

    this.input.blur();
  }

  removeTags = () => {
    this.setState({
      value: '',
    });

    this.props.onChange([]);
  };

  render() {
    const { value, isFocused } = this.state;

    const {
      placeholder, placeholderForTags, className, tags, autoFocus,
    } = this.props;

    const containerClassName = classNames({
      [styles.TMLibrarySearchField]: true,
      [styles['TMLibrarySearchField--focused']]: isFocused,
      [className]: className,
    });

    return (
      <div className={styles.TMLibrarySearchField__wrap}>
        <div
          className={containerClassName}
          role="searchbox"
          onClick={this.handleClickContainer}
          tabIndex={0}
          data-click="focus"
          onKeyUp={this.handleContainerKeyUp}
        >
          <Icon
            className={styles.TMLibrarySearchField__icon}
            icon="search"
            data-click="focus"
          />

          {!isFocused &&
            tags.length > 0 && (
              <SearchTags
                className={styles.TMLibrarySearchField__innerTags}
                tags={tags}
                handleClickTag={this.handleClickTag}
              />
            )}

          {placeholder &&
            !value &&
            !tags.length && (
              <span
                className={styles.TMLibrarySearchField__placeholder}
                data-click="focus"
              >
                {placeholder}
              </span>
            )}

          {placeholderForTags &&
            !isFocused &&
            tags.length > 0 && (
              <span
                className={styles.TMLibrarySearchField__placeholderContinue}
                data-click="focus"
              >
                {placeholderForTags}
              </span>
            )}

          <input
            className={styles.TMLibrarySearchField__input}
            id="TMLibrarySearchField__input"
            type="text"
            value={value}
            ref={(el) => {
              this.input = el;
            }}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChangeInput}
            onBlur={this.handleBlurInput}
            onFocus={this.handleFocusInput}
            autoFocus={autoFocus} // eslint-disable-line
            data-click="focus"
          />

          {(value.length > 0 || tags.length > 0) && (
            <button
              className={styles.TMLibrarySearchFieldRemoveButton}
              type="button"
              onClick={this.removeTags}
            >
              <i className={styles.TMLibrarySearchFieldRemoveButton__icon} />
            </button>
          )}

          {(value.length > 0 || tags.length > 0) && (
            <B3N
              className={styles.TMLibrarySearchField__btn}
              onClick={this.handleButtonClick}
            >
              <Icon
                className={styles.TMLibrarySearchField__btnIcon}
                icon="search"
              />
            </B3N>
          )}
        </div>
        <div className={styles.TMLibrarySearchField__outerTags}>
          {!isFocused &&
            tags.length > 0 && <SearchTags
              tags={tags}
              handleClickTag={this.handleClickTag}
            />}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SearchField);
