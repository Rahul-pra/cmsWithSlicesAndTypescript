
import { AppBar, Button, Container, Link, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import {
    logoutFromSlice

} from "../../reducers/point.slice";

interface HeaderComponentProps {
    projectName: string;
    logo?: string;
    classes?: any;
    user?: any;
    logout: () => void;
    logoutFromSlices: () => void;
}

const styles = {
    leftLinks: {
        flex: "1 1 200px"
    },
};

class HeaderComponent extends Component<HeaderComponentProps>{
    handleLogout = async () => {
        await this.props.logout();
        await this.props.logoutFromSlices();
        return (
            <Route path="/login" element={<Navigate replace to="/login" />} />
        )
    }

    render() {
        const { projectName, logo, user } = this.props;
        return (
            <>
                <AppBar position="fixed">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <img src={logo} alt="Logo" style={{ color: '#FFFFFF', width: '90px' }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                {projectName}
                            </Typography>
                            {!!user && user.isLoggedIn ? (
                                <>
                                    <nav style={styles.leftLinks}>
                                        <Link href="/contract" style={{ color: '#ffffff', textDecorationLine: 'none', padding: "10px" }}>Contract</Link>
                                        <Link href="/point" style={{ color: '#ffffff', textDecorationLine: 'none', padding: "10px" }}>Point</Link>
                                        <Link href="/invoice" style={{ color: '#ffffff', textDecorationLine: 'none', padding: "10px" }}>Invoice </Link>
                                    </nav>
                                    <nav>
                                        <Button onClick={this.handleLogout.bind(this)} style={{ color: '#ffffff', textDecorationLine: 'none', padding: "10px" }}>logout</Button>
                                    </nav>
                                </>

                            ) : (
                                <>
                                    <nav style={styles.leftLinks}></nav>
                                    <nav>
                                        <Link href="/login" style={{ color: '#ffffff', textDecorationLine: 'none', padding: "10px" }}>Login</Link>
                                    </nav>
                                </>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(logout()),
        logoutFromSlices: () => dispatch(logoutFromSlice())
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);