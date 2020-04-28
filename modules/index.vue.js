
import projectStore from "./project.store.js";
import home  from './home/home.vue.js';
import projects from './home/projects.vue.js'
import project from './project/project.vue.js'
import plan from './project/plan.vue.js'
import detail from './project/detail.vue.js'

const router = new VueRouter({
    mode: 'history',
    routes :  [{
            name:'home',
            path: '/',
            component: home
        },{
            name:'projects',
            path: '/projects',
            component: projects
        },{
            name:'project',
            path:'/:projId',
            component: project,
            children:[{
                    name:'plan',
                    path:'',
                    component: plan,
                },{
                    name: "detail",
                    path:'detail',
                    component: detail
            }]
        }]
})

var app = new Vue({ 
    el: '#app',
    data: function(){
        return {};
    },
    store: projectStore,
    router: router,
    methods : {
     
    }
});
