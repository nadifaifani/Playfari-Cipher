function generateKeyTable(key){
	let str, arr, alphabet, finalArr = [], num = 0;
	    key = key.toLowerCase();
    key = key.replace(/\s+/g, '');
	alphabet = "abcdefghiklmnopqrstuvwxyz";
	str = key + alphabet;
	arr = str.split("").filter(arrayUnique);
	finalArr[num] = [];
	for (let i = 0; i < arr.length; i++) {
		if(i%5==0 && i != 0){
			num++;
			finalArr[num] = [];
		}
		finalArr[num].push(arr[i]);
	}
	return finalArr;
}
function arrayUnique(value,index,self){
	return self.indexOf(value) === index;
}
function removePunctuation(text){
	let splittedText = text.split(""), returnedText = "";
	for (let i = 0; i < splittedText.length; i++) {
	 	let letterCharCode = splittedText[i].charCodeAt(0);
	 	if (letterCharCode >= 65 && letterCharCode <= 90 || letterCharCode >= 97 && letterCharCode <= 122) {
	 		returnedText += splittedText[i];
	 	}
	 } 
	 return returnedText;
}
function encript(key,text){
	let text1, text2, text3;
	text = removePunctuation(text);
		text1 = text.toLowerCase();
		text2 = text1.replace(/\s+/g,'');
		
		let splittedText = text2.split("");
		text2 = "";
		for (let i = 0; i < splittedText.length; i++) {
			if (i+1 == splittedText.length) {
				text2 += splittedText[i];
				break;
			}
			if (splittedText[i] == splittedText[i+1]) {
				splittedText[i] = splittedText[i] + "x";
			}
			text2 += splittedText[i];
		}
		if (text2.length % 2 == 0) {
		    text3 = text2.match(/.{1,2}/g);
		} else {
		    let text0 = text2 + "x";
		    text3 = text0.match(/.{1,2}/g);
		}
	let num = 0, keyObj = [];
	keyArr = generateKeyTable(key);
	for (let i = 0; i < keyArr.length; i++) {
		for (let j = 0; j < keyArr[i].length; j++) {
			keyObj[num] = {};
			keyObj[num].value = keyArr[i][j];
			keyObj[num].row = i;
			keyObj[num].col = j;
			num++;
		}
	}
	let  newWord = [];
	num = 0;
	for (textInd in text3) {
        let chars = [], x = {}, y = {}, xNew = {}, yNew = {};
		chars = text3[textInd].split("");
		for (ind in keyObj) {
			if (keyObj[ind].value == chars[0]) {
				x.row = keyObj[ind].row; 
				x.col = keyObj[ind].col;
			}else if (keyObj[ind].value == chars[1]) {
				y.row = keyObj[ind].row; 
				y.col = keyObj[ind].col;
			}
		}
		if (x.row != y.row && x.col != y.col) {
			if(x.col > y.col){
				xNew.row = x.row;
				xNew.col = x.col - (x.col - y.col);
				yNew.row = y.row;
				yNew.col = y.col + (x.col - y.col);
			}else if (y.col > x.col ) {
				xNew.row = x.row;
				xNew.col = x.col + (y.col - x.col);
				yNew.row = y.row;
				yNew.col = y.col - (y.col - x.col);	
			}
		} else if (x.row == y.row) {
            if (y.col + 1 > 4) {
                yNew.col = 0;
            } else {
                yNew.col = y.col + 1;
            }
            yNew.row = x.row;
            if (x.col + 1 > 4) {
                xNew.col = 0;
            } else {
                xNew.col = x.col + 1;
            }
            xNew.row = x.row;
        } else if (x.col == y.col) {
            if (y.row + 1 > 4) {
                yNew.row = 0;
            } else {
                yNew.row = y.row + 1;
            }
            yNew.col = y.col;
            if (x.row + 1 > 4) {
                xNew.row = 0;
            } else {
                xNew.row = x.row + 1;
            }
            xNew.col = x.col;

        }
        newWord[num] = {};
        newWord[num] = xNew;
        num += 1;
        newWord[num] = {};
        newWord[num] = yNew;
        num += 1;
    }
    let newWordStr = "";
    for (index in newWord) {
        for (let i = 0; i < keyObj.length; i++) {
            if (keyObj[i].row == newWord[index].row && keyObj[i].col == newWord[index].col) {
                newWordStr += keyObj[i].value;
            }
        }
    }
    return newWordStr;
}

