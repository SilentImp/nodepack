import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from '../App';

const setup = props => {
  configure({ adapter: new Adapter() });

  const component = <App {...props} />;

  const enzymeWrapper = shallow(component);

  return {
    props,
    enzymeWrapper,
  };
};

describe('App component', () => {
  it('should render self and children', () => {
    const { enzymeWrapper } = setup({
      children: 'Children',
      i18n: {
        changeLanguage: jest.fn(),
      },
      t: text => text,
    });

    expect(enzymeWrapper.instance().props.children).toBe('Children');
  });
  it('onRequestChangeAppLocale should call i18n.changeLanguage prop', () => {
    const { enzymeWrapper, props } = setup({
      children: 'Children',
      i18n: {
        changeLanguage: jest.fn(),
      },
      t: text => text,
    });

    enzymeWrapper.instance().onRequestChangeAppLocale();
    expect(props.i18n.changeLanguage).toHaveBeenCalledWith('en');

    enzymeWrapper.instance().onRequestChangeAppLocale('ua');
    expect(props.i18n.changeLanguage).toHaveBeenLastCalledWith('ua');
  });
});
