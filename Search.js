//Load a book from disk

const loadBook = (filename, displayName) => {
    let currentBook = ''
    let url = 'books/' + filename

    //reset UI
    document.getElementById("fileName").innerHTML = displayName
    document.getElementById("searchstat").innerHTML = ''
    document.getElementById("keyword").value = ''

    //create a server request to load books
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.send()

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            currentBook = xhr.responseText

            getDocStats(currentBook)

            //remove line breaks/ carriage returns and replace with a <br>
            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>')

            document.getElementById("fileContent").innerHTML = currentBook

            var elmnt = document.getElementById("fileContent")
            elmnt.scrollTop = 0

        }
    }
}

//get the stats for the book
const getDocStats = (fileContent) => {

    var docLength = document.getElementById('docLength')
    var wordCount = document.getElementById('wordCount')
    var charCount = document.getElementById('charCount')

    let text = fileContent.toLowerCase()
    let wordArray = text.match(/\b\S+\b/g)
    let wordDiction = {}

    var uncommonWords = []

    //filtering the uncommon words
    uncommonWords = filterStopWords(wordArray)

    //counting every word in wordarray
    for (let word in uncommonWords) {
        let wordValue = uncommonWords[word]
        if (wordDiction[wordValue] > 0) {
            wordDiction[wordValue] += 1
        }
        else {
            wordDiction[wordValue] = 1
        }
    }

    //sort array
    let wordList = sortProperties(wordDiction)

    //return the top & least 5 words
    var topWords = wordList.slice(0, 6)
    var leastWords = wordList.slice(-6, wordList.length)

    //write values to the page
    ULTemplate(topWords, document.getElementById('mostUsed'))
    ULTemplate(leastWords, document.getElementById('leastUsed'))

    docLength.innerText = 'Document Length: ' + text.length
    wordCount.innerText = 'Word Count: ' + wordArray.length
}

const ULTemplate = (items, element) => {
    let rowTemplate = document.getElementById('template-ul-items')
    let templateHTML = rowTemplate.innerHTML
    let resultsHTML = ''

    for (i = 0; i < items.length - 1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0] + ' : ' + items[i][1] + 'time(s)')
    }
    element.innerHTML = resultsHTML


}

const sortProperties = (obj) => {
    //return obj as an array
    let returnArr = Object.entries(obj)

    //sort array
    returnArr.sort((first, second) => {
        return second[1] - first[1]
    })
    return returnArr
}

//filter out stop words
const filterStopWords = (wordArr) => {
    var commonWords = getStopWords()
    var commonObj = {}
    var uncommonArr = []

    for (i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true
    }

    for (i = 0; i < wordArr.length; i++) {
        word = wordArr[i].trim().toLowerCase()
        if (!commonObj[word]) {
            uncommonArr.push(word)
        }
    }

    return uncommonArr

}

//highlight the words in search
const performMark = () => {

    var keyword = document.getElementById('keyword').value
    var display = document.getElementById('fileContent')

    var newContent = ''

    //find all the currently marked items
    let spans = document.querySelectorAll
}

const getStopWords = () => {
    return ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]
}

