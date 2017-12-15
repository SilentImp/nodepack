import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchField from '../SearchField';

describe('SearchField mount', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });

    const component = <SearchField {...props} />;

    const enzymeWrapper = mount(component);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    expect(enzymeWrapper.find('.TMLibrarySearchField')).toHaveLength(1);
  });
});

describe('SearchField', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });

    const component = <SearchField {...props} />;

    const enzymeWrapper = shallow(component);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    expect(enzymeWrapper.find('.TMLibrarySearchField')).toHaveLength(1);
  });

  it('handleFocusInput works correctly', () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();

    const { enzymeWrapper, props } = setup({
      tags: [{ value: 'test', id: 'test' }],
      onChange,
      onFocus,
    });

    enzymeWrapper.instance().handleFocusInput();

    expect(enzymeWrapper.state().isFocused).toBe(true);
    expect(enzymeWrapper.state().value).toBe('test, ');
    expect(props.onFocus).toHaveBeenCalled();
  });

  it('handleFocusInput works correctly with empty tags', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().handleFocusInput();

    expect(enzymeWrapper.state().isFocused).toBe(true);
    expect(enzymeWrapper.state().value).toBe('');
  });

  it('handleBlurInput works correctly', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();

    const { enzymeWrapper, props } = setup({
      tags: [],
      onChange,
      onBlur,
    });

    enzymeWrapper.instance().handleBlurInput();

    expect(enzymeWrapper.state().isFocused).toBe(false);
    expect(enzymeWrapper.state().value).toBe('');
    expect(props.onBlur).toHaveBeenCalled();
  });

  it('handleBlurInput works correctly without onBlur props', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().handleBlurInput();

    expect(enzymeWrapper.state().isFocused).toBe(false);
    expect(enzymeWrapper.state().value).toBe('');
  });

  it('handleKeyDown works correctly when press enter', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().createTag = jest.fn();

    enzymeWrapper.instance().handleKeyDown({ keyCode: 13, preventDefault: jest.fn() });

    expect(enzymeWrapper.instance().createTag).toHaveBeenCalled();
  });

  it('handleKeyDown works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().createTag = jest.fn();

    enzymeWrapper.instance().handleKeyDown({ keyCode: 11, preventDefault: jest.fn() });

    expect(enzymeWrapper.instance().createTag).toHaveBeenCalledTimes(0);
  });

  it('handleChangeInput works correctly with empty value', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    expect(enzymeWrapper.instance().handleChangeInput({ target: { value: ' ' } })).toBe(null);
  });

  it('handleChangeInput works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().handleChangeInput({ target: { value: 'test' } });

    expect(enzymeWrapper.state().value).toBe('test');
  });

  it('handleClickContainer works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    const inputFocus = jest.fn();

    enzymeWrapper.instance().input = { focus: inputFocus };

    enzymeWrapper.instance().handleClickContainer({ target: { dataset: { click: 'focus' } } });

    expect(inputFocus).toHaveBeenCalled();
  });

  it('handleClickContainer works correctly when event hasnt dataset focus', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    const inputFocus = jest.fn();

    enzymeWrapper.instance().input = { focus: inputFocus };

    enzymeWrapper.instance().handleClickContainer({
      target: {
        dataset: {
          click: 'test',
        },
      },
    });

    expect(inputFocus).toHaveBeenCalledTimes(0);
  });

  it('handleClickContainer works correctly when focused', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    const inputFocus = jest.fn();

    enzymeWrapper.instance().input = { focus: inputFocus };
    enzymeWrapper.setState({ isFocused: true });

    enzymeWrapper.instance().handleClickContainer({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });

    expect(inputFocus).toHaveBeenCalledTimes(0);
  });

  it('handleClickTag works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper, props } = setup({
      tags: [{ value: 'test', id: '1' }, { value: 'test', id: '2' }],
      onChange,
    });

    enzymeWrapper.instance().handleClickTag('2');

    expect(props.onChange).toHaveBeenCalledWith([{ value: 'test', id: '1' }]);
  });

  it('handleButtonClick works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [{ value: 'test', id: '1' }, { value: 'test', id: '2' }],
      onChange,
    });

    enzymeWrapper.instance().createTag = jest.fn();

    enzymeWrapper.setState({ value: 'test' });

    enzymeWrapper.instance().handleButtonClick();

    expect(enzymeWrapper.instance().createTag).toHaveBeenCalled();
  });

  it('handleButtonClick works correctly when value is empty', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().createTag = jest.fn();

    enzymeWrapper.instance().handleButtonClick();

    expect(enzymeWrapper.instance().createTag).toHaveBeenCalledTimes(0);
  });

  it('createTag works correctly', () => {
    const onChange = jest.fn(() => Promise.resolve());

    const { enzymeWrapper, props } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().handleBlurInput = jest.fn();

    enzymeWrapper.setState({ value: 'test' });

    enzymeWrapper.instance().createTag();

    expect(props.onChange).toHaveBeenCalledWith([{ value: 'test', id: 'tag0' }]);
  });

  it('removeTags works correctly', () => {
    const onChange = jest.fn(() => Promise.resolve());

    const { enzymeWrapper, props } = setup({
      tags: [],
      onChange,
    });

    enzymeWrapper.instance().removeTags();

    expect(enzymeWrapper.state().value).toBe('');
    expect(props.onChange).toHaveBeenCalledWith([]);
  });

  it('placeholder shows correctly', () => {
    const onChange = jest.fn(() => Promise.resolve());

    const { enzymeWrapper } = setup({
      tags: [],
      placeholder: 'test',
      onChange,
    });

    expect(enzymeWrapper.find('.TMLibrarySearchField__placeholder')).toHaveLength(1);
  });

  it('placeholder for not empty tags shows correctly', () => {
    const onChange = jest.fn(() => Promise.resolve());

    const { enzymeWrapper } = setup({
      tags: [{ value: 'test', id: '1' }],
      placeholderForTags: 'test',
      onChange,
    });

    expect(enzymeWrapper.find('.TMLibrarySearchField__placeholderContinue')).toHaveLength(1);
  });
});
