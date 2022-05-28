import { Button, Container, Grid, TextField } from '@mui/material';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { login } from "../../actions/auth"

interface LoginPageProps {
    title: string;
    login: (email: string, password: string) => void
}

class LoginPage extends Component<LoginPageProps>{

    state = {
        loading: false,
        message: "",
        fields: {
            email: "",
            password: "",
        },
        errors: {
            email: "",
            password: "",
        },
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = this.state.errors;
        let formIsValid = true;

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }


        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        // if (typeof fields["password"] !== "undefined") {
        //     if (!fields["password"].match(/^[a-zA-Z]+$/)) {
        //         formIsValid = false;
        //         errors["password"] = "Only letters";
        //     }
        // }

        return formIsValid;
    }

    handleLogin = async (e: any) => {
        e.preventDefault();
        if (this.handleValidation()) {
            this.setState({
                message: "",
                loading: true
            });
            await this.props.login(this.state.fields.email, this.state.fields.password);

        } else {
            //alert("Form has errors.")
        }


    }

    handleChange = (field: any, e: any) => {
        let fields = this.state.fields;
        if (field === "email") {
            fields.email = e.target.value;
        } else if (field === "password") {
            fields.password = e.target.value;
        }
        // fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        const { title } = this.props;
        return (
            <>
                <Container maxWidth="xl">
                    <form onSubmit={this.handleLogin.bind(this)} name="postform" method="post">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={4}>
                                <h3>{title}</h3>
                                <div style={{ marginTop: "10px" }}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        onChange={this.handleChange.bind(this, "email")}
                                        value={this.state.fields["email"]}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <TextField
                                        required
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange.bind(this, "password")}
                                        value={this.state.fields["password"]}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <Button variant="outlined" style={{ marginTop: '10px' }} type="submit">Login</Button>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
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
        login: (email: string, password: string) => dispatch(login(email, password))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);