import React from 'react';
import {cyan, pink, purple, orange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {AddShoppingCart, ThumbUp, Assessment, Face} from '@material-ui/icons';
import SummaryBox from './SummaryBox';
import Product from './Product';
import './style.scss';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SiderComponent from './Sider'
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const data = {
    recentProducts: [
        {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
        {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
        {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
        {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
    ]
};

class Dashboard extends React.Component{
    onBeforeDragStart = () => {
        /*...*/
      };
    
      onDragStart = () => {
        /*...*/
      };
      onDragUpdate = () => {
        /*...*/
      };
      onDragEnd = () => {
        // the only one that is required
      };
   render(){
    return (
        <div className="body">
            <DragDropContext
                onBeforeDragStart={this.onBeforeDragStart}
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
        <Droppable droppableId="droppable-1" type="PERSON">
         {(provided, snapshot) => (
           <Layout>
                <Header className="header" />
                <Layout>
                <SiderComponent />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Paper</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    Content
                    </Content>
                </Layout>
                </Layout>
             </Layout>
           )}
        </Droppable>
        </DragDropContext>
        </div>
    );
}
};

export default Dashboard;