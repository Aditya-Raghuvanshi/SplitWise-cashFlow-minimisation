
import  {BinaryHeap}  from './heap.js';

onload = function(){
    // create a network
    let curr_data;
    const container = document.getElementById('mynetwork');
    const container2 = document.getElementById('mynetwork2');
    const genNew = document.getElementById('generate-graph');
    const solve = document.getElementById('solve');
    const temptext = document.getElementById('temptext');
    // initialise graph options
    const options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf183',
                size: 50,
                color: '#991133',
            }
        }
    };
    // initialize your network!
    let network = new vis.Network(container);
    network.setOptions(options);
    let network2 = new vis.Network(container2);
    network2.setOptions(options);


    function createData (){
        let no_nodes= Math.floor(Math.random()*8)+2;
    
        let nodes=[];
    
        //adding people to the nodes.
        for(let i=1;i<=no_nodes;i++)
        {
            nodes.push({
                id:i,
                label:"Person "+i,
            });
        }
    
        //getting data for vis.js library.
        nodes=new vis.DataSet(nodes);
    
        let edges=[];
        // dynamically creating edges with random amount to be from one friend ot another friend.
        for(let i=1;i<=no_nodes;i++)
        {
            for(let j=i+1;j<no_nodes;j++)
            {
                //modifies the amount of edges in the graph
                if(Math.random()>0.5)
                {
                    //modifies the direction of cash flow on edge.
                    if(Math.random()>0.5)
                    {
                        edges.push({
                            from:i,
                            to:j,
                            label:String(Math.floor(Math.random()*100)+1),
                        })
                    }
                    else{
                        edges.push({
                            from:j,
                            to:i,
                            label:String(Math.floor(Math.random()*100)+1),
                        })
                    }
    
                }
                
            }
        }
        
        const data = {
            nodes:nodes,
            edges:edges
        }
    
        return data;
    }                                    
    
    genNew.onclick = function () {
        const data = createData();
        curr_data = data;
        network.setData(data);
        temptext.style.display = "inline";
        container2.style.display = "none";
    };

    solve.onclick = function () {
        temptext.style.display  = "none";
        container2.style.display = "inline";
        const solvedData = solveData();
        network2.setData(solvedData);
    };
    
    function solveData(){
        let data=curr_data;
        const no_nodes=data['nodes'].length;
        const values = Array(no_nodes).fill(0);
    
        for(let i=0;i<data['edges'].length;i++)
        {
            const edge= data['edges'][i];
            values[edge['to']-1]+=parseInt(edge['label']);
            values[edge['from']-1]-=parseInt(edge['label']);
        }
         
        const posArr=new BinaryHeap();
        const negArr=new BinaryHeap();
    
        for(let i=0;i<no_nodes;i++)
        {
            if(values[i]<0)
            {
                negArr.insert([-1*values[i],i+1]);
                values[i]*=-1;
            }
            else{
                posArr.insert([values[i],i+1]);
            }
        }
    
        const newEdges=[];
        while(!posArr.empty() && !negArr.empty())
        {
            const mp=posArr.extractMax();
            const mn=negArr.extractMax();
            const mini=Math.min(mp[0],mn[0]);
            const to=mp[1];
            const from=mn[1];

            values[to-1]-=mini;
            values[from-1]-=mini;

            newEdges.push({
                from:from,
                to:to,
                label:String(Math.abs(mini)),
            });

            if(mn[0]>mp[0])
            {
                negArr.insert([values[from-1],from]);
            }
            else if(mn[0]<mp[0]){
                posArr.insert([values[to-1],to]);
            }
    
            
        }
    
        data = {
            nodes:data['nodes'],
            edges:newEdges,
        };
    
        return data;
    }
    
    genNew.click();
};

