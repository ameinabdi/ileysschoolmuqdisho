import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as questionService from '../../services/questionService';
import { Layout, Menu, Breadcrumb, Icon, List, Tree, Input } from 'antd';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import './slider.scss';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { TreeNode } = Tree;
const { Search } = Input;
 
class SiderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alldata:null,
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            items:null,
            selected:null
        }
    }  
componentDidMount(){
    this.props.actions.question()
}
componentWillReceiveProps(Props){
    console.log("wqwqwqqw", Props)
 this.setState({
     alldata:Props.question,
     
 })
}


    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        return (
            <div>
               <Sider width={300} style={{ background: '#fff' }}>
               <Menu
                  onClick={this.handleClick}
                  style={{ width: 300 }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                >
                {this.state.alldata ? 
                this.state.alldata.questions.map((items, key) =>(
                  <SubMenu
                  key={items.id}
                  title={
                    <span>
                      <span>{items.class}</span>
                    </span>
                  }
                  >
                  { items.section.map((item, key) =>(
                     <SubMenu
                     key={item.sectionid}
                     title={
                       <span>
                         <span>{item.subject}</span>
                       </span>
                     }
                   >
                       { item.quiz.map((quizitem, key) =>(
                        <Menu.Item key={quizitem.id} onClick={() =>this.props.papers(quizitem)}>
                          <span>
                          <Icon type="setting" />
                            {quizitem.body}
                           </span>
                        </Menu.Item>
                        ))
                      } 
                    </SubMenu>
                  ))
                  }
                    </SubMenu>
                ))
              : null
                } 
      </Menu>
                </Sider>
            </div>
        )
    }
}

/**
 * Map the state to props.
 */
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

export default connect(mapStateToProps, mapDispatchToProps)(SiderComponent);