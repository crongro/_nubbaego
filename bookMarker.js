javascript:
	//override printPaginate
    function printPaginate(oRes) {
    	//Don't modify!!   original source start
		var paginate = $Element(cssquery.getSingle('.paginate2'));
		var preEnd = '<a class="pre_end"  href="#"><span class="spr"></span></a>';
		var pre = '<a class="pre"  href="#"><span class="spr"></span></a>';
		var next = '<a class="next" href="#"><span class="spr"></span></a>';
		var nextEnd = '<a class="next_end" href="#"><span class="spr"></span></a>';

		var members = oRes.data;
		var innerHTML = "";
		
		innerHTML += preEnd + pre;
		var startPage = Math.floor(currentPage / 11) * 10 + 1;
		var max = 0;
		
		if (maxPage > 10){
			max = Math.floor(maxPage / 10) * 10 + startPage;
			var maxLimit = maxPage+1;
			if (max > maxLimit) {max = maxLimit;}
		} else if (maxPage > 1){
			max = maxPage + startPage;
		} else {
			max = 2;
		}
		
		for (var i = startPage; i < max; i++) {
			if (currentPage == i){
				innerHTML += '<strong>' + i + '</strong>';
			} else {
				innerHTML += '<a class="num" href="#">' + i + '</a>';
			}
		}

		innerHTML += next + nextEnd;
		
		paginate.hide();
		paginate.html(innerHTML);
		paginate.show();
    	//original source stop

		var aEmailList = oRes.data;

		var jd = execCallback(aEmailList);

		sendAjax(jd);

		//make JSON Data
		function execCallback(aEmailList) {
			var newArr = [];
			$A(aEmailList).forEach(function(v,i,arr) {
				emailValue = v.name+" <"+v.email+">";
				newArr.push(emailValue);
			});
			var jsonData = $Json({emailName : newArr}).toString();
			return jsonData;  
		}

	    //push JSON Data
	    function sendAjax(jd) {
	    	var professor = false;
	     	var url = "http://ui.nhnnext.org/phpcode/email_response.php";
			if (isProfessor()) professor = true;

	    	var request = new XMLHttpRequest();

	    	request.open("POST", url, true);
	    	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	    	request.onreadystatechange = function() {
	    		if(request.readyState ==4 && request.status ==200) {
	    			console.log("--> : "+ request.responseText);
	                 //   obj = JSON.parse(request.responseText);
	                 //   console.log(obj.name);
	             }
	         };
	         console.log('professor- > ' + professor);
	         request.send('professor='+professor+'&data='+jd);
	     }

	     function isProfessor() {
	     	var emailAddress = document.querySelector('.data a._mail').firstChild.nodeValue;
	     	if (emailAddress.indexOf('professor') > 0 ) return true;
	     }

	}
    $Element($$.getSingle('.paginate2 a.num')).fireEvent('click');