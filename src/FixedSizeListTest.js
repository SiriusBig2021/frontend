import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./ArchiveTable.css";
import WagonElement from './WagonElement.js';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function FixedSizeListTest() {
    const classes = useStyles();

    const wagonList = [
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

    return (

            <FixedSizeList height={500} width={200} itemSize={50} itemCount={10}>
                {wagonList.map(wagon => {
                    return (
                        <WagonElement wagon={wagon} classNames={classes.nested}/>
                    )
                })}
            </FixedSizeList>
        
    )
}