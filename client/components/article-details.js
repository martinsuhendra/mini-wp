Vue.component('article-details',{
    props:['show','title','email','content','created-at','image'],
    template : 
    `
    <div class="container py-5" v-if="show == 'unique'">
        <div class="row">
            <div class="col">
                <img v-bind:src="image" alt="" width="528px" height="360px">
            </div>
            <div class="col">
                <div class="py-2">
                <h4>{{title}}</h4>
                <h6> author : {{email}}</h6> 
                <p>{{content}}</p> 
                <small>created at : {{createdAt}}</small> 
                </div>
            </div>
        </div>
    </div>
    `
})