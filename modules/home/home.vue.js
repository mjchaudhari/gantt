/**
 * ask for emailid and navigate to projects page
 */
export default  {
    name:"home",
    template: `
    <div>
        <div class="jumbotron">
            <h1 class="display-3">Project planner</h1>
            <p class="lead">Simple Gnatt charting to speculate how log it will take to deliver the project</p>
            <hr class="my-4">
            <p></p>
            <p class="lead">
              <router-link class="btn btn-info btn-lg" to="/projects">Go to your projects</router-link>
            </p>
        </div>
      
        <div class="fill center">
          
        </div>
    </div>  
    `,
    data:()=>{
      return {
          title: "Home"
      }
    },
    computed:{
      
    },
    methods:{

    }
  }


