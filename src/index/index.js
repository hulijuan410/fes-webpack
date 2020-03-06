import './index.scss';
class Index {
    init() {
        document.querySelector('.index').querySelector('button').addEventListener('click', () => {
            console.log('test index');
        }, false)
    }
}

new Index().init();