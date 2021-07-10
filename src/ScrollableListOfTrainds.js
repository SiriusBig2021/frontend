import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import "./ArchiveTable.css";
import TrainElement from "./TrainElement.js";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function TrainList() {
    const classes = useStyles();

    const trainList = [
        {time1: '00:00', time2: '00:00', time: '00:00', wagons: [
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'}
            ]
        },
        {time1: '00:00', time2: '00:00', time: '00:00', wagons: [
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 12222221, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 22222222, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 33333333, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 44444444, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 55555555, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 66666666, state: 'full', time1: '00:00', time2: '00:00'},
            {number: 77777777, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 88888888, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 99999999, state: 'empty', time1: '00:00', time2: '00:00'},
            {number: 10000001, state: 'full', time1: '00:00', time2: '00:00'}
            ]
        }
    ]

    return (
        <div className='ArchieveHolder'>
            <div className='ContentHolder'>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">Train List</ListSubheader>
                    }
                    className={classes.root}
                >
                    {trainList.map(train => {
                        return (
                            <TrainElement train={train}/>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}