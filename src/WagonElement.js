import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import wagon_image_small from './assets/images/wagon_image_small.jpg';
import './ArchiveTable.css';
import { Typography } from '@material-ui/core';

export default function WagonElement({wagon, classNames}) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div className='WagonList'>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <img src={wagon_image_small} height="40" className='WagonImageInWagonElement'/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="h6" >{wagon.number}</Typography>} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={classNames}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={wagon.state} secondary={'Arrived at ' + wagon.time1 + ', departed at ' + wagon.time2} className='WagonElementInfo' />
                    </ListItem>
                </List>
            </Collapse>
        </div>
    );
}