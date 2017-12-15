import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Filter from '../Filter';

describe('Filter', () => {
  const setup = (props = {}) => {
    configure({ adapter: new Adapter() });

    const component = <Filter {...props} />;

    const enzymeWrapper = shallow(component);

    return {
      props,
      enzymeWrapper,
    };
  };

  it('should render self', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      onChange,
    });

    expect(enzymeWrapper.find('.TMFilter')).toHaveLength(1);
  });

  it('getValueColor works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper } = setup({
      onChange,
    });

    expect(enzymeWrapper.instance().getValueColor(0)).toBe('#d84315');
    expect(enzymeWrapper.instance().getValueColor(49)).toBe('#ffb302');
    expect(enzymeWrapper.instance().getValueColor(74)).toBe('#2196f3');
    expect(enzymeWrapper.instance().getValueColor(75)).toBe('#1ab744');
  });

  it('handleMinChange works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper, props } = setup({
      onChange,
    });

    enzymeWrapper.instance().handleMinChange({ target: { value: 11 } });

    expect(props.onChange).toHaveBeenCalledWith({ min: 11, max: 100 });
  });

  it('handleMaxChange works correctly', () => {
    const onChange = jest.fn();

    const { enzymeWrapper, props } = setup({
      onChange,
    });

    enzymeWrapper.instance().handleMaxChange({ target: { value: 90 } });

    expect(props.onChange).toHaveBeenCalledWith({ min: 0, max: 90 });
  });
});
