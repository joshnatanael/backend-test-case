const word = "NEGIE1";

const reverseAlphabet = (word: string)=>{
    let num = '';
    let reversedResult = '';
    for(let i = 0; i < word.length; i++){
        if(!Number.isNaN(Number(word[i]))) num += word[i];
        else reversedResult = word[i] + reversedResult;
    }
    
    return reversedResult + num;
}

console.log(reverseAlphabet(word));