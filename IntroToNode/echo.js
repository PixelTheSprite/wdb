function echo(str, num){
	let i=1;
	if(num){
		i=num;
	}
	for(i; i>0; i--){
		console.log(str);
	}
}

echo("Echo!!!", 10);
echo("Tater Tots", 3);