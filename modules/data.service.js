//import * as axios from 'axios'
//import cfg from '../config.json'

function getProjects (userName){
  
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            let retVal =  [{    
                id: "default",
                name: "Default",
                descrition: "POC for SCO using angularjs js "
            }, {    
                id: "2",
                name: "SCO-Vue",
                descrition: "POC for SCO using Vue js "
            }];
            resolve(retVal);
        }, 50);
    })
}
function getProjectData (userName, projId){
    const url = `./data.json`;
    return axios.get(url)
        .then(function(data){
            console.log("data");
            return data.data;
        })
        .catch(function(e){
            console.log(e);
        });

}
const svc = {
    getProjects,
    getProjectData
};
export default svc;