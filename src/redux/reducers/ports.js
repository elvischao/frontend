import {
  ADD_SERVER_PORTS,
  DELETE_SERVER_PORTS,
  ADD_SERVER_PORT,
  ADD_SERVER_PORT_FORWARD_RULE,
  DELETE_SERVER_PORT_FORWARD_RULE,
} from "../actionTypes";

const initialState = {
  ports: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SERVER_PORTS: {
      const ports = {};
      for (const port of action.payload) {
        ports[port.id] = port;
      }
      return {
        ...state,
        ports: ports,
      };
    }
    case DELETE_SERVER_PORTS: {
      return {
        ...state,
        ports: {}
      }
    }
    case ADD_SERVER_PORT: {
      return {
        ...state,
        ports: {
          ...state.ports,
          [action.payload.id]: action.payload,
        },
      };
    }
    case ADD_SERVER_PORT_FORWARD_RULE: {
      return {
        ...state,
        ports: {
          ...state.ports,
          [action.payload.port_id]: {
            ...state.ports[action.payload.port_id],
            forward_rule: action.payload,
          },
        },
      };
    }
    case DELETE_SERVER_PORT_FORWARD_RULE: {
        return {
          ...state,
          ports: {
            ...state.ports,
            [action.payload.port_id]: {
              ...state.ports[action.payload.port_id],
              forward_rule: null
            },
          },
        };
      }
    default:
      return state;
  }
}
