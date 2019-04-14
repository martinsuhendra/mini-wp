Vue.component('modals',{
    props : ['modal','email','password'],
    data() {
        return {
            emailChild: '',
            passwordChild : ''
        }
    },
    methods: {
        register() {
            axios.post(`${serverURL}/users/register`,{
                email : this.emailChild,
                password: this.passwordChild
            })
            .then(({data})=>{
                this.emailChild = ""
                this.passwordChild = ""
                // $(`#registerModal`).modal(`toggle`)       
                swal('Congratulation',data.msg,'success');
                this.$emit('success-register')
            })
            .catch((err)=> {
                swal('sorry,',err.response.data),'warning';
            })
        },
        login() {;
            axios.post(`${serverURL}/users/login`, {
                email : this.emailChild,
                password : this.passwordChild
            })
            .then(({data})=> {
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                this.$emit('success-login')
            })
            .catch((err)=> {
                swal('Oops...',err.response.data.msg,'warning')
            })
        },
    },
    template :
    `
        <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerModalLabel" v-if="modal == 'register'">Join our Community</h5>
                    <h5 class="modal-title" id="registerModalLabel" v-if="modal == 'login'">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                        <label for="user-name" class="col-form-label">Email</label>
                        <input type="text" v-model="emailChild" class="form-control" id="new-user-name">
                        </div>
                        <div class="form-group">
                        <label for="user-password" class="col-form-label">Password:</label>
                        <input type="password" v-model="passwordChild" class="form-control" id="new-user-password">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" v-on:click.prevent="register" data-dismiss="modal" v-if="modal == 'register'">Sign Up</button>
                    <button type="button" class="btn btn-primary" v-on:click.prevent="login" data-dismiss="modal" v-if="modal == 'login'">Sign In</button>
                </div>
            </div>
            </div>
        </div>
    `
})