import Reacts from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Select } from 'antd';

import './index.css';
import 'antd/dist/antd.css';

const { Option } = Select;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

function testApi(params) {
  axios.get('/api/events/all?check_permission=false', {
    params: {},
    headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}


const BocProps = ({ text }) => {

  console.log('2222222')


  // const [data, setData] = useState({ data: [] });

  // useEffect(async () => {
  //   let url = '/api/events/all?check_permission=false';
  //   const result = await axios.get(url,
  //     {
  //       params: {},
  //       headers: { token: '$6666ebc5599b852f3a8f81c1fdcd3575' }
  //     },
  //   );

  //   console.log('111:', result.data)

  //   setData(result.data);
  // });

  return (
    <>
      <div className="container">这是一个BocProps {text}<Button onClick={testApi} type="primary">Primary Button</Button>

        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>

        <div>


        </div>
      </div>
    </>
  )
}





BocProps.propTypes = {
  text: PropTypes.any
};

export default BocProps;
