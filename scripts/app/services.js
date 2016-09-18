/**
 * Created by Ishtiaque on 9/18/2016.
 */
angular.module("ngOnePush")
	.factory("dataFactory", ["$http", function ($http) {

		/**This function can be used to fetch the data from the given url
		 **/
		function getWebsitesData(pid) {
			return $http.get("https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites");
			//the below line is for testing purposes only.
			//return $http.get("data/data.json");
		}

		return {
			getWebsitesData: getWebsitesData
		}
	}]);