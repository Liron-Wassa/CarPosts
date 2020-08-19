import SearchBarVehicles from '../../component/SearchBarVehicles/SearchBarVehicles';
import Modal from '../../component/UI/Modal/Modal';
import Adapter from 'enzyme-adapter-react-16';
import Cars from '../../component/Cars/Cars';
import { configure, shallow } from 'enzyme';
import CarPosts from './CarPosts';
import React from 'react';

configure({ adapter: new Adapter() });

describe('<CarPosts />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<CarPosts />);
    });

    it('Should render one <Modal /> component', () => {
        expect(wrapper.find(Modal)).toHaveLength(1);
    });

    it('Should render one <Cars /> component', () => {
        expect(wrapper.find(Cars)).toHaveLength(1);
    });

    it('Should render one <SearchBarVehicles /> component', () => {
        expect(wrapper.find(SearchBarVehicles)).toHaveLength(1);
    });
});