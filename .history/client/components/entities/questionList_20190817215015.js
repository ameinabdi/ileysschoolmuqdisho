import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as questionService from '../../services/questionService';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';
import { Table, Divider, Tag, Modal, Icon } from 'antd';
import * as classService from '../../services/classService';
import * as subjectService from '../../services/subjectService';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class QuestionsList extends Component {
    constructor(props){
     super(props);
    this.state = {
        loading: false,
        visible: false,
        expand: false,
        Question:[],
        errors: "",
        editDate:[],
        subject:[],
        alldata:[]
      };
    }
    
    componentWillReceiveProps(Props){
      console.log("newpropquestion", Props.question)
        if(Props.question.data){
            this.setState({
             Question:Props.question.data
            })
        }
        if(Props.subject.data && Props.classessubject){
          this.setState({
           subject:Props.subject.data,
           alldata: Props.classessubject.data 
          })
      }


    }
    componentWillMount(){
        this.props.subject.Subjects()
        this.props.classes.Classes()
        this.props.actions.allQuestions()
    }

    handleSubmit = (event, errors, values) => {
      const { title, subjectId, classId, marks, body} = values;
      const id = this.state.editDate.subjectId;
      console.log('values',values);
      if (errors.length === 0) {
      this.props.actions.UpdateQuestion({title, subjectId, classId, marks, body, id})

      }
      };
      handleCancel = () => {
          this.setState({ visible: false });
        };
   onDelete = (data) =>{
      console.log(data)
      this.props.actions.DeleteQuestion(data.subjectId)
   }
  
      render() {
        const { visible, loading, Question, subject, alldata, editDate } = this.state;
        console.log("visible", Question)
        return (
         <div>
            <Table dataSource={Question}>
            <Column title="Title" dataIndex="Title" key="Title" />
            <Column title="marks" dataIndex="marks" key="marks" />
            <Column title="Class Name" dataIndex="className" key="className" />
            <Column title="Subject Name" dataIndex="subjectName" key="subjectName" />
            <Column
              title="Question"
              dataIndex="question"
              key="question"
            />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <a href="javascript:;" onClick={()=>this.setState({
                      visible: true,
                      editDate: record
                  })}><Icon type="edit" size={30}/></a>
                  <Divider type="vertical" />
                  <a href="javascript:;" onClick={()=>this.onDelete(record)}><Icon type="close-circle" size={30} /></a>
                </span>
              )}
            />
          </Table> 
          <Modal
          visible={visible}
          title="Add New"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={1100}
          >  
          <AvForm onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <AvGroup>
                                <Label for="className">Title</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                <AvInput name="title" id="title" required  value={editDate.Title}/>
                                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label for="className">Subject Name</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                  <AvField type="select" name="subjectId" helpMessage="select Subject Name" required>
                                    <option value={editDate.subjectId}>{editDate.subjectName}</option>

                                     {subject ?
                                        subject.map((items, key) =>(
                                            <option value={items.subjectId} key={key}>{items.SubjectName}</option>
                                        ))
                                        :null
                                        }
                                    </AvField>
                                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label for="className">Class Name</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                  <AvField type="select" name="classId" helpMessage="select Class Name" required>
                                  <option value={editDate.ClassId}>{editDate.className}</option>

                                     {alldata ?
                                        alldata.map((items, key) =>(
                                            <option value={items.classId} key={key}>{items.className}</option>
                                        ))
                                        :null
                                        }
                                    </AvField>
                                    {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label for="className">Marks</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                <AvInput name="marks" id="marks" required  value={editDate.marks}/>
                                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                         <AvGroup>
                                <Label for="className">Question</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                <AvInput type="textarea" name="body" id="question" required  value={editDate.question}/>
                                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                    </Col>
                    </Row>
                    <Button color="primary">Save</Button>
                    { this.state.errors ? 
                     <p>{this.state.errors}</p>
                     : null
                    }
            </AvForm>
          </Modal>
          </div>
        );
      }
    
}


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    question: state.question.question,
    errorMessage: state.auth.errorMessage,
    subject: state.subject.subject
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, questionService), dispatch),
    subject: bindActionCreators(Object.assign({}, subjectService), dispatch),
    classes: bindActionCreators(Object.assign({}, classService), dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);