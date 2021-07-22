import logo from "./assets/images/logo.png";
import "./ArchiveTable.css";
import language from "./language.json";
import React from "react";
import { db, auth } from "./firebase.js";

let wagonSet = new Set();

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        let _time = new Date(new Date() - new Date(Date.UTC(2021, 7, 11, 7, 30, 0)));
        if(_time.getHours() >= 12) {
            _time = new Date(new Date() - new Date(Date.UTC(2021, 7, 11, 19, 30, 0)));
        }

        return (
            <div>{language.ToolBar.TimeGone} {_time.toLocaleTimeString()}</div>
        )
    }
}

export default class ToolBarScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wagons_loaded: 0,
            wagons_full: 0,
            wagons_empty: 0,
            wagons_errors: 0,
            wagons_limit: 12

        };
    }

    componentDidMount() {
        let _time = new Date();
        let iso_date = (_time.toISOString()).split('T');
        let shift_id = "";
        let shift0_time = new Date(_time - new Date(Date.UTC(2021, 7, 11, 7, 30, 0)));
        if(shift0_time.getHours() < 12) {
            shift_id = iso_date[0] + 'T07:30:00';
        } else {
            shift_id = iso_date[0] + 'T19:30:00';
        }

        let events = [];

        db.collection('shift/' + shift_id + '/events').get().then((snapshot) => {
            wagonSet.clear();
            let wagons_loaded_ = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;

                if(data.type == 'departure') {
                    wagons_loaded_++;
                }

                if(wagonSet.has(data.wagon)) {
                    wagonSet.delete(data.wagon);
                } else {
                    wagonSet.add(data.wagon);
                }
                events.push(data);
            })
            events.reverse();

            this.setState({ events: events, wagons_loaded: wagons_loaded_ }, () => {                

                let wagons_empty_ = 0;
                let wagons_full_ = 0;
                let wagons_errors_ = 0;

                wagonSet.forEach((wagon) => {
                    let wagonState = "";

                    for(let i = 0; i < this.state.events.length; i++) {
                        if(this.state.events[i].wagon == wagon) {
                            wagonState = this.state.events[i].state;
                            if(this.state.events[i].type == 'fail') {wagonState = 'fail';}
                        }
                    }

                    switch(wagonState) {
                        case 'full':
                            wagons_full_++;
                            break;
                        case 'empty':
                            wagons_empty_++;
                            break;
                        default:
                            wagons_errors_++;
                            break;
                    }
                })

                this.setState({
                    wagons_empty: wagons_empty_,
                    wagons_full: wagons_full_,
                    wagons_errors: wagons_errors_
                });

            });
        }).catch(error => console.error(error))

        this.intervalID = setInterval(() => {
            this.tick();

            let _time = new Date();
            let iso_date = (_time.toISOString()).split('T');
            let shift_id = "";
            let shift0_time = new Date(_time - new Date(Date.UTC(2021, 7, 11, 7, 30, 0)));
            if(shift0_time.getHours() < 12) {
                shift_id = iso_date[0] + 'T07:30:00';
            } else {
                shift_id = iso_date[0] + 'T19:30:00';
            }

            let events = [];

            db.collection('shift/' + shift_id + '/events').get().then((snapshot) => {
                wagonSet.clear();
                let wagons_loaded_ = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;

                    if(data.type == 'departure') {
                        wagons_loaded_++;
                    }

                    if(wagonSet.has(data.wagon)) {
                        wagonSet.delete(data.wagon);
                    } else {
                        wagonSet.add(data.wagon);
                    }
                    events.push(data);
                })
                events.reverse();

                this.setState({ events: events, wagons_loaded: wagons_loaded_ }, () => {                

                    let wagons_empty_ = 0;
                    let wagons_full_ = 0;
                    let wagons_errors_ = 0;

                    wagonSet.forEach((wagon) => {
                        let wagonState = "";

                        for(let i = 0; i < this.state.events.length; i++) {
                            if(this.state.events[i].wagon == wagon) {
                                wagonState = this.state.events[i].state;
                                if(this.state.events[i].type == 'fail') {wagonState = 'fail';}
                            }
                        }

                        switch(wagonState) {
                            case 'full':
                                wagons_full_++;
                                break;
                            case 'empty':
                                wagons_empty_++;
                                break;
                            default:
                                wagons_errors_++;
                                break;
                        }
                    })

                    this.setState({
                        wagons_empty: wagons_empty_,
                        wagons_full: wagons_full_,
                        wagons_errors: wagons_errors_
                    });

                });
            }).catch(error => console.error(error))
        }, 5000);
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

        return (
            <div className='ToolBarHolder'>
                <div className="LogoImageHolder"><img src={logo} className='LogoImage'/></div>
                <div className="WagonStateInfoHolder">
                    <div className="ToolBarEmptyWagonStatus">{language.ToolBar.EmptyWagonsOnStation}: {this.state.wagons_empty}</div>
                    <div className="ToolBarFullWagonStatus">{language.ToolBar.FullWagonsOnStation}: {this.state.wagons_full}</div>
                </div>
                <div className="WagonInfoHolder">
                    <div className='ToolBarTimeStatus'>
                        <Clock/>
                    </div>
                    <div className='ToolBarWagonStatus'>
                        {language.ToolBar.WagonsGone} {this.state.wagons_loaded}
                    </div>
                </div>
            </div>
        )
    }
}

//<div className="ToolBarEmptyWagonStatus">Empty: {this.state.wagons_empty}</div>
//<div className="ToolBarFullWagonStatus">Full: {this.state.wagons_full}</div>