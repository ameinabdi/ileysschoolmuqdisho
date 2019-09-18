import React, { Component } from 'react'
import { input, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as classService from '../../services/classService';
import * as subjectService from '../../services/subjectService';
import * as questionService from '../../services/questionService';

import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label, FormGroup } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            expand: false,
            errors: "",
            classdata: null,
            subjectdata: null,
            question: null,
        };
    }

    componentWillMount() {
        this.props.actions.Classes()
        this.props.subjects.Subjects()
    }

    componentWillReceiveProps(Props) {
        console.log("newPropsQuestions", Props)
        if (Props.subject) {
            this.setState({ classdata: Props.classes.data, subjectdata: Props.subject.data })
        }
        else {
            this.setState({
                errors: Props.subject,
            });
        }
    }
    handleSubmit = (event, errors, values) => {
        console.log('values', values);
        if (errors.length === 0) {
            const { title, subjectId, classId, marks, } = values;
            const body = this.state.question
            this.props.questions.AddQuestion({ title, subjectId, classId, marks, body })
            this.props.success({ 'visible': true })
        }

    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading, classdata, subjectdata, question } = this.state;
        console.log("visible", classdata, subjectdata)
        return (
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
                                    subjectdata.map((items, key) => (
                                        <option value={items.subjectId} key={key}>{items.SubjectName}</option>
                                    ))
                                    : null
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
                                    classdata.map((items, key) => (
                                        <option value={items.classId} key={key}>{items.className}</option>
                                    ))
                                    : null
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
                            <Editor
                                editorState={question}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                            />
                        </AvGroup>
                    </Col>
                </Row>
                <Button color="primary">Save</Button>
                {this.state.errors ?
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
    subject: state.subject.subject,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, classService), dispatch),
    subjects: bindActionCreators(Object.assign({}, subjectService), dispatch),
    questions: bindActionCreators(Object.assign({}, questionService), dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(Question);