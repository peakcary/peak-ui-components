function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Select, Card } from 'antd';
import './index.css';
import 'antd/dist/antd.css';
var Option = Select.Option;

var BocProps =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(BocProps, _Component);

  function BocProps(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.onChange = function (value) {
      console.log(value);
      var selectedValue = "";
      var ptype = _this.props.ptype;

      if (ptype === 'user') {
        selectedValue = "${user." + value + "}";

        _this.setState({
          selectedValue: selectedValue
        });
      }

      if (ptype === 'event') {
        var url = '/api/event/properties?events=' + value;
        axios.get(url, {
          params: {},
          headers: {
            token: '$6666ebc5599b852f3a8f81c1fdcd3575'
          }
        }).then(function (d) {
          console.log('ddd:', d.data[value].event);

          _this.setState({
            dataC: d.data[value].event
          });
        });
      }

      if (ptype === 'product') {
        var _url = '/api/v2/sf/items/properties?project=default&item_type=' + value;

        axios.get(_url, {
          params: {},
          headers: {
            token: '$6666ebc5599b852f3a8f81c1fdcd3575'
          }
        }).then(function (d) {
          console.log(d.data);

          _this.setState({
            dataC: d.data
          });
        });
      }
    };

    _this.onChangeC = function (value) {
      console.log(value);
      var selectedValue = "";
      var ptype = _this.props.ptype;

      if (ptype === 'event') {
        selectedValue = "${event." + value + "}";

        _this.setState({
          selectedValue: selectedValue
        });
      }

      if (ptype === 'product') {
        selectedValue = "${item." + value + "}";

        _this.setState({
          selectedValue: selectedValue
        });
      }
    };

    _this.onConfirm = function () {
      _this.props.onConfirm(_this.state.selectedValue);
    };

    _this.state = {
      data: [],
      dataC: [],
      selectedValue: ""
    };
    return _this;
  }

  var _proto = BocProps.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var ptype = this.props.ptype;
    var url = '/api/property/user/properties';

    if (ptype === 'event') {
      url = "/api/v2/sf/events/all?project=default&cache=false&invisible=false&check_permission=false";
    }

    if (ptype === 'product') {
      url = "/api/v2/sf/items/type?project=default&cache=false&invisible=false&check_permission=false";
    }

    axios.get(url, {
      params: {},
      headers: {
        token: '$6666ebc5599b852f3a8f81c1fdcd3575'
      }
    }).then(function (d) {
      _this2.setState({
        data: d.data
      });
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        ptype = _this$props.ptype,
        readonly = _this$props.readonly;
    var dataC = this.state.dataC;
    var title = '';
    var label = "";
    var labelC = "";

    if (ptype === 'user') {
      title = '????????????';
      label = "????????????:";
    }

    if (ptype === 'event') {
      title = '????????????';
      label = "????????????";
      labelC = "????????????";
    }

    if (ptype === 'product') {
      title = '????????????';
      label = "????????????";
      labelC = "????????????";
    }

    return React.createElement(React.Fragment, null, React.createElement(Card, {
      bordered: false,
      extra: React.createElement("a", {
        href: "#"
      }, "Close"),
      title: title
    }, React.createElement("div", {
      className: "select_container"
    }, React.createElement("div", {
      className: "select_row"
    }, React.createElement("div", {
      className: "select_label"
    }, label), React.createElement("div", {
      className: "select_value"
    }, React.createElement(Select, {
      disabled: readonly,
      showSearch: true,
      style: {
        width: 200
      },
      placeholder: "\u8BF7\u9009\u62E9",
      optionFilterProp: "children",
      onChange: this.onChange,
      filterOption: function filterOption(input, option) {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }
    }, this.state.data.map(function (item) {
      return React.createElement(Option, {
        key: item.name
      }, item.cname);
    })))), (ptype === 'event' || ptype === 'product') && React.createElement("div", {
      className: "select_row"
    }, React.createElement("div", {
      className: "select_label"
    }, labelC), React.createElement("div", {
      className: "select_value"
    }, React.createElement(Select, {
      disabled: readonly,
      showSearch: true,
      style: {
        width: 200
      },
      placeholder: "\u8BF7\u9009\u62E9",
      optionFilterProp: "children",
      onChange: this.onChangeC,
      filterOption: function filterOption(input, option) {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }
    }, dataC.map(function (item) {
      return React.createElement(Option, {
        key: item.name
      }, item.cname);
    }))))), React.createElement("div", {
      className: "select_line"
    }), React.createElement("div", {
      className: "select_btn"
    }, React.createElement(Button, {
      style: {
        borderColor: '#fff'
      },
      onClick: this.onConfirm
    }, "\u53D6\u6D88"), React.createElement(Button, {
      type: "primary",
      className: "btn",
      style: {
        backgroundColor: '#00BF8A',
        borderColor: '#00BF8A'
      },
      onClick: this.onConfirm
    }, "\u63D2\u5165"))));
  };

  return BocProps;
}(Component);

BocProps.propTypes = {
  ptype: PropTypes.string,
  // ?????? ???????????? user ????????????event ????????????product ?????????white
  initialValue: PropTypes.string,
  //?????????
  readonly: PropTypes.bool,
  // ?????? false
  onConfirm: PropTypes.func // ??????

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
    // ???????????????${ user.$mp_nickname }
    // ??????????????? ${ event.$mp_content } ?????????????????????????????????????????????????????????????????????
    // ??????????????????${ tag.{ tagcode }.$name } ?????????
    // ????????????:${ item.???????????? }

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
    title = '????????????';
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

    title = '????????????';
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
              ?????????????????????:
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
              ???????????????:
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
              ?????????????????????:
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
          <Button onClick={() => { onConfirm(selectedValue) }}>??????</Button>
        </div>
      </Card>
    </>
  )
}

*/