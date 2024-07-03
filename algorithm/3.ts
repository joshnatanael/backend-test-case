const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const queryCounter = (inputs: string[], queries: string[])=>{
    const inputObj = inputs.reduce((acc, curr)=>({...acc, [curr]: (acc[curr] || 0) + 1}), {} as Record<string, number>);
    
    return queries.map(query=>inputObj[query] || 0);
}

console.log(queryCounter(INPUT, QUERY));