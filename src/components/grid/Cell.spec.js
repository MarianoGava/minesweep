import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { GiLandMine } from 'react-icons/gi';

import Cell from './Cell';

describe('Cell', () => {
  const store = configureStore()({
    gridData: {
      grid: [
        [
          {
            indexI: 0,
            indexJ: 0,
            hasBomb: false,
            hasFlag: true,
            wasClicked: false,
          },
        ],
      ],
    },
  });
  it('should be a mountable component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Cell indexI={0} indexJ={0} handleRightClick={jest.fn()} handleClick={jest.fn()} />
      </Provider>
    );
    expect(wrapper.dive().find(Cell).length).toBe(1);
  });

  it('should fire the onclick action when the component is clicked', () => {
    const onClick = jest.fn();
    const handleRightClick = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <Cell indexI={0} indexJ={0} handleRightClick={handleRightClick} handleClick={onClick} />
      </Provider>
    );

    wrapper.find(Cell).simulate('click');
    expect(onClick).toHaveBeenCalled();
    wrapper.find(Cell).simulate('contextmenu');
    expect(handleRightClick).toHaveBeenCalled();
  });

  it('should display a mine icon if the cell has flag property in true and was not clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Cell indexI={0} indexJ={0} handleRightClick={jest.fn()} handleClick={jest.fn()} />
      </Provider>
    );
    expect(
      wrapper
        .find(Cell)
        .children()
        .contains(<GiLandMine />)
    ).toBe(true);
  });

  it('should display a mine icon if the cell has flag property in true and was not clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Cell indexI={0} indexJ={0} handleRightClick={jest.fn()} handleClick={jest.fn()} />
      </Provider>
    );
    expect(
      wrapper
        .find(Cell)
        .children()
        .contains(<GiLandMine />)
    ).toBe(true);
  });
});
