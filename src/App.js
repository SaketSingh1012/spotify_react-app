import './App.css';
import  SignIn from '../src/component/SignUp/SignIn'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useState } from 'react';

const customTheme = extendTheme({
  space: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "16px",
    4: "0px",
  },
});
function App() {
  const [albums, setAlbums] = useState([]);
  
  return (
    <ChakraProvider theme={customTheme}>
    <SignIn albums={albums} setAlbums={setAlbums}/>
  </ChakraProvider>
  );
}

export default App;
