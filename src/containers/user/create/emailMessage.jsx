import React from "react";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// COMPONENTS
import LogoLunes from "../../../components/logoLunes";

// UTILS
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";

class EmailMessage extends React.Component {
  render() {
    setTimeout(function() {
      window.location = "https://luneswallet.app/";
    }, 6000);
    return (
      <div className={style.contNewAccount}>
        <center>
          <LogoLunes medium />
        </center>

        <div>
          <img
            src="../../../../images/icons/email/email@2x.png"
            className={style.iconEmailCreateAccount}
          />

          <div className={style.messageConfirmationRegister}>
            {i18n.t("NEW_ACCOUNT_MESSAGE_SENDED")}
          </div>

          <div className={style.arrowToLoginAlign}>
            <div className={style.arrowCircle}>
              <a href="/">
                <img src="../../../../images/icons/arrow/arrow-green-right@1x.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailMessage.propTypes = {
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(EmailMessage);
