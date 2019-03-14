import 'babel-polyfill';

import './assets/css/style.css'
import './assets/css/style.less'

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}

console.log("11")