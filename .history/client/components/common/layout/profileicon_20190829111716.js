import React, { Component } from 'react'
import { input, Icon } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Avatar,  Menu, Breadcrumb, Modal, Button, Dropdown, } from 'antd';
import * as authService from '../../../services/authService';
import {getLocalStorage, clearLocalStorage} from '../../../utils/storageUtil';


class ProfileIcon extends Component {
    constructor(props){
     super(props);
    this.state = {
        
      };
    }
   componentWillMount(){
    //this.props.actions.user()
   }
   
    
    
      render() {
          const data = getLocalStorage('user');
          console.log('saas', data)
        const menu = (
            <Menu>
              <Menu.Divider />
              <Menu.Item key="3"  onClick={()=>this.props.actions.logout()}>Log Out</Menu.Item>
            </Menu>
          );
         return (
             <div>
                  <Dropdown overlay={menu} trigger={['click']} style={{alignSelf:'flex-end', fontSize:13}}>
                                <a href="#">
                                {data.first_name+' '+ data.last_name}
                                <Avatar style={{marginLeft:10}}>{data.first_name + data.last_name}</Avatar>
                                </a>
                 </Dropdown>
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
    users: bindActionCreators(Object.assign({}, authService), dispatch),
    actions: bindActionCreators(Object.assign({}, authService), dispatch)

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);