import { Router, Route, Switch } from 'react-router-dom'
import Home from 'pages/Layout'
import Login from 'pages/Login'
import notFound from 'pages/NotFound'
import AuthRoute from 'components/AuthRoute'
import history from 'ultis/history'

function App() {
  return (
    <Router history={history}>
      <div className="App">
        {/* <Link to="/login">登錄</Link>
        <Link to="/home">首頁</Link> */}

        <Switch>
          {/* <Route path="/home" component={Home}></Route> */}
          <AuthRoute path="/home" component={Home}></AuthRoute>
          <Route path="/login" component={Login}></Route>
          {/* 今晚自己在這裡配置404 */}
          <Route component={notFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
