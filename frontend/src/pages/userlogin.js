import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Button } from '@material-ui/core';

const UserLogin = () => {
    // Replace these with actual user data
    const user = {
        name: 'John Doe',
        membershipValidity: 'Valid',
        idNumber: '123456',
        codeNumber: 'ABC123',
        email: 'johndoe@example.comm',
        username: 'johndoe',
        password: 'password'
    };

    return (
        <div>
            <Typography variant="h4" component="h2">
                Notification Section
            </Typography>
            {/* Replace with actual notifications */}
            <Typography variant="body1">
                You have no new notifications.
            </Typography>

            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Profile Section
                    </Typography>
                    <Typography variant="body1">
                        Name: {user.name}
                    </Typography>
                    <Typography variant="body1">
                        Validity of Membership: {user.membershipValidity}
                    </Typography>
                    <Typography variant="body1">
                        ID Number: {user.idNumber}
                    </Typography>
                    <Typography variant="body1">
                        Code Number: {user.codeNumber}
                    </Typography>
                    <Typography variant="body1">
                        Email: {user.email}
                    </Typography>
                </CardContent>
            </Card>

            <Button variant="contained" color="primary" component={Link} to="/status">
                Go to Status Page
            </Button>
        </div>
    );
};

export default UserLogin;