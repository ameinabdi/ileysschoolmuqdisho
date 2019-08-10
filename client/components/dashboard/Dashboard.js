import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as questionService from '../../services/questionService';
import {cyan, pink, purple, orange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {AddShoppingCart, ThumbUp, Assessment, Face} from '@material-ui/icons';
import SummaryBox from './SummaryBox';
import Product from './Product';
import './style.scss';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SiderComponent from './Sider'
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;



class Dashboard extends React.Component{
  state = {
    items:this.props.question.colors,
    selected:this.props.question.colors
};

   render(){
     console.log("saassaas", this.props)
    return (
        <div className="body">
           <Layout>
                <Header/>
                <Layout>
                <SiderComponent />
                <Layout style={{ padding: '0 24px 24px' }}>
                   <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                      saas
                    </Content>
                </Layout>
                </Layout>
             </Layout>
        </div>
    );
}
};

const mapStateToProps = state => ({
  question: state.question.question,
  errorMessage: state.auth.errorMessage
});

/**
* Map the actions to props.
*/
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, questionService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);