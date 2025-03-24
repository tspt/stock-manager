// layouts/BasicLayout.tsx
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Layout, Menu, Breadcrumb } from 'antd'
const { Header, Content, Sider } = Layout

// 左侧菜单配置
const sideMenuItems: MenuProps['items'] = [{ key: '1', label: <Link to="/">工作台</Link> }]

export default function BasicLayout() {
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧菜单 */}
      <Sider width={200} theme="light" className="layout-left">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
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
