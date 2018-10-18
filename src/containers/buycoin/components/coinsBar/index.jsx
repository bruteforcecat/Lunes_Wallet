import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCoinsEnabled, getCoinPackage } from "../../redux/buyAction";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// MATERIAL ICONS
import {KeyboardArrowLeft, KeyboardArrowRight, ArrowDropDown, ArrowDropUp, Close} from "@material-ui/icons";

// UTILS
import i18n from "../../../../utils/i18n";
import { getDefaultFiat } from "../../../../utils/localStorage";

// STYLE
import style from "./style.css";

class CoinsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coinActive: null
    };
  }

  componentDidMount = () => {
    const {getCoinsEnabled} = this.props;
    getCoinsEnabled();
  }

  moveSlide = (direction = "next") => {
    if (direction === "prev") this.slider.slickPrev();
    else this.slider.slickNext();
  };

  setCoin = (coin, address) => {
    // fazer aqui a chamada para o servico de pegar os Pacotes disponiveis para a Moeda selecionada
    const {getCoinPackage} = this.props;

    getCoinPackage(coin);
  };

  renderArrowPercent = val => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };

  renderCoins = () => {
    const {coinsEnabled, coins} = this.props;

    let defaultCoin = getDefaultFiat();

    if(coinsEnabled.length<1)
      return;
    
    return coinsEnabled.map((val, index) => {
      let coin = coins[val.value.abbreviation];

      if (!coin) return;

      const coinPrice = coins[val.value.abbreviation].price[defaultCoin].price;
     
      return (
        <div
          className={null}
          key={index}
          onClick={() => this.setCoin(val.value.abbreviation, val.value.address)}
        >
          <div
            className={
                val === "lunes"
                ? style.boxCoinActive
                : style.boxCoin
            }
          >
            <div className={style.boxIconCoin}>
              <img
                className={style.iconCoin}
                src={"images/icons/coins/" + val.value.abbreviation + ".png"}
              />
            </div>
            <div className={style.boxLabelCoin}>
              {val.title} <br />
              {coin.price[defaultCoin].symbol + coinPrice.toFixed(3)}
            </div>
          </div>
        </div>
      );


    });
  };

  render() {
    let settings = {
      arrows: false,
      draggable: true,
      dots: false,
      infinite: false,
      speed: 200,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 959,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 599,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    };
    
    return (
      <div className={style.contentCoins}>
        <Grid container style={{ justifyContent: "center" }}>
          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label={i18n.t("TEXT_PREV")}
                onClick={() => this.moveSlide("prev")}
              >
                <KeyboardArrowLeft />
              </IconButton>
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={10}>
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.renderCoins()}
            </Slider>
          </Grid>

          <Hidden xsDown>
            <Grid item xs={1} className={style.arrowControl}>
              <IconButton
                color="inherit"
                aria-label={i18n.t("TEXT_PREV")}
                onClick={() => this.moveSlide()}
              >
                <KeyboardArrowRight />
              </IconButton>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

CoinsBar.propTypes = {
  getCoinsEnabled: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  coinsEnabled: store.buy.coins,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCoinsEnabled,
    getCoinPackage
  }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CoinsBar);