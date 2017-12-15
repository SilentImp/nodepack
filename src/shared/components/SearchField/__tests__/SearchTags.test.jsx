import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchTags from '../partitions/SearchTags';

describe('SearchTags mount', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });

    const component = <SearchTags {...props} />;

    const enzymeWrapper = mount(component);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('mount without exploding', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().tagsWrap = { offsetWidth: 0 };
    enzymeWrapper.instance().tagsContainer = { scrollWidth: 1 };

    expect(enzymeWrapper.find('.TMLibrarySearchFieldTags')).toHaveLength(1);
  });
});

describe('SearchTags shallow', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });

    const component = <SearchTags {...props} />;

    const enzymeWrapper = shallow(component, {
      disableLifecycleMethods: true,
    });

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [{ value: 'test', id: 'tag0' }],
      handleClickTag,
    });

    enzymeWrapper.instance().tagsWrap = { offsetWidth: 0 };
    enzymeWrapper.instance().tagsContainer = { scrollWidth: 1 };

    enzymeWrapper.instance().componentDidMount();

    expect(enzymeWrapper.find('.TMLibrarySearchFieldTags')).toHaveLength(1);
  });

  it('componentDidMount works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().tagsWrap = { offsetWidth: 0 };
    enzymeWrapper.instance().tagsContainer = { scrollWidth: 1 };
    enzymeWrapper.instance().makeTagsScrollable = jest.fn();

    enzymeWrapper.instance().componentDidMount();

    expect(enzymeWrapper.instance().makeTagsScrollable).toHaveBeenCalled();
  });

  it('componentDidUpdate works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().tagsWrap = { offsetWidth: 1 };
    enzymeWrapper.instance().tagsContainer = { scrollWidth: 0 };
    enzymeWrapper.instance().updateInitialPosition = jest.fn();
    enzymeWrapper.instance().removeScroll = jest.fn();

    enzymeWrapper.setState({ scrollable: true });

    enzymeWrapper.instance().componentDidUpdate({ tags: [{ value: 'test' }] });

    expect(enzymeWrapper.instance().updateInitialPosition).toHaveBeenCalled();
    expect(enzymeWrapper.instance().removeScroll).toHaveBeenCalled();
  });

  it('componentDidUpdate works correctly when length of tags doesnt change', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().tagsWrap = { offsetWidth: 1 };
    enzymeWrapper.instance().tagsContainer = { scrollWidth: 0 };
    enzymeWrapper.instance().updateInitialPosition = jest.fn();

    enzymeWrapper.instance().componentDidUpdate({ tags: [] });

    expect(enzymeWrapper.instance().updateInitialPosition).toHaveBeenCalledTimes(0);
  });

  it(' componentDidUpdate works correctly when dont need remove scroll', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().tagsWrap = { offsetWidth: 1 };
    enzymeWrapper.instance().tagsContainer = { scrollWidth: 0 };
    enzymeWrapper.instance().updateInitialPosition = jest.fn();
    enzymeWrapper.instance().removeScroll = jest.fn();

    enzymeWrapper.instance().componentDidUpdate({ tags: [{ value: 'test' }] });

    expect(enzymeWrapper.instance().updateInitialPosition).toHaveBeenCalled();
    expect(enzymeWrapper.instance().removeScroll).toHaveBeenCalledTimes(0);
  });

  it('updateInitialPosition works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().updateInitialPosition(10);

    expect(enzymeWrapper.state().left).toBe(10);
    expect(enzymeWrapper.state().inititialPosition).toBe(10);
  });

  it('makeTagsScrollable works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().makeTagsScrollable();

    expect(enzymeWrapper.state().scrollable).toBe(true);
  });

  it('moveToLeft works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().moveToLeft();

    expect(enzymeWrapper.state().left).toBe(0);
  });

  it('moveToRight works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.setState({ inititialPosition: 10 });

    enzymeWrapper.instance().moveToRight();

    expect(enzymeWrapper.state().left).toBe(10);
  });

  it('removeScroll works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().removeScroll();

    expect(enzymeWrapper.state().scrollable).toBe(false);
  });

  it('handleStart works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleStart(10);

    expect(enzymeWrapper.state().touchStartX).toBe(10);
    expect(enzymeWrapper.state().originalOffset).toBe(0);
    expect(enzymeWrapper.state().activeTouch).toBe(true);
  });

  it('handleMove works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.setState({ inititialPosition: -20 });

    enzymeWrapper.instance().handleMove(-10);

    expect(enzymeWrapper.state().left).toBe(-10);

    enzymeWrapper.instance().handleMove(10);

    expect(enzymeWrapper.state().left).toBe(0);

    enzymeWrapper.instance().handleMove(-30);

    expect(enzymeWrapper.state().left).toBe(-20);
  });

  it('handleEnd works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleEnd();

    expect(enzymeWrapper.state().touchStartX).toBe(0);
    expect(enzymeWrapper.state().originalOffset).toBe(0);
    expect(enzymeWrapper.state().activeTouch).toBe(false);
  });

  it('handleMouseDown works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleStart = jest.fn();
    enzymeWrapper.setState({ scrollable: true });

    enzymeWrapper.instance().handleMouseDown({ preventDefault: jest.fn(), clientX: 20 });

    expect(enzymeWrapper.instance().handleStart).toHaveBeenCalledWith(20);
  });

  it('handleMouseDown works correctly when not scrollable', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleStart = jest.fn();

    enzymeWrapper.instance().handleMouseDown({ preventDefault: jest.fn() });

    expect(enzymeWrapper.instance().handleStart).toHaveBeenCalledTimes(0);
  });

  it('handleMouseMove works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleMove = jest.fn();
    enzymeWrapper.setState({ touchStartX: 10, originalOffset: 0 });

    enzymeWrapper.instance().handleMouseMove({ clientX: 20 });

    expect(enzymeWrapper.instance().handleMove).toHaveBeenCalledWith(10);
  });

  it('handleMouseUp works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleEnd = jest.fn();
    enzymeWrapper.instance().handleMouseUp();

    expect(enzymeWrapper.instance().handleEnd).toHaveBeenCalled();
  });

  it('handleTouchStart works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleStart = jest.fn();
    enzymeWrapper.setState({ scrollable: true });

    enzymeWrapper
      .instance()
      .handleTouchStart({ preventDefault: jest.fn(), targetTouches: [{ clientX: 0 }] });

    expect(enzymeWrapper.instance().handleStart).toHaveBeenCalledWith(0);
  });

  it('handleTouchStart works correctly when not scrollable', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleStart = jest.fn();

    enzymeWrapper
      .instance()
      .handleTouchStart({ preventDefault: jest.fn(), targetTouches: [{ clientX: 0 }] });

    expect(enzymeWrapper.instance().handleStart).toHaveBeenCalledTimes(0);
  });

  it('handleTouchMove works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleMove = jest.fn();
    enzymeWrapper.setState({ touchStartX: 10, originalOffset: 0 });

    enzymeWrapper.instance().handleTouchMove({ targetTouches: [{ clientX: 20 }] });

    expect(enzymeWrapper.instance().handleMove).toHaveBeenCalledWith(10);
  });

  it('handleTouchEnd works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      handleClickTag,
    });

    enzymeWrapper.instance().handleEnd = jest.fn();
    enzymeWrapper.instance().handleTouchEnd();

    expect(enzymeWrapper.instance().handleEnd).toHaveBeenCalled();
  });

  it('click on tag works correctly', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper, props } = setup({
      tags: [{ value: 'test', id: 'tag0' }],
      handleClickTag,
    });

    enzymeWrapper.find('.TMLibrarySearchFieldTags__tag').simulate('click');

    expect(props.handleClickTag).toHaveBeenCalled();
  });

  it('show right button', () => {
    const handleClickTag = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [{ value: 'test', id: 'tag0' }],
      handleClickTag,
    });

    enzymeWrapper.setState({
      scrollable: true,
      left: 20,
      inititialPosition: 0,
    });

    expect(enzymeWrapper.find('.TMLibrarySearchFieldTags__button--right')).toHaveLength(1);
  });
});
