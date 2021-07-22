//ФОРМАТИРОВАНИЕ ДАННЫХ ИЗ БД В ФОРМАТ, ПРИГОДНЫЙ ДЛЯ СПИСКОВ
//ВЫЗОВ СПИСКА

import language from "./language.json";

import styled from "styled-components";
import MultiMenus from "./MultiMenus";
import "./ArchiveTable.css";
import React from "react";
import { db, auth } from "./firebase";

const Wrapper = styled.aside`
  background: #f0f0f0;
  width: 100%;
  text-align: left;
`;

/*
ПРИМЕР ФОРМАТА ДАННЫХ ДЛЯ СПИСКОВ

const menus = [
    {
        label:"Train1",
        submenu: [
            {
                label: "Total time: 00:00"
            },
            {
                label:"Wagon1",
                submenu: [
                    {
                        label:"EMPTY"
                    },
                    {
                        label:"Arrived at 00:00"
                    },
                    {
                        label:"Departured at 00:00"
                    }
                ]
            }, 
            {
                label:"Wagon2",
                submenu: [
                    {
                        label:"FULL"
                    }
                ]
            },
            {
                label:"Wagon3",
                submenu: [
                    {
                        label:"FULL"
                    }
                ]
            }
        ]
    },
    {
        label:"Train2",
        submenu: [
            {label:"Wagon1"}, {label:"Wagon2"}, {label:"Wagon3"}, {label:"Wagon4"}
        ]
    }
];

*/

let _events = [];
let currentWagonList = [];
let wagonSet = new Set();

function generateMenus() {
    let _trainList = [];
    //let _trainTypeList = [];
    _events.forEach((event) => {
        let time1;
        if(event.type == 'departure') {
            _events.forEach((_event) => {
                if(_event.wagon == event.wagon) {
                    time1 = (_event.id.split("T"))[1];
                }
            })
            if(event.train_id != undefined) {
                if(event.train_id == -1) {} else {
                    while(event.train_id > _trainList.length) {_trainList.push([]);}
                    _trainList[event.train_id-1].push({number: event.wagon, state: event.state, time1: time1, time2: (event.id.split("T"))[1], type: event.type});
                }
            }
        } else {
            if(event.train_id != undefined && event.train_id != -1) {
                //if(event.train_id > _trainList.length) {_trainList.push([]);}
                while(event.train_id > _trainList.length) {_trainList.push([]);}
                _trainList[event.train_id-1].push({number: event.wagon, state: event.state, time1: event.id.split("T")[1], time2: '00:00:00', type: event.type});
            }
        }
    })

    if(currentWagonList) {
        _trainList.push([]);
        currentWagonList.forEach((wagon) => {
            _trainList[_trainList.length-1].push({number: wagon.number, state: wagon.state, time1: wagon.time1, time2: '00:00:00'});
        })
    } else {
        //
    }

    _trainList.reverse();
    const GeneratedMenus = [];

    if(_trainList) {
    for(let i = 0; i < _trainList.length; i++) {
        let TrainObject = {
            label: "default-sub",
            submenu: []
        }

        //Оx уж этот великий и могучий
        let cnt_ending = _trainList[i].length%10;
        let lang_cnt_ending;
        if(cnt_ending == 1) {
            lang_cnt_ending = language.ArchiveScreen.Wagons1;
        } else if(cnt_ending >= 2 && cnt_ending <= 4) {
            lang_cnt_ending = language.ArchiveScreen.Wagons234;
        } else {
            lang_cnt_ending = language.ArchiveScreen.Wagons50;
        }
        if(i == 0) {
            TrainObject.label = language.ArchiveScreen.CurrentlyUnderLoading + ': ' + _trainList[i].length + ' ' + lang_cnt_ending;
        } else {
            if(_trainList[i][0].type == 'arrive') {
                TrainObject.label = '[' + _trainList[i][0].time1 + '] ' + language.ArchiveScreen.TrainArriveLabel + ': ' + _trainList[i].length + ' ' + lang_cnt_ending;
            } else {
                TrainObject.label = '[' + _trainList[i][0].time2 + '] ' + language.ArchiveScreen.TrainDepartureLabel + ': ' + _trainList[i].length + ' ' + lang_cnt_ending;
            }
            //TrainObject.label = '[' + (_trainList) + '] ' + (_trainList[i][0].type == 'arrive' ? language.ArchiveScreen.TrainArriveLabel : language.ArchiveScreen.TrainDepartureLabel) + ': ' + _trainList[i].length + ' ' + lang_cnt_ending;
        }

        if(_trainList[i][0] != undefined && i != 0) {
            if(_trainList[i][0].type == 'arrive') {TrainObject.submenu[0] = {label: language.ArchiveScreen.TrainArrivedAt + _trainList[i][0].time1};} else {TrainObject.submenu[1] = {label: language.ArchiveScreen.TrainDeparturedAt + _trainList[i][0].time2};}
        }

        for(let j = 0; j < _trainList[i].length; j++) {
            let WagonObject = {
                label: "default-wag",
                submenu: []
            }

            WagonObject.label = _trainList[i][j].number;
            WagonObject.submenu[1] = {label: language.ArchiveScreen.ArrivedAt + _trainList[i][j].time1};
            if(i != 0 && _trainList[i][j].type == 'departure') {WagonObject.submenu[2] = {label: language.ArchiveScreen.DeparturedAt + _trainList[i][j].time2};}

            if(_trainList[i][j].state == 'empty') {
                WagonObject.submenu[0] = {label: language.ArchiveScreen.Empty + ""};
            } else if(_trainList[i][j].state == 'full') {
                WagonObject.submenu[0] = {label: language.ArchiveScreen.Full + ""};
            } else {
                WagonObject.submenu[0] = {label: _trainList[i][j].state};
            }

            (TrainObject.submenu).push(WagonObject);
        }

        GeneratedMenus.push(TrainObject);
    }
    }
    //console.log(GeneratedMenus);
    return GeneratedMenus;
}

export default class MultiMenusList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            events: null,
            wagons: null
        };
    }

    componentDidMount() {
        //console.log("mounted");

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

                    for(let i = 0; i < this.state.events.length; i++) {
                        if(this.state.events[i].wagon == wagon) {
                            wagonState = this.state.events[i].state;
                            if(this.state.events[i].type == 'fail') {wagonState = 'fail';}
                            frames = this.state.events[i].frames;
                            time1 = this.state.events[i].id.split("T")[1];
                        }
                    }
                    currentWagonList.push({number: wagon, state: wagonState, frames: frames, time1: time1});
                })
                this.setState({ wagons: currentWagonList });
                _events = this.state.events;
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
                this.setState({ events: events }, () => {
                    currentWagonList = [];
                    wagonSet.forEach((wagon) => {
                        let wagonState = "";
                        let frames = [];
                        let time1 = "";

                        for(let i = 0; i < this.state.events.length; i++) {
                            if(this.state.events[i].wagon == wagon) {
                                wagonState = this.state.events[i].state;
                                if(this.state.events[i].type == 'fail') {wagonState = 'fail';}
                                frames = this.state.events[i].frames;
                                time1 = this.state.events[i].id.split("T")[1];
                            }
                        }
                        currentWagonList.push({number: wagon, state: wagonState, frames: frames, time1: time1});
                    })
                    this.setState({ wagons: currentWagonList });
                    _events = this.state.events;
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
        return (
            <Wrapper className='WrapperClass'>
                <MultiMenus menus={generateMenus()}/>
            </Wrapper>
        )
    }
}