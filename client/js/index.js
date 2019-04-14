const serverURL = "http://localhost:3000"


let app = new Vue ({
    el : "#app",
    data : {
        //state to generate articles
        entries : [],
        //state to show the current page
        loggedIn : false,
        show: "",
        notAuthorized: "",
        modal : "",
        //state to register and login
        email : "",
        password : "",
        //state to add, update articles
        title : "",
        content : "",
        articleId : "",
        createdAt : "",
        text: "",
        image : "",
        //state to serach by title
        search: "",
        //quotes & author
        quotes: "",
        quotesAuthor: ""

    },
    methods : {
        getImage(event){
            this.image = event.target.files[0]
            
        },
        showAll() {
            axios.get(`${serverURL}/articles`,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                this.entries = data
                this.show = 'articles'
                this.notAuthorized = 'yes'
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
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        successRegister(){
            $(`#registerModal`).modal(`toggle`)  
        },
        logout(){
            this.show = ""
            this.loggedIn = false
            signOut()
        },
        successLogin(){
            $(`#loginModal`).modal(`toggle`)
            this.loggedIn = true
            this.showAll()
            this.show = 'articles'
        },
        addArticle() {
            let id = localStorage.getItem('id')
            let formData = new FormData()
            
            formData.append('title',this.title)
            formData.append('content',this.content)
            formData.append('image',this.image)
            
            axios.post(`${serverURL}/articles`,formData, {
                headers: {
                    token: localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(({data})=> {
                this.text = ""
                this.title = ""
                this.showArticles()
                this.show = "articles"
                swal('Nice',data.msg,'success')
            })
            .catch((err)=> {
                console.log(err)
            })
        },

        uniqueArticle(userId, inputArticleId) {
        
            axios.get(`${serverURL}/articles/${userId}/${inputArticleId}`, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                this.title = data.title
                this.content = data.content
                this.show = 'editing'
                this.articleId = inputArticleId
                this.image = data.image
                
            })
            .catch((err)=> {
                console.log(err)
            })
        },

        editArticle(id) {
            let formData = new FormData()
            
            formData.append('title',this.title)
            formData.append('content',this.content)
            formData.append('image',this.image)
        
            axios.put(`${serverURL}/articles/${id}`,formData,
            {
                headers : {
                    token : localStorage.getItem('token'),
                }, 
                'Content-Type': 'multipart/form-data'
            })
            .then(({data})=> {
                this.title = ""
                this.content = ""
                this.show = "articles"
                this.showArticles()
                swal('Nice',data.msg,'success');
            })
            .catch((err)=> {
                console.log(err.message);
                
            })
        },
        deleteArticle(id) {
            
            axios
                .delete(`${serverURL}/articles/${id}`, {
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
        },
        articleDetails(userId,inputArticleId){
            axios.get(`${serverURL}/articles/${userId}/${inputArticleId}`, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                console.log(data);
                this.articleId = inputArticleId
                this.title = data.title
                this.email = data.userId.email
                this.content = data.content
                this.createdAt = new Date(data.createdAt).toUTCString()
                this.image = data.image
                this.show = 'unique'
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        showEditor(){
            this.show = 'editor'
            this.title = ''
            this.content = ''
            this.text = ''
            this.image = ''
        },
        showQuotes(){
            axios.get(`https://quotes.rest/qod?category=life`)
            .then(({data})=> {
                this.quotes = data.contents.quotes[0].quote
                this.quotesAuthor = data.contents.quotes[0].author
            })
            .catch((err)=> {
                console.log(err);
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
    created() {
        this.showQuotes()
        this.loggedIn = false
        this.show = ""
    }
})

function onSignIn(googleUser) {
    
    var id_token = googleUser.getAuthResponse().id_token;

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    axios.post(`${serverURL}/users/googleSignIn`, {token : id_token})
        .then(({data})=> {

            const { details, userToken } = data
            const { id } = details
            if (!localStorage.getItem('token')) {
                console.log(`Welcome back`);
                
            }
            app.loggedIn = true
            app.show = 'articles'
            localStorage.setItem('token', userToken)
            localStorage.setItem('UserId', id)
        })
        .catch(err => {
            console.log(err.message)
        })
        
}

function signOut() {
    app.loggedIn = false
    app.entries = []
    app.show = ""
    localStorage.clear()

    if (gapi.auth2.getAuthInstance()) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

}