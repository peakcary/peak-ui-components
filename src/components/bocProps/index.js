import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Select, Card } from 'antd';

import './index.css';
import 'antd/dist/antd.css';

const { Option } = Select;

class BocProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataC: [],
      selectedValue:""
    }
  }

  componentDidMount() {
    const { ptype } = this.props;
    let url = '/api/property/user/properties';
    if (ptype === 'event') {
      url = `/api/v2/sf/events/all?project=default&cache=false&invisible=false&check_permission=false`;
    }
    if (ptype === 'product'){
      url = `/api/v2/sf/items/type?project=default&cache=false&invisible=false&check_permission=false`;
    }
    axios.get(url,
      {
        params: {},
        headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
      },
    ).then((d) => {
      this.setState({
        data: d.data
      })
    });
  }

  onChange = (value) => {
    console.log(value)
    let selectedValue = "";
    const {ptype} = this.props;
    if(ptype === 'user'){
      selectedValue = "${user." + value + "}";
      this.setState({
        selectedValue
      })
    }
    if (ptype === 'event') {
      let url = '/api/event/properties?events=' + value;
      axios.get(url,
        {
          params: {},
          headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
        },
      ).then((d) => {
        console.log('ddd:', d.data[value].event)
        this.setState({
          dataC: d.data[value].event
        })
      });
    }
    if (ptype === 'product') {
      let url = '/api/v2/sf/items/properties?project=default&item_type=' + value;
      axios.get(url,
        {
          params: {},
          headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
        },
      ).then((d) => {
        console.log(d.data)
        this.setState({
          dataC: d.data
        })
      });
    }
  }

  onChangeC = (value) => {
    console.log(value)
    let selectedValue = "";
    const { ptype } = this.props;
    if (ptype === 'event') {
      selectedValue = "${event." + value + "}";
      this.setState({
        selectedValue
      })
    }
    if (ptype === 'product') {
      selectedValue = "${item." + value + "}";
      this.setState({
        selectedValue
      })
    }
  }

  onConfirm = () => {
    this.props.onConfirm(this.state.selectedValue);
  }


  render() {
    const { ptype, readonly } = this.props;
    const { dataC} = this.state;

    let title = '';
    let label = "";
    let labelC = "";
    if (ptype === 'user') {
      title = '用户属性';
      label = "请选择用户属性:";
    }
    if (ptype === 'event') {
      title = '事件属性';
      label = "请选择事件:";
      labelC = "请选择事件属性:";
    }
    if (ptype === 'product') {
      title = '产品属性';
      label = "请选择产品:";
      labelC = "请选择产品属性:";
    }

    return (
      <>
        <Card title={title} >
          <div className='select_container'>
            <div className='select_row'>
              <div className='select_label'>
                {label}
              </div>
              <div className='select_value'>
                <Select
                  disabled={readonly}

                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.data.map(item => {
                    return <Option key={item.name}>{item.cname}</Option>
                  })}
                </Select>
              </div>
            </div>
            {(ptype === 'event' || ptype === 'product'  ) && <div className='select_row'>
              <div className='select_label'>
                {labelC}
              </div>
              <div className='select_value'>
                <Select
                  disabled={readonly}

                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.onChangeC}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  { this.state.dataC.map(item => {
                    return <Option key={item.name}>{item.cname}</Option>
                  })}
                </Select>
              </div>
            </div>}
          </div>
          <div className='select_btn'>
            <Button onClick={this.onConfirm}>插入</Button>
          </div>
        </Card>
      </>
    );
  }
}





BocProps.propTypes = {
  ptype: PropTypes.string,// 类型 用户属性 user 事件属性event 产品属性product 白名单white
  initialValue: PropTypes.string,//初始值
  readonly: PropTypes.bool,// 只读 false
  onConfirm: PropTypes.func// 插入
};

export default BocProps;








/*
const BocProps = ({ ptype, initialValue, readonly, onConfirm }) => {
  const [data, setData] = useState({ data: [] });
  const [dataP, setDataP] = useState({ dataP: [] });
  let v = '';
  const childrenP = [];
  const children = [];
  let title = "";
  let selectedValue = '';
  function onChange(value) {
    // 用户属性：${ user.$mp_nickname }
    // 事件属性： ${ event.$mp_content } 只能触发型计划插入，只能插入触发选择的事件属性
    // 白名单属性：${ tag.{ tagcode }.$name } 待确认
    // 产品属性:${ item.属性名称 }

    let v = "${user." + value + "}";
    selectedValue = v;
  }

  function onChangeEvent(value) {
    let url = '/api/event/properties?events=' + value;
    axios.get(url,
      {
        params: {},
        headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
      },
    ).then((d) => {
      console.log(d.data[value].event)
      setData(d.data[value].event);
    });

    console.log(data, 'data')
    for (let i = 0, l = data.length; i < l; i++) {
      children.push(<Option key={data[i].name}>{data[i].cname}</Option>);
    }
  }



  if (ptype === 'user') {
    title = '用户属性';
    v = initialValue.split('${user.')[1];
    v = v.substring(0, v.length - 1)
    useEffect(async () => {
      let url = '/api/property/user/properties';
      const data = await axios.get(url,
        {
          params: {},
          headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
        },
      );
      setData(data.data);
    }, []);

    for (let i = 0, l = data.length; i < l; i++) {
      children.push(<Option key={data[i].name}>{data[i].cname}</Option>);
    }
  }
  if (ptype === 'event') {

    title = '事件属性';
    // v = initialValue.split('${user.')[1];
    // v = v.substring(0, v.length - 1)
    useEffect(async () => {
      // let url = '/api/events/all?project=default';
      let url = `/api/v2/sf/events/all?project=default&cache=false&invisible=false&check_permission=false`;
      const data = await axios.get(url,
        {
          params: {},
          headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
        },
      );
      setDataP(data.data);
    }, []);

    for (let i = 0, l = dataP.length; i < l; i++) {
      childrenP.push(<Option key={dataP[i].name}>{dataP[i].cname}</Option>);
    }
  }




  return (
    <>
      <Card title={title} >
        {ptype === 'user' && <div className='select_container'>
          <div className='select_row'>
            <div className='select_label'>
              请选择用户属性:
            </div>
            <div className='select_value'>
              <Select
                disabled={readonly}
                defaultValue={v}
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {children}
              </Select>
            </div>
          </div>

        </div>
        }
        {ptype === 'event' && <div className='select_container'>
          <div className='select_row'>
            <div className='select_label'>
              请选择事件:
            </div>
            <div className='select_value'>
              <Select
                disabled={readonly}
                defaultValue={v}
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChangeEvent}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {childrenP}
              </Select>
            </div>
          </div>
          <div className='select_row'>
            <div className='select_label'>
              请选择事件属性:
            </div>
            <div className='select_value'>
              <Select
                disabled={readonly}
                defaultValue={v}
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {children}
              </Select>
            </div>
          </div>

        </div>}
        <div className='select_btn'>
          <Button onClick={() => { onConfirm(selectedValue) }}>插入</Button>
        </div>
      </Card>
    </>
  )
}

*/


