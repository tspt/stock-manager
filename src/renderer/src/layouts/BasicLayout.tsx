import { Link, Outlet } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import logo from '@/assets/icons/logo.svg'
import { HomeFilled, PayCircleFilled } from '@ant-design/icons'

export default function BasicLayout() {
  const { Header, Content, Sider } = Layout

  // 左侧菜单配置
  const sideMenuItems: MenuProps['items'] = [
    { key: '1', label: <Link to="/">工作台</Link>, icon: <HomeFilled /> },
    { key: '2', label: <Link to="/home">账户</Link>, icon: <PayCircleFilled /> }
  ]

  return (
    <Layout className="layout-container">
      {/* 左侧菜单 */}
      <Sider theme="light" className="layout-left">
        <div className="layout-logo">
          <img src={logo} alt="logo" />
        </div>
        <Menu
          className="layout-left-menu"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={sideMenuItems}
        />
      </Sider>

      {/* 内容区域 */}
      <Layout>
        {/* 顶部导航 */}
        <Header className="layout-top"></Header>
        <Layout className="layout-content">
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
