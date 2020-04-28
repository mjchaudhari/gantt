import svc from '../data.service.js'
export default  {
    name:"projects",
    template: `
    <div div="col-md-12">
        <h1>Projects</h1>
        <div class="col-md-12 row"  >
          <div class="col-md-4" v-for="p in projects" >
            <div class="card"  >
                <div class="card-body" >
                    <h4 class="card-title">{{p.name}}</h4>
                    <p class="card-text">{{p.description}}</p>
                    <router-link class="" :to="{name: 'project', params:{projId: p.id} }">
                        Go to plan
                    </router-link>
                </div>
            </div>
          </div> 
        </div> 
    </div>  
    `,
    data:()=>{
      return {
          title: "Projects",
          projects:[]
      }
    },
    computed:{
      
    },
    mounted(){
        //get list of projects for this user.
        svc.getProjects('anonymous')
        .then((data)=>{
          this.projects = data;
        })
    },
    methods:{

    }
  }


