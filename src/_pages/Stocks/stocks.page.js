import React from 'react';
import renderField from '../../_component/renderField';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { createPost, createPostSuccess, createPostFailure } from "../../redux/actions";

class Stocks extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            targetInput:{
                inputName: "close_price",
                value: [
                    (new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()).toString(),
                    "",
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    "",
                    0,
                    0,
                    0,
                    0
                ]
            } 
        }
        this.changeValueInput = this.changeValueInput.bind(this);
    }

    exportStockValues(data){
        return data.slice(-1);
    }

    changeValueInput(e){
        const changeValue = Object.assign({},this.state);
        if(changeValue.targetInput.inputName === e.target.name){
            changeValue.targetInput.value[1] = e.target.value;
            changeValue.targetInput.value[8] = e.target.value;
        }
        this.setState(changeValue);
    }

    createPost(values, dispatch){
        return dispatch(createPost(values))
            .then(result => {
            // Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(createPostFailure(result.payload.response.data));
            throw new SubmissionError(result.payload.response.data);
            }
            //let other components know that everything is fine by updating the redux` state
            dispatch(createPostSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
        });
    }

    renderError(newPost) {
        if (newPost && newPost.error && newPost.error.message) {
          return (
            <div className="alert alert-danger">
              { newPost ? newPost.error.message : '' }
            </div>
            );
        } else {
          return <span></span>
        }
    }
    render(){
        const closePrice = this.exportStockValues(this.props._values.dataset.data);
        const tickerSymbol = this.props._values.dataset.dataset_code;
        const {handleSubmit, submitting, newPost} = this.props;
        return <div className="stocks">
            <h2>Ticker Symbol: {tickerSymbol}</h2>
            <h3>Close Price: {closePrice[0][1]}</h3>
            <div className="add-close-price">
                { this.renderError(newPost) }
                <form onSubmit={ handleSubmit(createPost) }>
                    <i
                        className="fa fa-paper-plane material-icons waves-effect waves-light blue-grey-text darken-1 prefix"
                        aria-hidden="true"
                    />
                    <Field
                        name="close_price"
                        type="text"
                        component={ renderField }
                        label="Close Price*" />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onSubmit={submitting}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    }
}

export default reduxForm({
    form: 'Stocks', // a unique identifier for this form
})(Stocks)