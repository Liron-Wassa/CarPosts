import React from 'react';
import NavBar from '../../components/UI/NavBar/NavBar';

const Layout = (props) => (
    <React.Fragment>
        <header>
            <NavBar />
        </header>
        <main style={{marginTop: '60px'}}>
            {props.children}
        </main>
    </React.Fragment>
);

export default Layout;