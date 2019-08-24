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
          <AvForm>
          <AvField name="required" label="Required" type="text" required />
          <AvField name="requiredProp" label="Required (validate prop)" type="text" validate={{required: true}} />
          <Button color="primary">Submit</Button>
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