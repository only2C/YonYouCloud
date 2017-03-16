import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WelcomeActions from '../actions/welcome';

import { Link } from 'react-router';
import { Button, ButtonToolbar } from 'react-bootstrap';
import NormalWidget from './../components/NormalWidget';

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numbers: {
                total: 0,
                active: 0,
                inactive: 0,
                forbidden: 0
            }
        }
    }

    componentWillMount() {

        this.props.getUserNumbers(numbers => {
            //console.log(numbers);
            this.updateNumbers(numbers)
        });
    }

    updateNumbers = (numbers) => {
        this.setState({
            numbers: {
                total: numbers.total_user_number, //总数
                active: numbers.active_user_number + numbers.unknown_user_number, //正常
                inactive: numbers.inactive_user_number, //未激活
                forbidden: numbers.forbidden_user_number //禁用
            }
        });
    };

    render() {

        return (
            <div className="welcomeContainer">
                <NormalWidget />

            </div>
        );
    }
};

//影射Store的State到App的Props, 这里用做数据
function mapStateToProps(state) {
    return state.welcome;
}

//影射Store的dispath到App的Props,这里用做操作(事件)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(WelcomeActions, dispatch);
}

//练接是中间组件react-redux功能,用于把React的Props, State, Event和Redux的关联
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
