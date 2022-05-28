import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input } from 'antd'
import './index.scss'
import logo from 'assets/logo.png'

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <img src={logo} alt="" className="login-logo" />
          {/* form */}
          <Form
            size="large"
            onFinish={this.onFinish}
            initialValues={{
              mobile: '13826442480',
              code: '123456',
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
              <Button type="primary" htmlType="submit" block="true">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onFinish = (value) => {
    console.log(value)
  }
}
