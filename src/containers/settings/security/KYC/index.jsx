import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import FileUploadProgress from "react-fileupload-progress";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTwoFactorAuth } from "../../redux/settingsAction";
import { errorInput } from "../../../errors/redux/errorAction";

// STYLE
import style from "../../style.css";
import colors from "../../../../components/bases/colors";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

// UTILS
import i18n from "../../../../utils/i18n";

// ICONS
import Done from "@material-ui/icons/Done";

// COMPONENTS
import Loading from "../../../../components/loading";
import Select from "../../../../components/select";
import { CEP } from "../../../../components/inputMask";

const inputStyle = {
  root: {
    color: colors.messages.info,
    margin: "0",
    padding: "5px",
    width: "calc(100% - 50px)",
    "&:hover:before": {
      borderBottomColor: colors.purple.dark
    }
  },
  cssInput: {
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "17px",
    letterSpacing: "0.5px"
  },
  cssUnderline: {
    "&:before, &:after": {
      borderBottomColor: colors.purple.dark
    },
    "&:hover:not($disabled):not($error):not($focused):before": {
      borderBottomColor: `${colors.purple.dark} !important`
    }
  },
  disabled: {},
  error: {},
  focused: {},
  progressWrapper: {
    height: "5px",
    width: "50px",
    float: "left",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    borderRadius: "6px",
    WebkitBoxShadow: "inset 0 1px 2px rgba(0,0,0,.1)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,.1)"
  },
  progressBar: {
    float: "left",
    width: "0",
    height: "100%",
    fontSize: "12px",
    lineHeight: "20px",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#65e986",
    WebkitBoxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    boxShadow: "inset 0 -1px 0 rgba(0,0,0,.15)",
    WebkitTransition: "width .6s ease",
    Otransition: "width .6s ease",
    transition: "width .6s ease"
  },
  cancelButton: {
    WebkitAppearance: "none",
    padding: 0,
    cursor: "pointer",
    background: "0 0",
    border: 0,
    float: "left",
    fontSize: "21px",
    fontWeight: 700,
    lineHeight: 1,
    color: "#f05252"
  },
  sendIcon: {
    float: "left",
    backgroundColor: "transparent",
    border: 0,
    color: "red"
  },
  alignForm: {
    display: "flex",
    alignItems: "center"
  }
};
class KYC extends React.Component {
  constructor() {
    super();
    this.state = {
      enableButton: false
    };
  }

  getInput = input => {
    let { name, value } = input;

    this.setState({
      ...this.state,
      inputs: { [name]: value ? input : undefined },
      errors: undefined
    });
  };

  componentDidMount() {
    let { getTwoFactorAuth, settings, twoFactor } = this.props;
    if (!twoFactor && !settings.security.urlImage) getTwoFactorAuth();
  }

  renderTwoFactor = () => {
    let { settings, twoFactor } = this.props;
    if (twoFactor) {
      return <div>{i18n.t("SECURITY_2FA_REGISTRED")}</div>;
    }

    return (
      <Grid item xs={8} className={style.twoFactorQr}>
        <Grid item xs={3} className={style.item}>
          <Grid className={style.contentItem}>
            {settings.security.urlImage ? (
              <img width="200px" src={settings.security.urlImage} />
            ) : (
              <Loading />
            )}
          </Grid>
        </Grid>

        <Grid item xs={3} className={style.item}>
          <Grid className={style.contentItem}>
            <Grid item>1</Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  formGetter() {
    return new FormData(document.getElementById("customForm"));
  }

  enableButton = () => {
    this.setState({
      ...this.state,
      enableButton: true
    });
  };

  customFormRenderer(onSubmit) {
    const { enableButton } = this.state;
    return (
      <form id="customForm" style={inputStyle.alignForm}>
        <input
          type="file"
          name="file"
          id="inputFile"
          style={{ width: "100%" }}
          onClick={() => this.enableButton()}
        />
        {enableButton ? (
          <div>
            <button
              type="button"
              className={style.enableButtonUpload}
              onClick={onSubmit}
            >
              Upload
            </button>
          </div>
        ) : (
          <div>
            <button
              disabled
              type="button"
              className={style.disabledButtonUpload}
              onClick={onSubmit}
            >
              Upload
            </button>
          </div>
        )}
      </form>
    );
  }

  customProgressRenderer(progress, hasError, cancelHandler) {
    if (hasError || progress > -1) {
      let barStyle = Object.assign({}, inputStyle.progressBar);
      barStyle.width = progress + "%";

      let message = <span>{barStyle.width}</span>;
      if (hasError) {
        barStyle.backgroundColor = "#68f285";
        message = (
          <span style={{ color: "#f05252" }}>Failed to upload ...</span>
        );
      }
      if (progress === 100) {
        message = (
          <div
            style={{
              display: "flex",
              color: "#68f285"
            }}
          >
            <span>
              <Done />
            </span>
          </div>
        );
      }

      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button style={inputStyle.sendIcon}>
            <span>
              <img
                src="images/icons/security/anexo@1x.png"
                style={{ width: "12px" }}
              />
            </span>
          </button>
          <div style={inputStyle.progressWrapper}>
            <div style={barStyle} />
          </div>
          <button style={inputStyle.cancelButton} onClick={cancelHandler}>
            <span>&times;</span>
          </button>
          <div style={{ clear: "left" }}>{message}</div>
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={style.containerHeaderSettings}>
          <Grid item xs={12} className={style.headerSettingsDefault}>
            <Hidden smUp>
              <Grid item xs={12}>
                <h3>{i18n.t("TITLE_SECURITY_3")} </h3>
              </Grid>
            </Hidden>
            <Grid item sm={2} />

            <Grid item xs={6} sm={2}>
              <Link to="security">
                <p>{i18n.t("SECURITY_LINK_RETURN")}</p>
              </Link>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <h3>{i18n.t("TITLE_SECURITY_3")}</h3>
              </Grid>
            </Hidden>

            <Grid item xs={10} sm={6} id={"hr"}>
              <hr />
            </Grid>
          </Grid>
        </Grid>

        <div className={style.containerSecurity}>
          <Grid item xs={11} sm={8}>
            <Grid container className={style.allSecurity}>
              <Grid item xs={12} className={style.containerItems}>
                <Grid item xs={12} className={style.counterItemsKYC}>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemKYC}>
                      {"1"} <p>{i18n.t("SECURITY_ITEM_1")}</p>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemKYC}>
                      {"2"} <p> {i18n.t("SECURITY_ITEM_2")} </p>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={3} className={style.columItems}>
                    <Grid className={style.indicatorItemKYC}>
                      {"3"} <p>{i18n.t("SECURITY_ITEM_3")}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={style.containerKYC}>
                <Grid item xs={12} sm={10} className={style.wrapperKYC}>
                  <Grid container className={style.contentKYC}>
                    <Grid container className={style.boxKYC_1}>
                      <Grid item xs={12} sm={6}>
                        <Hidden smUp>
                          <div>
                            <img src="images/icons/security/anexo@1x.png" />
                          </div>
                        </Hidden>
                        <p>{i18n.t("SETTINGS_USER_ADDRESS")}</p>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Hidden xsDown>
                          <div>
                            <img src="images/icons/security/anexo@1x.png" />
                          </div>
                        </Hidden>
                        <p>{i18n.t("SETTINGS_USER_ZIP_CODE")}</p>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                          inputComponent={CEP}
                        />
                      </Grid>
                    </Grid>
                    <Grid container className={style.boxKYC_2}>
                      <Grid item xs={6}>
                        <p>{i18n.t("SETTINGS_USER_CITY")}</p>
                        <Select
                          list={1}
                          title={"Cidade"}
                          // selectItem={func()}
                          width={"calc(100% - 60px)"}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <p>{i18n.t("SETTINGS_USER_STATE")}</p>
                        <Select
                          list={1}
                          title={"Estado"}
                          // selectItem={func()}
                          width={"calc(100% - 60px)"}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} className={style.boxKYC_3}>
                      <FileUploadProgress
                        id="fileupkeyload"
                        key="ex1"
                        url="http://localhost:3000/api/upload"
                        onProgress={(e, request, progress) => {
                          console.log("progress", e, request, progress);
                        }}
                        onLoad={(e, request) => {
                          console.log("load", e, request);
                        }}
                        onError={(e, request) => {
                          console.log("error", e, request);
                        }}
                        onAbort={(e, request) => {
                          console.log("abort", e, request);
                        }}
                        formGetter={this.formGetter.bind(this)}
                        formRenderer={this.customFormRenderer.bind(this)}
                        progressRenderer={this.customProgressRenderer.bind(
                          this
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid item className={style.contentKYC_2}>
                    <Grid container className={style.boxKYC_2}>
                      <Grid item xs={12}>
                        <div>
                          <img src="images/icons/security/anexo@1x.png" />
                        </div>
                        <p> {i18n.t("SECURITY_INSERT_DOC")}</p>
                        <Input
                          classes={{
                            root: classes.root,
                            underline: classes.cssUnderline,
                            input: classes.cssInput
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item className={style.displayBox_3}>
                      <Grid item xs={12} lg={6} className={style.boxKYC_3}>
                        <p>Frente</p>
                        <FileUploadProgress
                          id="fileupload"
                          key="ex1"
                          url="http://localhost:3000/api/upload"
                          onProgress={(e, request, progress) => {
                            console.log("progress", e, request, progress);
                          }}
                          onLoad={(e, request) => {
                            console.log("load", e, request);
                          }}
                          onError={(e, request) => {
                            console.log("error", e, request);
                          }}
                          onAbort={(e, request) => {
                            console.log("abort", e, request);
                          }}
                          formGetter={this.formGetter.bind(this)}
                          formRenderer={this.customFormRenderer.bind(this)}
                          progressRenderer={this.customProgressRenderer.bind(
                            this
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6} className={style.boxKYC_3}>
                        <p>Verso</p>

                        <FileUploadProgress
                          id="fileupload"
                          key="ex1"
                          // url="http://localhost:3000/api/upload"
                          onProgress={(e, request, progress) => {
                            console.log("progress", e, request, progress);
                          }}
                          onLoad={(e, request) => {
                            console.log("load", e, request);
                          }}
                          onError={(e, request) => {
                            console.log("error", e, request);
                          }}
                          onAbort={(e, request) => {
                            console.log("abort", e, request);
                          }}
                          formGetter={this.formGetter.bind(this)}
                          formRenderer={this.customFormRenderer.bind(this)}
                          progressRenderer={this.customProgressRenderer.bind(
                            this
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <center>
                      <Grid item xs={12} sm={6}>
                        <button
                          className={style.buttonEnableSecurity}
                          onClick={() => alert("click")}
                        >
                          {i18n.t("BTN_CONFIRM")}
                        </button>
                      </Grid>
                    </center>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

KYC.propTypes = {
  twoFactor: PropTypes.bool,
  loadingSettings: PropTypes.func,
  getTwoFactorAuth: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  settings: PropTypes.object
};

const mapStateToProps = store => ({
  twoFactor: store.user.twoFactor,
  settings: store.settings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTwoFactorAuth,
      errorInput
    },
    dispatch
  );

export default compose(
  withStyles(inputStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(KYC);
