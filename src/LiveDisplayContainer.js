import React from 'react';
import LiveScreen from "./LiveDisplay.js";
import { db, auth } from './firebase.js';
import "./ArchiveTable.css";
import "./GridTest.css";

let currentWagonList = [];
let wagonSet = new Set();

export default class LiveDisplayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: Date.now(),
            events: null,
            wagons: null,
            reload: false
        }
    }

    componentDidMount() {
        console.log("mounted");

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
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                if(wagonSet.has(data.wagon)) {
                    wagonSet.delete(data.wagon);
                } else {
                    wagonSet.add(data.wagon);
                }
                events.push(data);
            })
            events.reverse();
            this.setState({ events: events }, () => {
                currentWagonList = [];
                wagonSet.forEach((wagon) => {
                    let wagonState = "";
                    let frames = [];
                    let time1 = "";
                    let event_id = "";

                    for(let i = 0; i < this.state.events.length; i++) {
                        if(this.state.events[i].wagon === wagon) {
                            wagonState = this.state.events[i].state;
                            if(this.state.events[i].type == 'fail') {wagonState = 'fail';}
                            if(this.state.events[i].wagon.length != 8) {wagonState = 'fail';}
                            frames = this.state.events[i].frames;
                            time1 = this.state.events[i].id.split("T")[1];
                            event_id = this.state.events[i].id;
                        }
                    }
                    currentWagonList.push({number: wagon, state: wagonState, frames: frames, time1: time1, event_id: event_id});
                })

                currentWagonList.reverse();
                this.setState({ wagons: currentWagonList });
            });
        }).catch(error => console.error(error))

        this.intervalID = setInterval(() => {
            this.setState({ time: Date.now() });

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
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    if(wagonSet.has(data.wagon)) {
                        wagonSet.delete(data.wagon);
                    } else {
                        wagonSet.add(data.wagon);
                    }
                    events.push(data);
                })
                events.reverse();
                this.setState({ events: events });
            }).catch(error => console.error(error))

            currentWagonList = [];
            wagonSet.forEach((wagon) => {
                let wagonState = "";
                let frames = [];
                let time1 = "";
                let event_id = "";

                for(let i = 0; i < this.state.events.length; i++) {
                    if(this.state.events[i].wagon === wagon) {
                        wagonState = this.state.events[i].state;
                        if(this.state.events[i].type == 'fail') {wagonState = 'fail';}  
                        if(this.state.events[i].wagon.length != 8) {wagonState = 'fail';}
                        frames = this.state.events[i].frames;
                        time1 = this.state.events[i].id.split("T")[1];
                        event_id = this.state.events[i].id;
                    }
                }
                currentWagonList.push({number: wagon, state: wagonState, frames: frames, time1: time1, event_id: event_id});
            })

            currentWagonList.reverse();
            this.setState({ wagons: currentWagonList });
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
        console.log(this.props.logsOpen);
        if(this.state.wagons) {
        return (
            <div className="LiveWindow2">
                <div className={this.state.wagons.length < 1 ? 'q1-hidden' : 'q1'}>
                    <LiveScreen segment={1} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 2 ? 'q2-hidden' : 'q2'}>
                    <LiveScreen segment={2} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 3 ? 'q3-hidden' : 'q3'}>
                    <LiveScreen segment={3} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 4 ? 'q4-hidden' : 'q4'}>
                    <LiveScreen segment={4} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 5 ? 'q5-hidden' : 'q5'}>
                    <LiveScreen segment={5} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 6 ? 'q6-hidden' : 'q6'}>
                    <LiveScreen segment={6} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 7 ? 'q7-hidden' : 'q7'}>
                    <LiveScreen segment={7} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 8 ? 'q8-hidden' : 'q8'}>
                    <LiveScreen segment={8} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 9 ? 'q9-hidden' : 'q9'}>
                    <LiveScreen segment={9} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 10 ? 'q10-hidden' : 'q10'}>
                    <LiveScreen segment={10} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 11 ? 'q11-hidden' : 'q11'}>
                    <LiveScreen segment={11} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 12 ? 'q12-hidden' : 'q12'}>
                    <LiveScreen segment={12} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 13 ? 'q13-hidden' : 'q13'}>
                    <LiveScreen segment={13} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 14 ? 'q14-hidden' : 'q14'}>
                    <LiveScreen segment={14} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 15 ? 'q15-hidden' : 'q15'}>
                    <LiveScreen segment={15} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 16 ? 'q16-hidden' : 'q16'}>
                    <LiveScreen segment={16} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 17 ? 'q17-hidden' : 'q17'}>
                    <LiveScreen segment={17} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 18 ? 'q18-hidden' : 'q18'}>
                    <LiveScreen segment={18} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 19 ? 'q19-hidden' : 'q19'}>
                    <LiveScreen segment={19} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 20 ? 'q20-hidden' : 'q20'}>
                    <LiveScreen segment={20} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 21 ? 'q21-hidden' : 'q21'}>
                    <LiveScreen segment={21} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={(this.state.wagons).length < 22 ? 'q22-hidden' : 'q22'}>
                    <LiveScreen segment={22} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 23 ? 'q23-hidden' : 'q23'}>
                    <LiveScreen segment={23} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 24 ? 'q24-hidden' : 'q24'}>
                    <LiveScreen segment={24} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
                <div className={this.state.wagons.length < 25 ? 'q25-hidden' : 'q25'}>
                    <LiveScreen segment={25} wagons={this.state.wagons} logsOpen={this.props.logsOpen}/>
                </div>
            </div>
        )
        } else {
            return(<div></div>);
        }
    }
}