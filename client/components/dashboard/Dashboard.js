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
import { Layout, Menu, Breadcrumb, Icon, Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SiderComponent from './Sider';
import {setLocalStorage, clearLocalStorage} from '../../utils/storageUtil';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;



class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        items:null
    };
  }

  paper = (newdata) => {
    setLocalStorage(newdata, newdata);
    if(this.state.items){
      this.setState({
        items:[
          ...this.state.items,
          newdata,
        ]
      })
    } else{
      this.setState({
        items:[
          newdata
        ]
      })
    }
  }

   render(){
     console.log("items", this.state.items)
    return (
        <div className="body">
           <Layout>
                <Header style={{ height:'40px', backgroundColor:'white'}}/>
                <Layout>
                <SiderComponent papers={this.paper}/>
                <Layout style={{ padding: '0 24px 24px' }}>
                   <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                     {this.state.items ?
                        this.state.items.map((data, key)=>(
                          <Card title={data.title} key={key} extra={data.id+' marks'} bordered={false}>
                            <p><span>{key}.</span>{data.body}</p>
                          </Card>
                        ))

                     : null}
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