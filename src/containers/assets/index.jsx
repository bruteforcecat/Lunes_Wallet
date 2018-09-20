import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadWalletInfo } from "../skeleton/redux/skeletonAction";
import { setAssetLoading, getAssetGeneralInfo } from "./redux/assetsAction";

// COMPONENTS
import CoinsBar from "./coinsBar";
import CoinsInfo from "./coinsInfo";
import TransactionHistory from "./transactionHistory";
import Loading from "../../components/loading";

class Assets extends React.Component {
  componentDidMount() {
    let { getAssetGeneralInfo } = this.props;
    // setAssetLoading(true);
    getAssetGeneralInfo();
  }

  renderContent = () => {
    let { loading } = this.props.assets;
    if (loading) {
      return (
        <div>
          <Loading color="wallet" height="80vh" width="100px" />
        </div>
      );
    }

    return (
      <div>
        <CoinsBar />
        <div>
          <CoinsInfo />
          <TransactionHistory />
        </div>
      </div>
    );
  };

  render() {
    return this.renderContent();
  }
}

Assets.propTypes = {
  user: PropTypes.object,
  assets: PropTypes.object,
  loadWalletInfo: PropTypes.func,
  setAssetLoading: PropTypes.func,
  getAssetGeneralInfo: PropTypes.func
};

const mapSateToProps = store => ({
  user: store.user.user,
  assets: store.assets
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadWalletInfo,
      setAssetLoading,
      getAssetGeneralInfo
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Assets);
