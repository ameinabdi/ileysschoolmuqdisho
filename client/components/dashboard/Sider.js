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
const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'lightblue',

  // styles we need to apply on draggables
  ...draggableStyle
});


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

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

    onDragEnd = result => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
          return;
      }

      if (source.droppableId === destination.droppableId) {
          const items = reorder(
              this.getList(source.droppableId),
              source.index,
              destination.index
          );

          let state = { items };

          if (source.droppableId === 'droppable2') {
              state = { selected: items };
          }

          this.setState(state);
      } else {
          const result = move(
              this.getList(source.droppableId),
              this.getList(destination.droppableId),
              source,
              destination
          );

          this.setState({
              items: result.droppable,
              selected: result.droppable2
          });
      }
  };

    onExpand = expandedKeys => {
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      };
    
      onChange = e => {
        const { value } = e.target;
        const expandedKeys = dataList
          .map(item => {
            if (item.title.indexOf(value) > -1) {
              return getParentKey(item.key, gData);
            }
            return null;
          })
          .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
          expandedKeys,
          searchValue: value,
          autoExpandParent: true,
        });
      };

      
componentWillMount(){
    //this.props.actions.question()
}
componentWillReceiveProps(Props){
    console.log("wqwqwqqw", Props)
 this.setState({
     alldata:Props.question,
     
 })
}

    render() {
        console.log("aaaaaaaaaaaa", this.state.alldata, gData)
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
           this.state.alldata.colors.map((items, key) =>(
            <SubMenu
            key={items.id}
            title={
              <span>
                <span>{items.subject}</span>
              </span>
            }
          >
            { items.code.map((item, key) =>(
               <Menu.Item key={item.id}>
               <Draggable draggableId={item.id} index={0}>
               {(provided, snapshot) => (
                 <div
                   className="items"
                   ref={provided.innerRef}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}
                   style={getItemStyle(
                     snapshot.isDragging,
                     provided.draggableProps.style
                 )}
                 > 
               {item.body}
                </div>
              )}
            </Draggable>
            </Menu.Item>
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