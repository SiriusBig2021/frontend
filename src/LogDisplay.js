import language from "./language.json";
import React from 'react';
import { db, auth } from "./firebase.js";

import "./ArchiveTable.css";
import { ThreeSixty } from "@material-ui/icons";

/*const logs = [
    {
        eventType:'arrive', //arrive, departure, fail (?)
        wagon:'1412-4325',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'7574-4832',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'0374-4328',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'8439-2348',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'1432-1294',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'9549-0958',
        time:'00:00:00'
    },
    {
        eventType:'arrive', 
        wagon:'1249-4523',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'6392-1258',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'1975-1975',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'2358-9387',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'3259-0382',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'6392-9754',
        time:'00:00:00'
    },
    {
        eventType:'arrive', 
        wagon:'1274-2378',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'1265-4589',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'1264-3875',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'1478-9837',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'6583-9858',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'6325-9469',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'4759-9732',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'3295-9760',
        time:'00:00:00'
    },
    {
        eventType:'fail',
        wagon:'9875-3578',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'1044-1049',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'3253-2358',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'8634-3258',
        time:'00:00:00'
    },
    {
        eventType:'arrive', 
        wagon:'2715-2587',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'3578-9714',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'1958-9357',
        time:'00:00:00'
    },
    {
        eventType:'fail',
        wagon:'1853-1398',
        time:'00:00:00'
    },
    {
        eventType:'fail',
        wagon:'3528-3941',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'i350-8327',
        time:'00:00:00'
    },
    {
        eventType:'arrive', 
        wagon:'8250-9238',
        time:'00:00:00'
    },
    {
        eventType:'abcdef',
        wagon:'3258-9134',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'3257-9235',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'1275-3257',
        time:'00:00:00'
    },
    {
        eventType:'arrive',
        wagon:'3259-1337',
        time:'00:00:00'
    },
    {
        eventType:'departure',
        wagon:'1478-9135',
        time:'00:00:00'
    }
]*/

export default class LogScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            time: Date.now()
        }
    }

    componentDidMount() {
        db.collection('events').get().then((snapshot) => {
            const events = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                events.push(data);
            })
            events.reverse();
            this.setState({ events: events });
        }).catch(error => console.error(error))

        this.interval = setInterval(() => {
            this.setState({ time: Date.now() });
            db.collection('events').get().then((snapshot) => {
                const events = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    events.push(data);
                })
                events.reverse();
                this.setState({ events: events });
            }).catch(error => console.error(error))
        }, 1000);
        
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
                            switch(log.eventType) {
                                case 'arrive':
                                    return (
                                        <div className='LogElement'>[{log.time}] {language.LogScreen.Wagon} {log.wagon} {language.LogScreen.Arrived}</div>
                                    )
                                    break;
                                case 'departure':
                                    return (
                                        <div className='LogElement'>[{log.time}] {language.LogScreen.Wagon} {log.wagon} {language.LogScreen.Departured}</div>
                                    )
                                    break;
                                case 'fail':
                                    return (
                                        <div className='LogElementFail'>[{log.time}] {language.LogScreen.Wagon} {log.wagon}: {language.LogScreen.Failed}</div>
                                    )
                                    break;
                                default:
                                    return (
                                        <div className='LogElementFail'>[{log.time}] {language.LogScreen.Damaged}</div>
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