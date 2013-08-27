function changeEmail(aEmailList) {
    var aName = [];
	var aEmailParts = aEmailList.map(function(v,i,arr) {
          aName.push(v.split(" ")[0]);
          return v.split(" ")[1];
	});
	console.log(aEmailParts);
	console.log(aEmailParts.join());
    $('toInput').value = aEmailParts.join();   //add new string

    $Element($$.getSingle('#toUL li a.btn_del img')).fireEvent('click');  //delete first code

    //add name string
     var aEmailInHTML = Array.prototype.slice.call(document.querySelectorAll('#toUL li._addressObj span._addresObjViewText'));
    aEmailInHTML.forEach(function(v,i,arr) {
       v.firstChild.nodeValue =  aName[i]+" "+ v.firstChild.nodeValue;
    });

    //register event handler on img tag
    $Element('toUL').delegate('click' , "img" , function(oEvent) {
	   	$Element(oEvent.element).disappear(3,function(){
   			alert("삭제합니다");
		});
	    var emailForDelete = oEvent.element.parentNode.parentNode.firstChild.firstChild.nodeValue;  //email Address
	});
}


var N_C  = {
	_isGubunFlagNext : false,
	_aEmailSum : []
};


function sendAjax(gubun) {
	var url = "http://ui.nhnnext.org/phpcode/response_jsonfile_cors.php";
	var request = new XMLHttpRequest();

	request.open("POST", url, true);
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	request.onreadystatechange = function() {
		if(request.readyState ==4 && request.status ==200) {
					//console.log('ajax -> ' + request.responseText)
	                obj = JSON.parse(request.responseText);
	                N_C._aEmailSum = N_C._aEmailSum.concat(obj.emailName);

	                if(N_C._isGubunFlagNext) {
		                //console.log('aEmailSum -> ' + N_C._aEmailSum);
	                	sendAjax('academic');
	                	N_C._isGubunFlagNext = false;
	                } else { 
	                	changeEmail(N_C._aEmailSum);
		                //console.log('aEmailSum -> ' + N_C._aEmailSum);
	                }
	    }
	};
	request.send('data='+gubun);
}

if( document.querySelector('#toUL li span ').firstChild != null) {
	var sDlName = document.querySelector('#toUL li span ').firstChild.nodeValue;
	var sDlGubun = sDlName.replace(/NEXT_.+\<dl_next[_.](\w+)@nhn\.com\>/, "$1");

	console.log(sDlGubun);

	if(sDlGubun.length > 10) {
		alert("지원되지 않는 이메일 주소입니다\n 직원전체, 교수전체, 또는 NEXT전체만 지원해요~");
	}else{
		ajaxController(sDlGubun);
		//sendAjax(sDlGubun);
	}
} else {
	alert("email 주소 입력하세요");
	document.getElementById("toInput").focus();
}

function ajaxController(gubun) {
		if(gubun == "allmem") {
			N_C._isGubunFlagNext = true;
			sendAjax("professor");
		}else{
			sendAjax(gubun);
		}
}

//1. 여기 접속
//http://contact.nhncorp.com/viewDLMembers.nhn?email=dl_next.professor@nhn.com#