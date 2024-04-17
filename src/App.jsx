import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Components/Header/Header'
import Landing from './Components/Landing/Landing'

import Footer from './Components/Footer/Footer'
import './App.css'

function App() {


  return (
      <Router>
      <div className="app">
        <Header />
        <main>
          <section id="main">
            <Landing />
          </section>
          {/* <section id="about">
            <About />
          </section>
          <section id="contact">
            <Contact />
          </section> */}
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
