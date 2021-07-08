import React, {Component} from "react";
import Greetings from "./Greetings";
import "./NameForm.css";

export default class NameForm extends Component {
    state = {
            firstName: "",
    };

    onFirstNameChange = event =>
        this.setState({
            firstName: event.target.value
        });

    buttonClicked = event =>
        alert("Be careful, "+this.state.firstName+", dont click random buttons!");

    render() {
        return (
            <div className='InputForm'>
                <input className='InputField' type="text" name="firstName" onChange={this.onFirstNameChange} />
                <button className='SubmitButton' onClick={this.buttonClicked}>SUBMIT</button>
                <Greetings firstName={this.state.firstName} />
            </div>
        )
    }
}