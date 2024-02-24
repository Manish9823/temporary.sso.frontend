import { Grid } from '@mui/material'
import React from 'react'
import LeftSide from '../components/LandingPage/LeftSide'
import RightSide from '../components/LandingPage/RightSide'
import Navbar from '../components/Navbar'

export default function LandingPage() {
    return (
        <React.Fragment>
            <Grid container xs={12} height={'100%'} width={'100%'}>
                <Navbar />
                <Grid item container height={'100%'} width={'100%'}>
                    <Grid item xs={6} style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
                        <LeftSide />
                    </Grid>
                    <Grid item xs={6} style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
                        <RightSide />
                    </Grid>
                </Grid>
            </Grid>

        </React.Fragment>

    )
}
