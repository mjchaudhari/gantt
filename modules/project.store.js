
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        project:{}
    },
    mutations:{
        updateProject: (state, project)=>{
            state.project = project
        },
        updateIsseues: (state,issues)=>{
            state.project.issues = issues;
        },
        // updateIssue: (state,issue)=>{
        //     _.find()
        //     state.project.issues = issues;
        // }
    },
    getters:{
        projectDetails:(state)=>{
            return {
                id : _.get(state,'project.id'),
                name : _.get(state,'project.name'),
                description: _.get(state,'project.description'),
                sprintSize: _.get(state,'project.sprintSize'),
                team: _.get(state,'project.team')
            }
        },
        issues:(state)=>{
            return _.get(state, 'project.issues');
        }
    }
})