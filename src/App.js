import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from 'pages/Layout'
import Login from 'pages/Login'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">登錄</Link>
        <Link to="/home">首頁</Link> */}

        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          {/* 今晚自己在這裡配置404 */}
        </Switch>
      </div>
    </Router>
  )
}

export default App
