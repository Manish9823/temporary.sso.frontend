import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

export default function Navbar() {
    console.log(import.meta.env)
    const { VITE_BRAND_NAME: brandName } = import.meta.env;
    return (
        <Grid style={{
            width: '100%',
            backgroundColor: '#aaaaaa3c',
            padding: '0 10px',
            alignItems: 'center',
            height: '80px',
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            justifyContent: 'space-between'
        }}>
            <Grid item>{brandName}</Grid>
            <Grid item>
                <Link to={'login'}>
                    <Typography >Sign In</Typography>
                </Link>
            </Grid>
        </Grid>
    )
}
