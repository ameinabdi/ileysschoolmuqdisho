import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as subjectService from '../../services/subjectService';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';
import { Table, Divider, Tag, Icon, Modal } from 'antd';
import * as classService from '../../services/classService';

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

class SubjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      expand: false,
      subject: [],
      editDate: [],
      errors: "",
      alldata: []
    };
  }
  componentWillMount() {
    this.props.actions.Subjects()
    this.props.classes.Classes()

  }
  componentWillReceiveProps(Props) {
    console.log('newProps', Props)
    if (Props.subject.data && Props.classessubject) {
      this.setState({
        subject: Props.subject.data,
        alldata: Props.classessubject.data
      })
    }

  }

  handleSubmit = (event, errors, values) => {
    const { subjectName, select } = values
    const classId = select
    const id = this.state.editDate.subjectId;
    console.log('values', values);
    if (errors.length === 0) {
      this.props.actions.UpdateSubject({ subjectName, classId, id })
      this.handleCancel()
    }
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  onDelete = (data) => {
    console.log(data)
    this.props.actions.DeleteSubject(data.subjectId)
  }

  render() {
    const { visible, loading, subject, alldata, editDate } = this.state;
    console.log("visible", subject)
    return (
      <div>
        <Table dataSource={subject}>
          <Column title="ID" dataIndex="subjectId" key="subjectId" />
          <Column title="subject Name" dataIndex="SubjectName" key="SubjectName" />
          <Column title="Class Name" dataIndex="className" key="className" />
          <Column
            title="Created At"
            dataIndex="created_at"
            key="created_at"
          />
          <Column
            title="Updated At"
            dataIndex="updated_at"
            key="updated_at"
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a href="javascript:;" onClick={() => this.setState({
                  visible: true,
                  editDate: record
                })}><Icon type="edit" size={30} /></a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={() => this.onDelete(record)}><Icon type="close-circle" size={30} /></a>
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
                  <Label for="className">Subject Name</Label>
                  {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                  <AvInput name="subjectName" id="street" validate={{ required: true }} value={editDate.SubjectName} />
                  {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                  <AvFeedback>This is an error!</AvFeedback>
                </AvGroup>
              </Col>
              <Col>
                <AvGroup>
                  <Label for="className">Class Name</Label>
                  {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                  <AvField type="select" name="select" helpMessage="select Class Name" validate={{ required: true }} >
                    <option value={editDate.classId} key={editDate.classId} selected>{editDate.className}</option>

                    {alldata ?
                      alldata.map((items, key) => (
                        <option value={items.classId} key={key}>{items.className}</option>
                      ))
                      : null
                    }
                  </AvField>
                  {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                  <AvFeedback>This is an error!</AvFeedback>
                </AvGroup>
              </Col>
            </Row>
            <Button color="primary">Save</Button>
            {this.state.errors ?
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
  subject: state.subject.subject,
  classessubject: state.classes.classes
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, subjectService), dispatch),
  classes: bindActionCreators(Object.assign({}, classService), dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);