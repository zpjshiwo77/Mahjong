$(document).ready(function(){
	
	$(".btn").on("click",function(){
		var a = $("#a").val();
		var b = $("#b").val();
		var point = parseInt($("#point").val());
		var pak = parseInt($("#pak").val());
		var cards = [a,b]
		imahjong.init(point);
		if(a != "" && b != "" & pak <= 4){
			var x = imahjong.count({
				cards:cards,
				pak:pak
			});
			renderHtml(x);
		}
		else{
			alert("请输入正确的牌！")
		}
	})

	function renderHtml(data){
		var str = "<tr> <th>番种</th> <th>番数</th> <th>数量</th> <th>总分数</th> </tr>";
		if(typeof data == "string"){
			alert(data);
		}
		else{
			for (var i = 0; i < data.detail.length; i++) {
				var num = data.detail[i].num ? data.detail[i].num : "";
				str += "<tr> <td>"+data.detail[i].type+"</td> <td>"+data.detail[i].val+"</td> <td>"+num+"</td> <td></td> </tr>";
			};
			str += "<tr> <td>总</td> <td>"+data.total+"</td> <td></td> <td>"+data.TotalScore+"</td> </tr>";
			$("table").empty().append(str);
		}
	}
});//end ready
