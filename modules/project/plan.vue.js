  const margin={left:100, right:20, top:50, bottom: 20};
  
  //let svg = null;
  
  export default  {
    name:"plan",
    template: `
    <div>
          {{title}} - {{issues.length}}
          <div  class="fill">
              <div id="svgConainer">
                
              </div>
          </div>
    </div>  
    `,
    data:()=>{
      return {
          title : "Plan view",
          tasks : [],
          svg : null
      }
    },
    computed:{
        issues(){
            return this.$store.getters.issues || [];
        }
    },
    created(){
        this.svg = null;
    },
    mounted(){
        //append svg
        this.svg = d3.select("#svgConainer").append("svg")
                    .attr("class", "chart");
    },
    watch:{
        issues(newVal){
            this.tasks = this.flatternIssues();
            this.drawGantt(this.tasks);
        }
    },
    methods:{
        flatternIssues(){
            //issues
            let issues = []
            //get containers
            let containers = _.filter(this.issues, {"type": "container"});
            if(containers.length > 0) {
                _.each(containers, function(c){
                      _.each(c.children, function(t){
                          t.container = {name: c.name};
                          issues.push(t);
                      });
                });
            } 
            let nocontainerTasks = _.filter(this.issues, function(iss){ iss.type != 'container'})
            if(nocontainerTasks.length > 0) issues.push(nocontainerTasks);
            issues = _.flatten(issues);
            
            this.buildDepChain(issues);
            return issues;
        },
        buildDepChain(issues){
            var chainedTasks = [];
            //find tasks with no dep
            let noDepTasks = _.filter(issues, (i)=>{
                return i.dependencies == null || i.dependencies == "" || (Array.isArray(i.dependencies) && i.dependencies.length == 0);
            })
            _.each(noDepTasks, (t)=>{
                t.start = 1;
                t.end = t.size;
            })

            _.each(issues,(t)=>{
                this.updateBounds(t, issues);
            })
            chainedTasks = issues.sort(function(a, b){return a.start - b.start});
            return chainedTasks;
        },
        updateBounds(t, issues) {
            //find the dependent tasks on t and update bounds of each recursively
            issues.forEach((i)=>{
                if(i.dependencies == null || 
                    i.dependencies == "" || 
                    (Array.isArray(i.dependencies) && i.dependencies.length == 0)){
                    //skip
                } else if (i.dependencies == t.id || i.dependencies.includes(t.id)){
                    //if already set by some other dependent then modify to higher value
                    if(i.start == null || i.start < t.end){
                        i.start = t.end +1;
                    } 
                    i.end = i.start + i.size - 1;
                    this.updateBounds(i, issues);
                }

                //call 
                
            })
        },
        drawGantt(data){
            let svgWidth =  +this.svg.style('width').slice(0,-2);
            let svgHeight = +this.svg.style('height').slice(0,-2);
            let innerWidth = svgWidth - (margin.left + margin.right);
            let innerHeight = svgHeight - (margin.top + margin.bottom);

            //valueAccesser
            const xValue = d => d.size;
            const yValue = d => d.name ;
            const cumulativePoints = _.sumBy(data, 'size');

            const xScale = d3.scaleLinear()
                  .domain([0, cumulativePoints+1])
                  .range([0, innerWidth])
            
            const xAxis = d3.axisTop(xScale);
                        
            const yScale = d3.scaleBand()
                  .domain(data.map(yValue))
                  .range([0, innerHeight])
                  .padding(0.1)

            const yAxis = d3.axisLeft(yScale)

            let rectTransform = (d)=>{
                return "translate(" + xScale(d.start) + "," + yScale(d.name) + ")"  
            }

            let g = this.svg.append('g')
                  .attr('transform', `translate(${margin.left}, ${margin.top})`)
            
            g.append('g').call(yAxis);
            g.append('g').call(xAxis);
                
                
            
            let rectEnter = g.selectAll('rect').data(data)
                .enter()
                .append('rect')
                    .attr('padding', 1)
                    .attr('y', d => yScale(yValue(d)))
                    .attr('x', d => xScale(d.start))
                    .attr('width', d=> xScale(xValue(d)))
                    .attr('height', yScale.bandwidth())
                    //.attr('translate', rectTransform)
                    
            rectEnter.append('text')
                  .text(d=>d.name)
                  .attr('class', 'text-on-bar')

            
            
//             rectEnter
//               .attr('translate', rectTransform)
        }

    }
  }


