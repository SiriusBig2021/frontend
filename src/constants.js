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

function generateMenus() {
    let _trainList = [];
    _events.forEach((event) => {
        let time1;
        if(event.type === 'departure') {
            _events.forEach((_event) => {
                if(_event.wagon === event.wagon) {
                    time1 = (_event.id.split("T"))[1];
                }
            })
            if(event.train_id != undefined) {
                if(event.train_id == -1) {} else {
                    if(event.train_id > _trainList.length) {_trainList.push([]);}
                    _trainList[event.train_id-1].push({number: event.wagon, state: event.state, time1: time1, time2: (event.id.split("T"))[1]});
                }
            }
        }
    })

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

        TrainObject.label = language.ArchiveScreen.TrainLabel + ': ' + _trainList[i].length + ' ' + lang_cnt_ending;
        if(_trainList[i][0] != undefined) {
            TrainObject.submenu[0] = {label: language.ArchiveScreen.ArrivedAt + _trainList[i][0].time1};
            TrainObject.submenu[1] = {label: language.ArchiveScreen.DeparturedAt + _trainList[i][0].time2};
        }

        for(let j = 0; j < _trainList[i].length; j++) {
            let WagonObject = {
                label: "default-wag",
                submenu: []
            }

            WagonObject.label = _trainList[i][j].number;
            WagonObject.submenu[1] = {label: language.ArchiveScreen.ArrivedAt + _trainList[i][j].time1};
            WagonObject.submenu[2] = {label: language.ArchiveScreen.DeparturedAt + _trainList[i][j].time2};

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
    return GeneratedMenus;
}

export default class MultiMenusList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
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
                data.id = doc.id;
                events.push(data);
            })
            events.reverse();
            this.setState({ events: events });
            _events = this.state.events;
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
                    data.id = doc.id;
                    events.push(data);
                })
                events.reverse();
                this.setState({ events: events });
                _events = this.state.events;
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
        return (
            <Wrapper className='WrapperClass'>
                <MultiMenus menus={generateMenus()}/>
            </Wrapper>
        )
    }
}