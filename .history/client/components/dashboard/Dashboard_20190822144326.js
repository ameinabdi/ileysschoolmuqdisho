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
      console.log("hello")
      const doc = new Document();
      const { items } = this.state;
      const experiences = [
        {
            isCurrent: true,
            summary: "Full-stack developer working with Angular and Java. Working for the iShares platform",
            title: "Associate Software Developer",
            startDate: {
                month: 11,
                year: 2017,
            },
            company: {
                name: "BlackRock",
            },
        },
        {
            isCurrent: false,
            summary:
                "Full-stack developer working with Angular, Node and TypeScript. Working for the iShares platform. Emphasis on Dev-ops and developing the continous integration pipeline.",
            title: "Software Developer",
            endDate: {
                month: 11,
                year: 2017,
            },
            startDate: {
                month: 10,
                year: 2016,
            },
            company: {
                name: "Torch Markets",
            },
        },
        {
            isCurrent: false,
            summary:
                "Used ASP.NET MVC 5 to produce a diversity data collection tool for the future of British television.\n\nUsed AngularJS and C# best practices. Technologies used include JavaScript, ASP.NET MVC 5, SQL, Oracle, SASS, Bootstrap, Grunt.",
            title: "Software Developer",
            endDate: {
                month: 10,
                year: 2016,
            },
            startDate: {
                month: 3,
                year: 2015,
            },
            company: {
                name: "Soundmouse",
            },
        },
        {
            isCurrent: false,
            summary:
                "Develop web commerce platforms for various high profile clients.\n\nCreated a log analysis web application with the Play Framework in Java, incorporating Test Driven Development. It asynchronously uploads and processes large (2 GB) log files, and outputs meaningful results in context with the problem. \n\nAnalysis  and  development  of  the payment system infrastructure and user accounts section to be used by several clients of the company such as Waitrose, Tally Weijl, DJ Sports, Debenhams, Ann Summers, John Lewis and others.\n\nTechnologies used include WebSphere Commerce, Java, JavaScript and JSP.",
            title: "Java Developer",
            endDate: {
                month: 10,
                year: 2014,
            },
            startDate: {
                month: 3,
                year: 2013,
            },
            company: {
                name: "Soundmouse",
            },
        },
    ];
        doc.addSection({
           children: [
            ...experiences
            .map((position) => {
                const arr = [];

                arr.push(
                    this.createInstitutionHeader(
                        position.company.name,
                        this.createPositionDateText(position.startDate, position.endDate, position.isCurrent),
                    ),
                );
                arr.push(this.createRoleText(position.title));

                const bulletPoints = this.splitParagraphIntoBullets(position.summary);

                bulletPoints.forEach((bulletPoint) => {
                    arr.push(this.createBullet(bulletPoint));
                });

                return arr;
            })
            .reduce((prev, curr) => prev.concat(curr), []),
          ],
        });

       
      Packer.toBuffer(doc).then((buffer) => {
        var file = new File([buffer], "My Document.txt", {type: "text/plain;charset=utf-8"});
        saveAs(file, "My Document.docx");
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