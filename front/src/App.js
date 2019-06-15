import React, {Component} from 'react';
import Layout from "./components/layout";
import {connect} from "react-redux";
import {fetchAccounts} from "./store/actions/zoomActions";
import Spinner from "./components/UI/Spinner/Spinner";
import FourZeroFour from "components/UI/404/FourZeroFour";

class App extends Component {
    componentDidMount() {
        this.props.fetchAccounts();
    };

    render() {

        if (this.props.accountLoading) {
            return <Spinner/>
        }

        if (this.props.zoomError) {
            return <FourZeroFour message={this.props.zoomError} />
        }

        return (
            <Layout
                accounts = { this.props.accounts }
            />
        );
    }
}

const mapStateToProps = state => ({
    accounts: state.zoom.accounts,
    accountLoading: state.zoom.accountLoading,
    zoomError: state.zoom.error
});

const mapDispatchToProps = dispatch => ({
    fetchAccounts: () => dispatch(fetchAccounts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);