import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import './ArchiveTable.css';
import { Typography } from '@material-ui/core';
import WagonElement from "./WagonElement.js"
import ListSubheader from '@material-ui/core/ListSubheader';

export default function TrainElement({train, classNames}) {
    const [_open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!_open);
    }

    return (
        <div className='TrainListElement'>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <img src="" height="40" className='WagonImageInWagonElement'/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body1" >{'Train ' + train.time1 + ' - ' + train.time2 + ' of ' + train.wagons.length + ' wagons'}</Typography>} />
                {_open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={_open} timeout="auto" unmountOnExit>
                <List 
                    component="div" 
                    disablePadding
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">Total time: {train.time}</ListSubheader>
                    }
                >
                    {
                        (train.wagons).map(wagon => {
                            <WagonElement wagon={wagon}/>
                        })
                    }
                </List>
            </Collapse>
        </div>
    )
}