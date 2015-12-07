// Sample usage for lodash
import _ from 'lodash';
import userTpl from '../templates/user.dot';

export default function list(data, tpl) {
  var _list = '<ul>'; 
  _.forEach(data, (item, index) => { 
    _list += `<li>[${index + 1}] >> ${item.first_name}! </li>`; // ES6 Template
    _list += userTpl.render(item); // DOT Template
  });
  return _list + '</ul>';
}