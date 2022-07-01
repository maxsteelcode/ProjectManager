import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './componentes/pages/Home'
import Company from './componentes/pages/Company'
import Contact from './componentes/pages/Contact'
import Container from './componentes/layout/Container'
import Navbar from './componentes/layout/Navbar'
import Footer from './componentes/layout/Footer'
import Projects from './componentes/pages/Projects'
import Project from './componentes/pages/Project'
import NewProject from './componentes/pages/NewProject'

function App() {
  return (
    <Router>      
      <Navbar/>
      <Container customClass="min-height">
      <Routes>        
          <Route exact path="/" element={<Home />} > </Route>
          <Route path="/company" element={<Company />} > </Route>
          <Route path="/contact" element={<Contact />} > </Route>
          <Route path="/projects" element={<Projects />} > </Route>        
          <Route path="/project/:id" element={<Project />} > </Route>   
          <Route path="/newproject" element={<NewProject />} > </Route>   
      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
