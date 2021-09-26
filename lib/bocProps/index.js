"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axios = _interopRequireDefault(require("axios"));

var _antd = require("antd");

require("./index.css");

require("antd/dist/antd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;

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

        _axios.default.get(url, {
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

        _axios.default.get(_url, {
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

    _axios.default.get(url, {
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
      title = '用户属性';
      label = "用户属性:";
    }

    if (ptype === 'event') {
      title = '事件属性';
      label = "事件类型";
      labelC = "事件属性";
    }

    if (ptype === 'product') {
      title = '产品属性';
      label = "产品类型";
      labelC = "产品属性";
    }

    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_antd.Card, {
      bordered: false,
      extra: _react.default.createElement("a", {
        href: "#"
      }, "Close"),
      title: title
    }, _react.default.createElement("div", {
      className: "select_container"
    }, _react.default.createElement("div", {
      className: "select_row"
    }, _react.default.createElement("div", {
      className: "select_label"
    }, label), _react.default.createElement("div", {
      className: "select_value"
    }, _react.default.createElement(_antd.Select, {
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
      return _react.default.createElement(Option, {
        key: item.name
      }, item.cname);
    })))), (ptype === 'event' || ptype === 'product') && _react.default.createElement("div", {
      className: "select_row"
    }, _react.default.createElement("div", {
      className: "select_label"
    }, labelC), _react.default.createElement("div", {
      className: "select_value"
    }, _react.default.createElement(_antd.Select, {
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
      return _react.default.createElement(Option, {
        key: item.name
      }, item.cname);
    }))))), _react.default.createElement("div", {
      className: "select_line"
    }), _react.default.createElement("div", {
      className: "select_btn"
    }, _react.default.createElement(_antd.Button, {
      style: {
        borderColor: '#fff'
      },
      onClick: this.onConfirm
    }, "\u53D6\u6D88"), _react.default.createElement(_antd.Button, {
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
}(_react.Component);

BocProps.propTypes = {
  ptype: _propTypes.default.string,
  // 类型 用户属性 user 事件属性event 产品属性product 白名单white
  initialValue: _propTypes.default.string,
  //初始值
  readonly: _propTypes.default.bool,
  // 只读 false
  onConfirm: _propTypes.default.func // 插入

};
var _default = BocProps;
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

exports.default = _default;