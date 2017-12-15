import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TAG3 from 'components/Quark-extended/tags/TAG3';

import styles from './SearchTags.pcss';

class SearchTags extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    handleClickTag: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    className: null,
  };

  state = {
    scrollable: false,
    left: 0,
    originalOffset: 0,
    inititialPosition: 0,
    activeTouch: false,
  };

  componentDidMount() {
    const tagsWrapWidth = this.tagsWrap.offsetWidth;
    const tagsContainerWidth = this.tagsContainer.scrollWidth;

    if (tagsContainerWidth > tagsWrapWidth) {
      this.makeTagsScrollable(tagsWrapWidth - tagsContainerWidth);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.tags.length < prevProps.tags.length) {
      const tagsWrapWidth = this.tagsWrap.offsetWidth;
      const tagsContainerWidth = this.tagsContainer.scrollWidth;

      this.updateInitialPosition(tagsWrapWidth - tagsContainerWidth);

      if (tagsContainerWidth <= tagsWrapWidth && this.state.scrollable) {
        this.removeScroll();
      }
    }
  }

  updateInitialPosition = (position) => {
    this.setState(() => ({
      left: position,
      inititialPosition: position,
    }));
  };

  makeTagsScrollable = (position) => {
    this.setState(() => ({
      scrollable: true,
      left: position,
      inititialPosition: position,
    }));
  };

  moveToLeft = () => {
    this.setState(() => ({ left: 0 }));
  };

  moveToRight = () => {
    this.setState(() => ({ left: this.state.inititialPosition }));
  };

  removeScroll = () => {
    this.setState(() => ({
      scrollable: false,
    }));
  };

  handleStart = (touchStartX) => {
    this.setState(() => ({
      touchStartX,
      originalOffset: this.state.left,
      activeTouch: true,
    }));
  };

  handleMove = (newPosX) => {
    let newPos = newPosX;

    if (newPos > 0) {
      newPos = 0;
    } else if (newPos < this.state.inititialPosition) {
      newPos = this.state.inititialPosition;
    }

    this.setState(() => ({
      left: newPos,
    }));
  };

  handleEnd = () => {
    this.setState(() => ({
      touchStartX: 0,
      originalOffset: 0,
      activeTouch: false,
    }));
  };

  handleMouseDown = (event) => {
    event.preventDefault();
    if (!this.state.scrollable) {
      return false;
    }

    this.handleStart(event.clientX);

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    return false;
  };

  handleMouseMove = (event) => {
    const newPosX = this.state.originalOffset + (event.clientX - this.state.touchStartX);

    this.handleMove(newPosX);
  };

  handleMouseUp = () => {
    this.handleEnd();

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  handleTouchStart = (event) => {
    event.preventDefault();
    if (!this.state.scrollable) {
      return false;
    }

    this.handleStart(event.targetTouches[0].clientX);

    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
    return false;
  };

  handleTouchMove = (event) => {
    const newPosX =
      this.state.originalOffset + (event.targetTouches[0].clientX - this.state.touchStartX);

    this.handleMove(newPosX);
  };

  handleTouchEnd = () => {
    this.handleEnd();

    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  };

  render() {
    const {
      scrollable, left, activeTouch, inititialPosition,
    } = this.state;

    const { className, tags, handleClickTag } = this.props;

    const tagsClassName = classNames({
      [styles.TMLibrarySearchFieldTags]: true,
      [styles['TMLibrarySearchFieldTags--scrollable']]: scrollable,
      [styles['TMLibrarySearchFieldTags--activeTouch']]: activeTouch,
      [styles['TMLibrarySearchFieldTags--leftPosition']]: left === 0,
      [styles['TMLibrarySearchFieldTags--rightPosition']]: left === inititialPosition,
      [className]: className,
    });

    return (
      <div className={tagsClassName}>
        {scrollable &&
          left < 0 && (
            <button
              className={`
                ${styles.TMLibrarySearchFieldTags__button}
                ${styles['TMLibrarySearchFieldTags__button--left']}
              `}
              onClick={this.moveToLeft}
            />
          )}

        <div
          className={styles.TMLibrarySearchFieldTags__wrap}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          ref={(el) => {
            this.tagsWrap = el;
          }}
          role="toolbar"
        >
          <div
            className={styles.TMLibrarySearchFieldTags__container}
            style={{ left: `${left}px` }}
            ref={(ref) => {
              this.tagsContainer = ref;
            }}
          >
            {tags.map(tag => (
              <TAG3
                className={styles.TMLibrarySearchFieldTags__tag}
                key={tag.id}
                type="button"
                onClick={() => handleClickTag(tag.id)}
              >
                {tag.value}
              </TAG3>
            ))}
          </div>
        </div>

        {scrollable &&
          left > inititialPosition && (
            <button
              className={`
                ${styles.TMLibrarySearchFieldTags__button}
                ${styles['TMLibrarySearchFieldTags__button--right']}
              `}
              onClick={this.moveToRight}
            />
          )}
      </div>
    );
  }
}

export default withStyles(styles)(SearchTags);
