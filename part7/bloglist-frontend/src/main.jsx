import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'
import store from './store'
import { ChakraProvider } from '@chakra-ui/react';

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>
)