var feeds = {};	
var googleFeedApiUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=";
var gistUrl = "https://gist.githubusercontent.com/jainsahab/aab127d9cc1a0ec7e90e/raw/a84640ca9c70ac73c61ea206a54e9e8843a07f0f/feeds-details"

var fetchCategories = function(categories){

	Object.keys(categories).forEach(function(categoryName, categoryIndex, categoryArr){
		var category = categories[categoryName];
		feeds[categoryName] = {feeds : []};

		category.forEach(function(feedDetail, index, arr){
			function getFeedFor(categoryName, categoryIndex, index){
				downLoadJsonFrom(googleFeedApiUrl + feedDetail.url, "jsonp", function(feed){ 
					feeds[categoryName].feeds.push(feed); 
					if( categoryArr.length == categoryIndex + 1 && arr.length == index + 1){
						$("#container").empty();
					  	sortAndDisplayFeeds(feeds);
					}
				});
			}
			getFeedFor(categoryName, categoryIndex, index)
		});
	})
};

var downLoadJsonFrom = function(url, dataType, success){
	$.ajax({url : url, dataType: dataType, success : success})
}


setInterval(function(){
	downLoadJsonFrom(gistUrl, 'json', fetchCategories);
}, 3000);