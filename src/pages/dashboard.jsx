
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}>
            <Link to="/admin/products">Product List</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileTextOutlined />}>
            <Link to="/admin/blog">Blog Content</Link>
          </Menu.Item>
          {/* Add more menu items for other sections */}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          {/* Content for different sections will be rendered here */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
