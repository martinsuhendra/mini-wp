const serverURL = "http://localhost:3000"


let app = new Vue ({
    el : "#app",
    data : {
        entries : [],
        loggedIn : false,
        username : "",
        password : "",
        title : "",
        content : "",
        search: "",
        show: "home",
        text: "",
        notAuthorized: "",

    },
    methods : {
        showAll() {
            axios.get(`${serverURL}/articles`)
            .then(({data})=> {
                this.entries = data
                this.show = 'articles'
                this.notAuthorized = 'yes'
                // console.log(data,'ini data=====')
            })
            .catch(err => {
                console.log(err.message);
            })
        },
        showArticles() {
            let id = localStorage.getItem('id')
            axios.get(`${serverURL}/articles/${id}`, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                this.entries = data
                this.show = 'articles'
                this.notAuthorized = 'no'
                console.log(data),'ini data';
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        register() {
            axios.post(`${serverURL}/users/register`,{
                username : this.username,
                password: this.password
            })
            .then(({data})=>{
                this.username = ""
                this.password = ""
                $(`#registerModal`).modal(`toggle`)
                console.log(data);
            })
            .catch((err)=> {
                console.log(err.message);
            })
        },

        login() {
            axios.post(`${serverURL}/users/login`, {
                username : this.username,
                password : this.password
            })
            .then(({data})=> {
                $(`#loginModal`).modal(`toggle`)
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                this.loggedIn = true
                this.showAll()
                this.show = 'articles'
            })
            .catch((err)=> {
                console.log(err.message)
            })
        },

        logout() {
            localStorage.clear()
            this.loggedIn = false
            this.entries = []
            this.show = "home"
        },
        
        addArticle() {
            let id = localStorage.getItem('id')
            axios.post(`${serverURL}/articles`,{
                title : this.title,
                content : this.text,
                id
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                this.text = ""
                this.title = ""
                console.log(data)
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        editArticle(id) {
            axios.put(`${serverURL}/articles/edit/${id}`, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((data)=> {
                console.log(data)
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        bindState(title,content) {
            this.title = title
            this.content = content
        },
        deleteArticle(id) {
            axios
                .delete(`${serverURL}/articles/delete/${id}`, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((data)=> {
                    this.showArticles()
                    console.log(data)
                })
                .catch((err)=> {
                    console.log(err.message);
                })
        }
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.loggedIn = true
        }
    },
    computed : {
        filteredArticles() {
            return this.entries.filter((entry)=> {
                return entry.title.toLowerCase().match(this.search)
            })
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    
    createdAt() {
        this.showAll()
        this.show = "home"
    }
})