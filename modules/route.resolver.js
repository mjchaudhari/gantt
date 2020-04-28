import svc from './data.service.js'

function projectRouteResolver(){
    svc.getProjectData(null, this.$route.params.projId)
        .then((data)=>{
            this.$store.commit('updateProject', data);
        })
        .catch((err)=>{
            console.log(err)
        })
}

const resolver = {
    projectRouteResolver
};
export default resolver;