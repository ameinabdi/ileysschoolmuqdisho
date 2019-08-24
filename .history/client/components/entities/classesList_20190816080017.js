import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as classesService from '../../services/classService';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';
import { Table, Divider, Tag, Icon, Modal, input} from 'antd';

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

class ClassesList extends Component {
    constructor(props){
     super(props);
    this.state = {
        loading: false,
        visible: false,
        expand: false,
        classes: [],
        errors: "",
        editData: []
      };
    }
    
    componentWillReceiveProps(Props){
        if(Props.classes.data){
            this.setState({
             classes:Props.classes.data
            })
        }

    }
    componentWillMount(){
        this.props.actions.Classes()
    }
  
    handleSubmit = (event, errors, values) => {
        const { className} = values
        const id = this.state.editData.classId;
        console.log('values',values);
        this.props.actions.UpdateClass({className, id})
        this.handleCancel()
        };
        handleCancel = () => {
            this.setState({ visible: false });
          };
     onDelete = (data) =>{
        console.log(data)
        this.props.actions.DeleteClass(data.classId)
     }

      render() {
        const { visible, loading, classes,  editData} = this.state;
        console.log("visible", classes)

        return (
            <div>
            <Table dataSource={classes}>
            <Column title="ID" dataIndex="classId" key="classId" />
            <Column title="className" dataIndex="className" key="className" />
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
                <a href="javascript:;" onClick={()=>this.setState({
                    visible: true,
                    editData: record
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
                    <AvGroup>
                        <Label for="className">Class Name</Label>
                        {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                        <AvInput name="className" id="street" required value={this.state.editData.className}/>
                        {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                        <AvFeedback>This is an error!</AvFeedback>
                    </AvGroup>
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
    classes: state.classes.classes
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, classesService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesList);