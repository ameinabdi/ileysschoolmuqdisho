import React, { Component } from 'react'
import { input, Icon } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as classesService from '../../services/classService';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';

class classes extends Component {
    constructor(props){
     super(props);
    this.state = {
        loading: false,
        visible: false,
        expand: false,
        errors: ""
      };
    }
    
    componentWillReceiveProps(Props){
      console.log("newProps", this.props)
      if(Props.classes.success == true){
        this.props.success({'visible':true})
      } else{
        this.setState({
            errors: Props.classes,
        });
      }
    }
    handleSubmit = (event, errors, values) => {
            console.log('values', values);
            if (errors.length === 0) {

            this.props.actions.AddClass(values)
            };
          }
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      render() {
        const { visible, loading } = this.state;
        console.log("visible", this.props.visible)
        return (
            <AvForm onSubmit={this.handleSubmit}>
                    <AvGroup>
                        <Label for="className">Class Name</Label>
                        {/* dot notation for the name to access deep values. The shape is also the same in the submit callbacks */}
                        <AvInput name="className" id="street" required />
                        {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                        <AvFeedback>This is an error!</AvFeedback>
                    </AvGroup>
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
    classes: state.classes.classes
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, classesService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(classes);