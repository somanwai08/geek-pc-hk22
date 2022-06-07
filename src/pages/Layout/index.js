import React, { Component } from 'react'
import { Layout, Menu, Popconfirm, message } from 'antd'
import {
  FormOutlined,
  PieChartOutlined,
  LogoutOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Route, Switch, Link } from 'react-router-dom'
import styles from './index.module.scss'
import Home from 'pages/Home'
import ArticlePublish from 'pages/ArticlePublish'
import ArticleList from 'pages/ArticleList'
import { removeToken } from 'ultis/localstorage'
import { getUserProfile } from 'api/user'

const { Header, Content, Sider } = Layout

export default class LayoutComponent extends Component {
  state = {
    data: {},
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.data.name}</span>
              <span>
                <Popconfirm
                  title="确定退出本系统？"
                  onConfirm={this.confirm}
                  okText="确认"
                  cancelText="取消"
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[this.props.location.pathname]}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
              >
                {/* // items={items2} */}
                <Menu.Item key="/Home">
                  <Link to="/Home">
                    <PieChartOutlined /> 数据概览
                  </Link>
                </Menu.Item>
                <Menu.Item key="/home/ArticleList">
                  <Link to="/home/ArticleList">
                    <FormOutlined /> 内容管理
                  </Link>
                </Menu.Item>
                <Menu.Item key="/home/ArticlePublish">
                  <Link to="/home/ArticlePublish">
                    {' '}
                    <EditOutlined /> 发布文章
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout
              style={{
                padding: '24px',
              }}
            >
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route
                    path="/home/ArticleList"
                    component={ArticleList}
                  ></Route>
                  <Route
                    path="/home/ArticlePublish"
                    component={ArticlePublish}
                  ></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  async componentDidMount() {
    // 发请求，拿到用户信息，用res接收
    const res = await getUserProfile()
    console.log('res', res)

    // 更改state的值
    this.setState({
      data: res.data,
    })
  }

  // 退出系统功能
  confirm = () => {
    // 删除token
    removeToken()
    // 调到主页
    this.props.history.push('/login')
    // 提示退出成功
    message.info('退出成功')
  }
}
