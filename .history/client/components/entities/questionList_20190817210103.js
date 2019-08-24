import React, { Component } from 'react'
import { input, Icon } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as questionService from '../../services/questionService';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';
import { Table, Divider, Tag } from 'antd';

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
        errors: ""
      };
    }
    
    componentWillReceiveProps(Props){
        if(Props.question.data){
            this.setState({
             Question:Props.question.data
            })
        }

    }
    componentWillMount(){
        this.props.actions.Questions()
    }

    handleSubmit = (event, errors, values) => {
      const { subjectName, select} = values
      const classId = select
      const id = this.state.editDate.subjectId;
      console.log('values',values);
      if (errors.length === 0) {
      this.props.actions.UpdateSubject({subjectName, classId, id})
      }
      };
      handleCancel = () => {
          this.setState({ visible: false });
        };
   onDelete = (data) =>{
      console.log(data)
      this.props.actions.DeleteSubject(data.subjectId)
   }
  
      render() {
        const { visible, loading, Question } = this.state;
        console.log("visible", Question)
        return (
         <div>
            <Table dataSource={Question}>
            <ColumnGroup title="Name">
              <Column title="First Name" dataIndex="firstName" key="firstName" />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={tags => (
                <span>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </span>
              )}
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
                                <AvInput name="title" id="title" required />
                                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label for="className">Subject Name</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                  <AvField type="select" name="subjectId" helpMessage="select Subject Name" required>
                                    <option>Select Subject</option>

                                     {subjectdata ?
                                        subjectdata.map((items, key) =>(
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
                                  <option>Select Class</option>

                                     {classdata ?
                                        classdata.map((items, key) =>(
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
                                <AvInput name="marks" id="marks" required />
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
                                <AvInput type="textarea" name="body" id="question" required />
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
    actions: bindActionCreators(Object.assign({}, questionService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);