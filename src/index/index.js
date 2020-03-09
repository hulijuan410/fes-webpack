import './index.scss';
import { a } from './modules/treeShaking';
class Index {
    init() {
        document.querySelector('.index').querySelector('button').addEventListener('click', () => {
            console.log('test index');
            document.querySelector('.text1').innerHTML = a();
        }, false)
    }
}

new Index().init();