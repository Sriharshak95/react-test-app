
const initialState = {
    time:[],
    chart_data:{}
}
 
function reducer(state = initialState, action){
switch (action.type) {
    case "STORE_DATA":
      return{
        ...state,
        time:action.token
      };
    case "MARKET_VALUE":
      return{
        ...state,
        chart_data:action.token
      }
    default:
      return state;
  }
}
 
export default reducer;