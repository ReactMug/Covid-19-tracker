import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox(props) {
    return (
        <Card 
         onClick={props.whenClick}
         className={`infoBox ${props.active && 'infoBox--selectect'} ${props.isRed && 'infoBox--red'}`}
        >
            <CardContent  className='infoBox'>
                <Typography className='infoBox__title' color="textSecondary">
                    {props.title}
                </Typography>
                <h2 className='infoBox__cases'>{props.cases}</h2>
                <Typography className='infoBox__total' color="textSecondary">
                    {props.total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
