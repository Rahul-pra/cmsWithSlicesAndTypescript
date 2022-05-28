import { Link, Typography } from '@mui/material';
import React, { Component } from 'react';

interface FooterComponentProps {
    copyRight: string;
}

export default class FooterComponent extends Component<FooterComponentProps>{
    render() {
        const { copyRight } = this.props;
        return (
            <>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="http://www.linde-engineering.in/en/index.html">
                        {copyRight}
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </>
        );
    }
}