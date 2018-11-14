const initialState = {
  chat: {
    iduser: null
  },
  chatOpened: false,
  loading: false,
  modalStep: 1,
  modalOpen: false,
  buy: {
    availableCoinsToBuy: [
      { title: 'LUNES', img: 'images/icons/coins/lunes.png' },
      { title: 'BTC', img: 'images/icons/coins/btc.png' },
      { title: 'DASH', img: 'images/icons/coins/dash.png' }
    ],
    coinToBuy: {
      title: 'Lunes',
      img: "images/icons/coins/lunes.png"
    },
    paymentMethods: [],
    paymentMethod: undefined
  }
};

const p2p = (state = initialState, action) => {
  switch (action.type) {
    case "SETTER":
      return {
        ...state,
        ...action.data
      }
    case "BUY_SETTER":
      return {
        ...state,
        buy: {
          ...state.buy,
          ...action.data
        }
      }
    case "OPEN_CHAT_P2P_REDUCER":
      return {
        ...state,
        chatOpened: true,
        chat: {
          ...state.chat,
          iduser: action.iduser
        }
      };

    case "CLOSE_CHAT_P2P_REDUCER":
      return {
        ...state,
        chatOpened: false,
      }

    case "SET_MODAL_FLOW_STEP_REDUCER":
      return {
        ...state,
        modalStep: action.step
      };

    case "SET_MODAL_OPEN_REDUCER":
      return {
        ...state,
        modalOpen: action.open
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default p2p;
