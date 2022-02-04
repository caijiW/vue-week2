import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'caiji-hexschool';


const app = createApp({
    data() {
        return {
            temp:{},
            products:[

            ] 
        }
    },
    methods: {
        checkLogin() {
            const Token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = Token;

            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    console.log(res);
                    this.getProduct();
                })
                .catch((err) => {
                    console.log(err);
                    this.modal();
                    // alert('請先登入');
                    // window.location='./login.html';
                })
        },
        modal() {
            const myModal = document.getElementById('staticBackdrop');
            const modal = bootstrap.Modal.getOrCreateInstance(myModal);
            const btnClose = document.querySelector('#btn-close');
            modal.show()
            btnClose.addEventListener('click', function () {
                window.location='./index.html';
            })
        },
        getProduct(){
            axios.get(`${url}/api/${path}/admin/products/all`)
            .then((res) => {
                console.log(res);
                this.products=res.data.products;
                //取回的值是物件型式
                //用以下方式可轉成陣列
                // Object.values(this.products);
            })
            .catch((err) => {
                console.log(err);
            })
        }  
        
    },
    mounted() {
        this.checkLogin();
      
    }
})



app.mount('#app');