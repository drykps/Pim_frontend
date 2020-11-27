import React, { useState } from  'react';

const LoadingContext = React.createContext({
    loading: false,
    message: null,
    showLoading: message => { },
    hideLoading: () => { }
});

const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const showLoading = message => {
        setLoading(true);
        setMessage(message);
    };

    const hideLoading = () => {
        setLoading(true);
        setMessage('');
    };
    
    return (
    <LoadingContext.Provider value={{ loading, message, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
)};

export {
    LoadingProvider,
    LoadingContext
}