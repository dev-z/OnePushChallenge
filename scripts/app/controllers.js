/**
 * Created by Ishtiaque on 9/18/2016.
 */
angular.module("ngOnePush").controller("OpCtrl", ["$scope", "dataFactory", function($scope, dataFactory){

	$scope.websitesData = [];
	$scope.begin = 0;
	$scope.limit = 5;
	$scope.numOfPages = 0;
	$scope.pages = [];
	$scope.newName = "";
	$scope.newURL = "";
	$scope.newTag = "";
	$scope.showSuccess = false;
	$scope.showError = false;
	$scope.currentPage = 1;
	$scope.pgBegin = 0;
	$scope.pgLimit = 10;

	dataFactory.getWebsitesData().then(successCallback, errorCallback);
	function successCallback(response){
		$scope.websitesData = response.data.websites;
		//determining the number of pages
		$scope.numOfPages = Math.ceil($scope.websitesData.length / $scope.limit);
		for(var i=1; i<=$scope.numOfPages; i++ ){
			$scope.pages.push(i);
		}
	}
	function errorCallback(error){
		console.log("Error in fetching data" + error);
	}

	$scope.addPortfolio = function addPortfolio(){
		if($scope.newName !== "" && $scope.newURL !== "" && $scope.newTag !== ""){
			var lastId = $scope.websitesData[$scope.websitesData.length - 1].id;
			var pf = {
				id: lastId + 1,
				title: $scope.newName,
				url_address: $scope.newURL,
				tag: $scope.newTag,
				favicon_image: "http:\/\/hackerearth.0x10.info\/api\/avatar\/5.png"
			}
			$scope.websitesData.push(pf);
			//display success msg
			$scope.showSuccess = true;
			//update no of pages if required
			$scope.numOfPages = Math.ceil($scope.websitesData.length / $scope.limit);
			console.log($scope.numOfPages);
			$scope.pages.length = 0;
			for(var i=1; i<=$scope.numOfPages; i++ ){
				$scope.pages.push(i);
			}
			//reset data
			$scope.newName = "";
			$scope.newURL = "";
			$scope.newTag = "";
		}else{
			//display error msg
			$scope.showError = true;
		}
	}

	$scope.updateProfiles = function updateProfiles(pageNo){
		$scope.begin = (pageNo - 1) * $scope.limit;
		$scope.currentPage = pageNo;
		$scope.pgBegin = (pageNo - 5)>=0 ? (pageNo - 5) : 0;
		$scope.pgBegin = ($scope.pgBegin + 10 < $scope.pages.length) ? $scope.pgBegin : $scope.pages.length - 10;
	}

}]);//end of controller