import React, { Component } from 'react'
import { input, Icon } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as classService from '../../services/classService';
import * as subjectService from '../../services/subjectService';

import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';

class Subjects extends Component {
    constructor(props){
     super(props);
    this.state = {
        loading: false,
        visible: false,
        expand: false,
        errors: "",
        alldata: null
      };
    }

    componentWillMount(){
        this.props.actions.Classes()
    }
    
    componentWillReceiveProps(Props){
      console.log("newProps", Props)
      this.setState({alldata: Props.classes.data })
      if(Props.subject){
        this.props.success({'visible':true})
      } else{
        this.setState({
            errors: Props.subject,
        });
      }
    }
    handleSubmit = (event, errors, values) => {
            const { subjectName, select} = values
            const classId = select
            console.log('values', subjectName, classId);
            this.props.subjects.AddSubject({subjectName, classId})
            this.props.success({'visible':true})

            };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      render() {
        const { visible, loading, alldata} = this.state;
        console.log("visible", alldata)
        return (
            <AvForm onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <AvGroup>
                                <Label for="className">Subject Name</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                <AvInput name="subjectName" id="street" required />
                                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                                <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label for="className">Class Name</Label>
                                {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                                  <AvField type="select" name="select" helpMessage="select Class Name">
                                   <option >Select Class</option>

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
                    </Row>
                    <Button color="primary">Save</Button>
                    { this.state.errors ? 
                     <p>{this.state.errors}</p>
                     : null
                    }
            </AvForm>
        );
      }
    
}


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    question: state.question.question,
    errorMessage: state.auth.errorMessage,
    classes: state.classes.classes,
    subject: state.subject.subject
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, classService), dispatch),
    subjects: bindActionCreators(Object.assign({}, subjectService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);