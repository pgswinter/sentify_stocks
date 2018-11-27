import React from 'react';
import Chart from "../Chart/chart.page";
import {Stocks} from "../../_container/stocks.container";

class StockChart extends React.Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    render(){
        const {_values, loading, error} = this.props.stocks;
        if(loading){
            return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
        }else{
            if(error) {
                return <div className="alert alert-danger">Error: {error.message}</div>
            }else{
                return <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-lg-7">
                            <Chart 
                                _values = {_values}
                            />
                        </div>
                        <div className="col-md-5 col-lg-5">
                            <Stocks 
                                _values = {_values}
                            />
                        </div>
                    </div>
                </div>
            }
        }
    }
}

export default StockChart