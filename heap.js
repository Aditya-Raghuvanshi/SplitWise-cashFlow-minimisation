
// export {BinaryHeap}

// module.exports = { BinaryHeap }

export class BinaryHeap{
    constructor(){
        this.heap=[];
    }
    
    size(){
        return this.heap.length;
    }

    empty(){
        return (this.size()===0);
    }

    insert(value)
    {
        this.heap.push(value);
        this.balanceHeap();
    }

    balanceHeap(){
        let index=this.size()-1;

        while(index>0)
        {
            let parentIndex=Math.floor((index-1)/2);
            if(this.heap[index][0]>this.heap[parentIndex][0])
            {
                let temp=this.heap[index];
                this.heap[index]=this.heap[parentIndex];
                this.heap[parentIndex]=temp;

                index=parentIndex;
            }
            else{
                break;
            }
        }
    }

    extractMax(){
        const maxi=this.heap[0];
        const temp=this.heap.pop();
        
        if(!this.empty())
        {
            this.heap[0]=temp;
            this.heapify(0);
        }

        return maxi;
    }

    heapify(index){
        let left=2*index+1;
        let right=2*index+2;
        let largest=index;
        let length=this.size();

        if(left<length && this.heap[left][0]>this.heap[largest][0])
        {
            largest=left;
        }
        if(right<length && this.heap[right][0]>this.heap[largest][0])
        {
            largest=right;
        }

        if(largest!=index)
        {
            let temp=this.heap[index];
            this.heap[index]=this.heap[largest];
            this.heap[largest]=temp;
            this.heapify(largest);
        }
    }
}



// let mxHeap= new BinaryHeap();
// mxHeap.insert([4,1]);
// mxHeap.insert([5,1]);
// mxHeap.insert([3,1]);
// mxHeap.insert([7,1]);

// while(!mxHeap.empty())
// {
//     let mx=mxHeap.extractMax();
//     console.log(mx);
// }