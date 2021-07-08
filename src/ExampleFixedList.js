import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import WagonElement from "./WagonElement.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

let count = -1;

function renderRow() {
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
    
    count++;
    let _wagon = wagonList[3];

  return (
    <WagonElement wagon={_wagon}/>
  );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

export default function VirtualizedList() {
  const classes = useStyles();

  

  return (
    <div className={classes.root}>
      <FixedSizeList height={850} width={470} itemSize={46} itemCount={32}>
            {renderRow}
      </FixedSizeList>
    </div>
  );
}