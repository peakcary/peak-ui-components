import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Select, Card } from 'antd';

import './index.css';
import 'antd/dist/antd.css';

const { Option } = Select;

let selectedValue = '';
function onChange(value) {
  // 用户属性：${ user.$mp_nickname }
  // 事件属性： ${ event.$mp_content } 只能触发型计划插入，只能插入触发选择的事件属性
  // 白名单属性：${ tag.{ tagcode }.$name } 待确认
  // 产品属性:${ item.属性名称 }
  let v = "${user." + value + "}";
  console.log(v)
  selectedValue = v;
}

const BocProps = ({ ptype, initialValue, readonly, onConfirm }) => {

  console.log('initialValue:', initialValue);
  let v = '';
  if (ptype === 'user') {
    v = initialValue.split('${user.')[1];
    v = v.substring(0, v.length - 1)
    console.log(v)
  }

  const [data, setData] = useState({ data: [] });
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



  const children = [];
  for (let i = 0, l = data.length; i < l; i++) {
    children.push(<Option key={data[i].name}>{data[i].cname}</Option>);
  }

  return (
    <>
      <Card title='用户属性' style={{ width: 600 }}>
        <div className='select_container'>
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
        <div className='select_btn'>
          <Button onClick={() => { onConfirm(selectedValue) }}>插入</Button>
        </div>
      </Card>
    </>
  )
}


BocProps.propTypes = {
  ptype: PropTypes.string,// 类型 用户属性 user 事件属性event 产品属性product 白名单white
  initialValue: PropTypes.string,//初始值
  readonly: PropTypes.bool,// 只读 false
  onConfirm: PropTypes.func// 插入
};

export default BocProps;
