import { BrowserRouter, Routes, Route } from 'react-router-dom';

import IntroSection from './pages/IntroSection';
import UserdataSection from './components/userData/UserdataSection';

import Footer from './components/layout/Footer';

import { OuidContext } from './context/ouidContext';
import { useState } from 'react';

function App() {

  const [ouid, setOuid] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <OuidContext.Provider value={ { ouid, setOuid } }>
          <Routes>
            <Route path='/' element={ <IntroSection></IntroSection> }></Route>
            <Route path='/UserdataSection/*' element={ <UserdataSection></UserdataSection> }></Route>
          </Routes>
        </OuidContext.Provider>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
