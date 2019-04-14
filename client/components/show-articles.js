Vue.component('show-articles',{
   props : ['not-authorized','filter-articles','article-details'],
   methods: {
       getUniqueArticles(userId, articleId){
           this.$emit('unique-articles',userId, articleId)
       },
       getDelete(articleId){
           this.$emit('delete-article',articleId)
       }
   },
    template : 
    `   
        <div class="container article">
            <div class="row">
                <div class="text-center py-3 px-2" v-for="(entry, index) in filterArticles" :key="index">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" v-bind:src="entry.image" alt="Card image cap" style="min-width:289px; min-height:192px; max-width:289px; max-height:192px ">
                        <div class="card-body">
                            <a href="#" class="card-text" data-toggle="tooltip" data-placement="top" title="Click for Details" v-on:click="articleDetails(entry.userId._id,entry._id)">{{entry.title}}</a>
                        </div>
                        <div class="row">
                            <div class="col d-flex justify-content-end">
                                <button type="button" class="btn btn-default" v-if="notAuthorized !== 'yes'" v-on:click="getUniqueArticles(entry.userId, entry._id)">Edit</button>
                            </div>
                            <div class="col d-flex justify-content-start">
                                <button type="button" class="btn btn-default" v-on:click.prevent="getDelete(entry._id)" v-if="notAuthorized !== 'yes'">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})