import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import styles from './index.module.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'
import { setToken } from 'ultis/localstorage'

export default class Login extends Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div className={styles.login}>
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          {/* form */}
          <Form
            size="large"
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13911111111',
              code: '246810',
              agree: true,
            }}
          >
            <Form.Item
              name="mobile"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'mobile no. is required' },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: 'mobile no. pattern wrong',
                },
              ]}
            >
              <Input placeholder="Please insert mobile no." />
            </Form.Item>

            <Form.Item
              name="code"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'code is required' },
                { pattern: /^\d{6}$/, message: 'code is a 6-digit number' },
              ]}
            >
              <Input placeholder="please enter code"></Input>
            </Form.Item>

            <Form.Item
              valuePropName="checked"
              name="agree"
              rules={[
                {
                  // 自定義校驗規則
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
              <Checkbox>I have read and agreed the T&C</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block="true"
                loading={this.state.loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = async ({ mobile, code }) => {
    // 一点击登录，就让loading变成true
    this.setState({
      loading: true,
    })
    try {
      const res = await login(mobile, code)
      console.log(res)
      // 登录成功

      // 1.提示登录成功
      message.success('Login successfully', 1, () => {
        // 2.保存token
        setToken(res.data.token)
        // 3.跳转到页面
        const { state } = this.props.location
        if (state) {
          // 如果有state，就调到state所记录的原位置
          this.props.history.push(state.from)
        } else {
          // 如果没有state，就跳转到首页
          this.props.history.push('/home')
        }
      })
    } catch (error) {
      // console.log(error.response.data.message)
      // 登录失败
      // 1.提示登录失败
      message.warning(error.response.data.message, 1, () => {
        // 2.改变loading状态
        this.setState({
          loading: false,
        })
      })
    }
  }
}
