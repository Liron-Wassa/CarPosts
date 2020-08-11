import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Car from './Car/Car';
import React from 'react';
import Cars from './Cars';

configure({ adapter: new Adapter() });

describe('<Cars />', () => {
    let wrapper;
    it('Should render one <Car /> component', () => {
        wrapper = shallow(<Cars isLoading={true} cars={[]} />);
        expect(wrapper.find(Car)).toHaveLength(0);
    });

    it('Should render more than one <Car /> component', () => {
        wrapper = shallow(<Cars isLoading={false} cars={[1, 2, 3, 4]} />);
        expect(wrapper.find(Car)).toHaveLength(4);
    });
});