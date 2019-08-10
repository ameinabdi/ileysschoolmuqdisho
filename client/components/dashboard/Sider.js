import React, { Component } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as questionService from '../../services/questionService';
import { Layout, Menu, Breadcrumb, Icon, List, Tree, Input } from 'antd';
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

class SiderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alldata:null,
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        }
    }

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
        console.log("aaaaaaaaaaaa", this.state.alldata, gData)
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data =>
          data.map(item => {
            const index = item.class;
            const beforeStr = item.class;
            const afterStr = item.class;
            const title =
              index > -1 ? (
                <span>
                  {beforeStr}
                  <span style={{ color: '#f50' }}>{searchValue}</span>
                  {afterStr}
                </span>
              ) : (
                <span>{item.subject}</span>
              );
            if (item.code) {
              return (
                <TreeNode key={item.color} title={item.subject}>
                  {loop(item.code)}
                </TreeNode>
              );
            }
            return <TreeNode key={item.subject} title={item.body}>
                     <span>{item.title}</span>
                    </TreeNode>;
          });
        return (
            <div>
               <Sider width={300} style={{ background: '#fff' }}>
                   
               <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                    <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    >
                    {this.state.alldata  != null ? loop(this.state.alldata.colors): null }
                    </Tree>
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