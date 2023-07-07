import React from 'react';
import ReactDOM from 'react-dom';
// import indexcss from './index.module.css';
import App from './App';
import ChatProvider from './context/ChatProvider.js';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
 
//  ReactDOM.render(
//   <ChatProvider>
//         <App />

//   </ChatProvider>
//     ,
//     document.getElementById('root')
// )


ReactDOM.render(
      <ChakraProvider>
        <BrowserRouter>
          <ChatProvider>
            <App />
          </ChatProvider>
        </BrowserRouter>
      </ChakraProvider>,
      document.getElementById("root")
    );