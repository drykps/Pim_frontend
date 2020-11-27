import React from 'react' 

import './index.css';
 
const Loading = ({ message }) => { 
    return ( 
        <div className='overlay-content text-center'> 
            <div class="spinner-border" role="status">
                <span class="sr-only">{message}Loading...</span>
            </div>
        </div> 
    );
} 
 
export default Loading;