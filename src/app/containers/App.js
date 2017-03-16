import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Top from '../components/Top';
import Footer from '../components/Footer';

//Redux去除了React的Props和State的差别,还有事件,统一都是Props,也就是Provider Store
//Store组件,给下层的App创建映射的属性
class App extends React.Component {
    render() {
        return (
            <div>
                {/**  <Top />**/}
                <div className = "portal-content">
                    {this.props.children}
                </div>
                {/** <Footer />**/}
            </div>
        );
    }
}

export default App;
