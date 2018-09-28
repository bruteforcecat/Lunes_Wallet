import React from "react";
import PropTypes from "prop-types";

// REDUX
// import { connect } from "react-redux";

// COMPONENTS
import NotificationList from "./list";

// STYLE
import { Grid } from "@material-ui/core";
import style from "./style.css";

class Notification extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <NotificationList />
      </Grid>
    );
  }
}

Notification.propTypes = {

}

export default Notification;