
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(()=>({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    }
  }))
function App() {
  

  const classes = useStyles();
  return (
    <>
    
    <div className={classes.App}>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
    </>
  )
}

export default App
