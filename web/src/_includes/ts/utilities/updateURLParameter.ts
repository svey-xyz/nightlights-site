/*
* Function to update URL params
* from Matthew Wilcoxson on StackOverflow
*/

export function updateURLParameter(url: string, param: string, paramVal: string) {
	var TheAnchor:any = null;
	var newAdditionalURL = "";
	var tempArray = url.split("?");
	var baseURL = tempArray[0];
	var additionalURL = tempArray[1];
	var temp = "";

	if (additionalURL) {
		var tmpAnchor = additionalURL.split("#");
		var TheParams = tmpAnchor[0];
		TheAnchor = tmpAnchor[1];
		if (TheAnchor)
			additionalURL = TheParams;

		tempArray = additionalURL.split("&");

		for (var i = 0; i < tempArray.length; i++) {
			if (tempArray[i].split('=')[0] != param) {
				newAdditionalURL += temp + tempArray[i];
				temp = "&";
			}
		}
	}
	else {
		var tmpAnchor = baseURL.split("#");
		var TheParams = tmpAnchor[0];
		TheAnchor = tmpAnchor[1];

		if (TheParams)
			baseURL = TheParams;
	}

	if (TheAnchor)
		paramVal += "#" + TheAnchor;

	var rows_txt = temp + "" + param + "=" + paramVal;
	return baseURL + "?" + newAdditionalURL + rows_txt;
}