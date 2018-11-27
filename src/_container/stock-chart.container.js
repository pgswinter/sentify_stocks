import StockChart from "../_pages/StockChart/stock-chart.page"
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from "../redux/actions";

const mapStateToProps = state => ({
    stocks: state.PostsReducer.gotValues
});

const mapDispatchToProps = dispatch => (
    {
        fetchPosts: () => {
            dispatch(fetchPosts()).then((response) =>{
                !response.error ? dispatch(fetchPostsSuccess(response.payload.data)) : dispatch(fetchPostsFailure(response.payload.data))
            })
        }
    }
);

const activeStockChart = connect(mapStateToProps, mapDispatchToProps)(StockChart)

export {activeStockChart as StockChart}