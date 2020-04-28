import svc from '../data.service.js'
//import proStore from './project.store.js'
export default  {
    name:"project",
    template: `
    <div>
        <h1>{{project.name}}</h1>
        <h3>{{project.description}}</h3>
        <router-link to="/{project.id}/plan">plan</router-link>
        <router-link to="/{project.id}/detail">Detail</router-link>
        <router-view></router-view>
    </div>  
    `,
    data:()=>{
      return {
          //project:{}
      }
    },
    computed:{
        project(){
            
            return this.$store.getters.projectDetails || {};
        }
    
    },
    beforeCreate(){
      console.log('before create : ' + this.$route.params.projId );
    },
    created(){
        console.log(this.$route.params.projId )
        svc.getProjectData(null, this.$route.params.projId)
        .then((data)=>{
            this.$store.commit('updateProject', data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    methods:{

    }
}


