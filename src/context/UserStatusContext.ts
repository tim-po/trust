import React from 'react';

const UserStatusContext = React.createContext({isUserVerified: false, isUserSubmitted: false})

export default UserStatusContext;