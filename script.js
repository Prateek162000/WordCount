$("#btnCalc").click(function(){
	let text=$("#inputText").val();
	let words=getWords(text);
	let wc=getWordCounts(words);
	let wcarr=sortwords(wc);
	printtable(wcarr);
	genchart(wcarr);
})

function getWords(inputText)
{
	let chars=inputText.split('');
	let newChars=[];
	chars.forEach((c)=>{
		switch(c){
			case `'`:
			case `"`:
			case `;`:
			case `:`:
			case `,`:
			case `-`:
			case `_`:
			case `?`:
			case `"`:
			case `.`:
			case `’`:
			case `‘`:
			case '–':
			case '\n': newChars.push(' '); break;
			case '  ': newChars.push(' '); break;
			case '   ': newChars.push(' '); break;
			case `"`: return
			
			default:
				newChars.push(c.toLowerCase());

		}
	})
	let newText=newChars.join('');
	let words=newText.split(' ');
	return words;	
}

function getWordCounts(words)
{
	let wordCounts={};
	words.forEach((w)=>{
		if (wordCounts[w])
		{
			wordCounts[w]++;
		}
		else{
			wordCounts[w]=1;
		}
	})
	return wordCounts;
}

function sortwords(wordCounts){
	let wcarr=[];
	Object.keys(wordCounts).forEach((w)=>{
		if(w=="")return;
		wcarr.push({
			word:w,
			count:wordCounts[w]
		})
	})
	return wcarr.sort((a,b)=>b.count-a.count).slice(0,50);
}

function printtable(wordCountArray)
{
	let table=$('#tb');

	wordCountArray.forEach((wc)=>{
		table.append(
			$('<tr>')
			.append($('<td>').text(wc.word))
			.append($('<td>').text(wc.count))
			)
	})
}

function genchart(wcarr)
{
	let ctx=document.getElementById('chart').getContext('2d');
	let chart=new Chart(ctx,{
		type:'line',
		data: {
			labels:wcarr.map((wc)=>wc.word),
		datasets: [
		{
			label:'Word Frequency',
			borderColor:"red",
			borderWidth:2,
			data:wcarr.map((wc)=>wc.count),
		},
		],
	},
	})
}