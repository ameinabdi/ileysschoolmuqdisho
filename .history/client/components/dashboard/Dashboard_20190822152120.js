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
import { Layout, Menu, Breadcrumb,Row, Icon, Card, Button, Modal } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SiderComponent from './Sider';
import {setLocalStorage, clearLocalStorage} from '../../utils/storageUtil';
import Classes from './classes';
import Subjects from './subjects';
import Question from './questions'
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from "docx";
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;




class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        items:null,
        visible: false,
        component: ''
      };
      this.success.bind(this)
    }
    
    exportDoc = () =>{
      const doc = new Document();
      const { items } = this.state;

        doc.addSection({
          properties: {},
          children: [
               new Paragraph({
                  children: [

                      new TextRun(element.title),
                      new TextRun({
                          text: "Foo Bar",
                          bold: true,
                     }),

                      new TextRun({
                          text: "Github is the best",
                          bold: true,
                      }).tab(),
                  ],
                })
            ],
        });


      Packer.toBuffer(doc).then((buffer) => {
        console.log("hello", buffer)

        var file = new File([buffer], "My Document.txt", {type: "text/plain;charset=utf-8"});
        saveAs(file, "My Document.docx");
        saveAs(file, "My Document.pdf");

    });
    }
    showModal = (data) => {
      console.log(data)
            this.setState({
                visible: true,
                component: data
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
  remove = (newdata) => {
    const filteredItems = this.state.items.filter(item => {
      return item.id !== newdata
    })
    this.setState({
      items: filteredItems,
    })
  }
  whichComponent = (component) =>{
    if(component === 'class'){
      return <Classes visible={true} success={this.success} />
    } else if(component === 'subject'){
      return <Subjects visible={true} success={this.success}/>
    } else if(component === 'question'){
      return <Question visible={true} success={this.success}/>
    }
  }

   render(){
     console.log("items", this.state.items)
     const { visible, loading } = this.state;

    return (
        <div className="body">
           <Layout>
                <Header style={{backgroundColor:'#f5fafa',textAlign:'right', alignItems:'flex-end'}}>
                  <Button type="primary" style={{marginLeft:10,}} onClick={()=> this.showModal('class')} icon="plus">Class</Button>
                  <Button type="primary" style={{marginLeft:10,}} onClick={()=> this.showModal('subject')} icon="plus">Subject</Button>
                  <Button type="primary" style={{marginLeft:10,}} onClick={()=> this.showModal('question')} icon="plus">Question</Button>
                  <Button type="primary" style={{marginLeft:10,}} onClick={()=> this.exportDoc()} icon="upload">Export</Button>

                </Header>
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
                          <Card title={data.title} key={key} extra={<Row>marks {data.marks} <Icon type="close" style={{marginLeft:10,}} onClick={()=>this.remove(data.id)} /></Row>} bordered={false}>
                            <p><span>{key}.</span>{data.body}</p>
                          </Card>
                        ))

                     : null}
                    </Content>
                </Layout>
                </Layout>
                <Modal
                        visible={visible}
                        title="Add New"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        width={1100}
                        >  
                         {this.whichComponent(this.state.component)}
                </Modal>
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