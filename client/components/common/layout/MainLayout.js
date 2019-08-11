import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Import custom components
import MiniDrawer from '../drawer/MiniDrawer';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const styles = theme => ({
    root: {
        width: '100%',
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    contents: {
        width: '100%',
        flexGrow: 1,
        padding: 24,
        height: 'calc(100% - 6px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    }
});

class MainLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            collapsed: true,

        };
    }
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        let {open} = this.state;
        const classes = this.props.classes;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                 <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                            </Menu.Item>
                            <SubMenu
                            key="sub1"
                            title={
                                <span>
                                <Icon type="user" />
                                <span>User</span>
                                </span>
                            }
                            >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu
                            key="sub2"
                            title={
                                <span>
                                <Icon type="team" />
                                <span>Team</span>
                                </span>
                            }
                            >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                            </Menu.Item>
                        </Menu>
                        </Sider>
                        <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {this.props.children}
                        </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ileys School ©2019 Created by amein abdi</Footer>
                        </Layout>
            </Layout>
        )
    }

}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.element
};

export default withStyles(styles)(MainLayout)