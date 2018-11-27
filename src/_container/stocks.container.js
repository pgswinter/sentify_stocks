import Stocks from '../_pages/Stocks/stocks.page';
import { resetNewPost } from "../redux/actions";
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetNewPost: () => {
      dispatch(resetNewPost());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newPost: state.CreateReducer.newPost
  };
}

const activeStocks = connect(mapStateToProps, mapDispatchToProps)(Stocks)

export {activeStocks as Stocks}
// export default connect(mapStateToProps, mapDispatchToProps)(Stocks);

