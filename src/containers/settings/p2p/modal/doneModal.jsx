import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setModalStep } from "../../../p2p/redux/p2pAction";

// STYLE
import style from "./style.css";

class DoneModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/confirm/confirm.png"}
          className={style.iconInfor}
        />
        <div className={style.totalConfirm}>
          <span>{"Você acabou de debitar um boleto"}</span>
          <span>{"no valor de R$ 30,00 em sua Wallet Lunes"}</span>
        </div>

        <div className={style.confirmFee}>
          <div>
            {
              "Você pode visualizar a transação em sua aba “Históricos” desse boleto."
            }
          </div>
        </div>
      </div>
    );
  }
}
DoneModal.propTypes = {
  setModalStep: PropTypes.func.isRequired
};
const mapStateToProps = store => ({
  modalStep: store.p2p.modalStep
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoneModal);
