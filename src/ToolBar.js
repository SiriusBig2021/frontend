import logo from "./assets/images/logo.png";
import "./ArchiveTable.css";
import language from "./language.json";
import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    
    tick() {
        this.setState({
            time: new Date(),
        });
    }

    render() {
        let _time = new Date(new Date() - new Date(Date.UTC(2021, 7, 11, 7, 30, 0)));
        if(_time.getHours() >= 12) {
            _time = new Date(new Date() - new Date(Date.UTC(2021, 7, 11, 19, 30, 0)));
        }

        return <div>{language.ToolBar.TimeGone} {_time.toLocaleTimeString()}</div>
    }
}

export default function ToolBarScreen() {

    return (
        <div className='ToolBarHolder'>
            <img src={logo} className='LogoImage' height="80"/>
            <div className='ToolBarTimeStatus'>
                <Clock/>
            </div>
            <div className='ToolBarWagonStatus'>
                {language.ToolBar.WagonsGone} 218
            </div>
        </div>
    )
}