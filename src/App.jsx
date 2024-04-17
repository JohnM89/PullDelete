import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Components/Header/Header'
import Landing from './Components/Landing/Landing'
import { styleReset } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import Footer from './Components/Footer/Footer'
import './App.css'

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;



function App() {


  return (
      <Router>
        <GlobalStyles />
      <ThemeProvider theme={original}>
      <div className="app">
        <Header />
        <main>
          <section id="main">
            <Landing />
          </section>
        </main>
        <Footer />
      </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
