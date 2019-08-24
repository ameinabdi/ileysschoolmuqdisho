import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Import custom components
import MiniDrawer from '../drawer/MiniDrawer';
import Classes from '../../dashboard/classes';
import { Layout, Menu, Breadcrumb, Icon, Modal, Button, Dropdown,Avatar } from 'antd';
import ProfileIcon from './profileicon';
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
            loading: false,
            visible: false,
      };
      this.success.bind(this)
    }
    
    showModal = () => {
            this.setState({
                visible: true,
            });
           
        };
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    success = (data) => {
           if(data.visible == true){
            this.setState({ visible: false });
           }
    }
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        let {open} = this.state;
        const classes = this.props.classes;
        const { visible, loading } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                 <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                            <a href="/dashboard">
                            <Icon type="pie-chart" />
                            <span>Dashboard</span>
                            </a>
                            </Menu.Item>
                            <Menu.Item key="2">
                            <a href="/class">
                            <Icon type="form" />
                            <span>Class List</span>
                            </a>
                            </Menu.Item>
                            <Menu.Item key="3">
                            <a href="/subject">
                            <Icon type="desktop" />
                            <span>Subject List</span>
                            </a>
                            </Menu.Item>
                            <Menu.Item key="4">
                            <a href="/question">
                            <Icon type="question" />
                            <span>Question List</span>
                            </a>
                            </Menu.Item>
                        </Menu>
                        </Sider>
                        <Layout>
                        <Header style={{ background: '#fff',  alignItems:'flex-end', textAlign:'right'}}>
                            
                                <ProfileIcon />
                             
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Questions</Breadcrumb.Item>
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