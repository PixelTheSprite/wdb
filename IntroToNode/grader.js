// function average(arr){
// 	var count=0;
// 	var sum = 0;
// 	for(var i=0; i<arr.length; i++){
// 		sum+=arr[i];
// 		count++
// 	}
// 	var avg = Math.round(sum/count);
// 	console.log("Average is " + avg);
// 	return avg;
// }

function average(scores){
	//add all scores together
	var total = 0;
	scores.forEach(function(score){
		total += score;
	});
	//divide by total number of scores
	var avg = total/scores.length;
	
	//round average
	return Math.round(avg);
}

console.log("Average score for environmental science");
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));

console.log("Averge score for organic chemistry");
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));
