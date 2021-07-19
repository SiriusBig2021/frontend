import language from "./language.json";
import React from 'react';
import { db, auth } from "./firebase.js";

import "./ArchiveTable.css";

export default class LogScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            time: Date.now()
        }
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

        console.log('Current shift ID: ' + shift_id);

        db.collection('shift/' + shift_id + '/events').get().then((snapshot) => {
            const events = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                events.push(data);
            })
            events.reverse();
            this.setState({ events: events });
            //console.log(this.state.events);
        }).catch(error => console.error(error))

        this.interval = setInterval(() => {
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

            db.collection('shift/' + shift_id + '/events').get().then((snapshot) => {
                const events = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    events.push(data);
                })
                events.reverse();
                this.setState({ events: events });
            }).catch(error => console.error(error))
        }, 5000);
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        if(this.state.events) {
            return (
                <div className='LogHolder'>
                    <div className='ContentHolder'>
                        {
                            (this.state.events).map((log) => {
                                switch(log.state) {
                                    case 'full':
                                        log.state = language.LogScreen.Full;
                                        break;
                                    case 'empty':
                                        log.state = language.LogScreen.Empty;
                                        break;
                                    default:
                                        break;
                                }

                                switch(log.type) {
                                    case 'arrive':
                                        return (
                                            <div className='LogElement'>[{log.id.split("T")[1]}] {log.state} {language.LogScreen.Wagon} {log.wagon} {language.LogScreen.Arrived}</div>
                                        )
                                        break;
                                    case 'departure':
                                        return (
                                            <div className='LogElement'>[{log.id.split("T")[1]}] {log.state} {language.LogScreen.Wagon} {log.wagon} {language.LogScreen.Departured}</div>
                                        )
                                        break;
                                    case 'fail':
                                        return (
                                            <div className='LogElementFail'>[{log.id.split("T")[1]}] {log.state} {language.LogScreen.Wagon} {log.wagon}: {language.LogScreen.Failed}</div>
                                        )
                                        break;
                                    default:
                                        return (
                                            <div className='LogElementFail'>[{log.id.split("T")[1]}] {log.state} {language.LogScreen.Damaged}</div>
                                        )
                                        break;
                                }

                                
                            })
                        }
                    </div>
                </div>
            )
        } else {
            return (<div></div>);
        }
    }
}
