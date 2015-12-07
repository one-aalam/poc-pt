// Sample usage for lodash
import _ from 'lodash';

export default function list(data, tpl) {
  var _list = '<ul>'; 
  _.forEach(data, (item, index) => { console.log(item);
    _list += `<li>[${index + 1}] hello, ${item.first_name}! </li>`;
  });
  return _list + '</ul>';
}