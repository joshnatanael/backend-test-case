const sentence = "Saya sangat senang mengerjakan soal algoritma";

const longest = (sentence: string)=>{
    const splittedSentence = sentence.split(' ');
    let longestWord = '';

    for(let i = 0; i < splittedSentence.length; i++){
        if(splittedSentence[i].length > longestWord.length) longestWord = splittedSentence[i];
    }

    return `${longestWord}: ${longestWord.length} character`;
}

console.log(longest(sentence));