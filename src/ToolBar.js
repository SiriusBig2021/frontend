import logo from "./assets/images/logo.png";
import "./ArchiveTable.css";
import language from "./language.json";
import React from "react";
import { db, auth } from "./firebase.js";

export default class ToolBarScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            wagons: 0
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

        db.collection('shift/' + shift_id + '/events').get().then((snapshot) => {
            const events = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if(data.type === 'departure') {
                    events.push(data);
                }
            })

            this.setState({ wagons: events.length });
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

            db.collection('shift/' + shift_id + '/events').get().then((snapshot) => {
                const events = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    if(data.type === 'departure') {
                        events.push(data);
                    }
                })

                this.setState({ wagons: events.length });
            }).catch(error => console.error(error))


        }, 1000);
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
                <img src={logo} className='LogoImage' height="80"/>
                <div className='ToolBarTimeStatus'>
                    <div>{language.ToolBar.TimeGone} {_time.toLocaleTimeString()}</div>
                </div>
                <div className='ToolBarWagonStatus'>
                    {language.ToolBar.WagonsGone} {this.state.wagons}
                </div>
            </div>
        )
    }
}