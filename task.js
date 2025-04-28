const fs = require('fs');

const readStream = fs.createReadStream('text.txt', 'utf8');

let spaceCount = 0;
let wordCount = 0;
let longWordCount = 0;
let doubleLetterWordCount = 0;

readStream.on('data', function(chunk) {
    for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] === ' ') {
            spaceCount++;
        }
    }

    let words = chunk.split(/\s+/); 
    wordCount += words.length;

    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        if (word.length > 5) {
            longWordCount++;
        }

        for (let j = 0; j < word.length - 1; j++) {
            if (word[j] === word[j + 1]) {
                doubleLetterWordCount++;
                break; 
            }
        }
    }
});

readStream.on('end', function() {
    console.log('Кількість пробілів:', spaceCount);
    console.log('Кількість слів:', wordCount);
    console.log('Кількість слів довших за 5 символів:', longWordCount);
    console.log('Кількість слів з подвійними буквами:', doubleLetterWordCount);
});

readStream.on('error', function(err) {
    console.log('Сталася помилка: ' + err.message);
});
