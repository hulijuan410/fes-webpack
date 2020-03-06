import './index.scss';
class Search {
    init() {
        document.querySelector('.search').querySelector('button').addEventListener('click', () => {
            console.log('button');
        }, false)
    }
}

new Search().init();