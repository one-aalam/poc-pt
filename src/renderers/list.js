// Sample usage for lodash
import _ from 'lodash';
import userTpl from '../templates/user.dot';
import styles from './list.css';

export default function list(data, tpl) {
  var _list = '<ul>'; 
  _.forEach(data, (item, index) => { 
    _list += `<li class="${styles.listItem}">[${index + 1}] >> ${item.first_name}! </li>`; // ES6 Template
    _list += userTpl.render(item); // DOT Template
  });
  return _list + '</ul>';
}