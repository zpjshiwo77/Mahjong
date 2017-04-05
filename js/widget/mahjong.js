var mahjong = function(){
	var self = this;

	self.BasicPoints = 1;				//基础分
	var result;							//最后结果

	/******************************
	var result = {
		total: 5,
		TotalScore:0,
		detail:[{
			type:"平胡",
			val:1
		},{
			type:"清一色",
			val:2
		},{
			type:"杠",
			val:1,
			num:2
		}]
	}
	******************************/

	//初始化对局
	self.init = function(point){
		self.BasicPoints = point;
		self.reset();
	}//end func

	//计算最后得分
	self.count = function(data){
		self.reset();
		if(self.judgeLegal(data.cards)){
			self.Kong(data.cards);
			self.sameColor(data.cards);
			self.bigPair(data.cards,data.pak);
			self.generalPair(data.cards);
			self.Orphans(data.cards);
			self.countScore();
		}
		else{
			result = "这不是一副和牌的麻将！";
		}
		return result;
	}//end func

	//计算总分
	self.countScore = function(){
		result.TotalScore = self.BasicPoints * Math.pow(2,result.total);
	}//end func

	//判断是否是幺九牌
	self.Orphans = function(data){
		var pairA = 0;				//123类型的牌
		var pairB = 0;				//789类型的牌
		var pairC = 0;				//11,99,111,999,1111,9999类型的牌
		var err = 0;				//其他类型的牌

		for (var i = 0; i < data.length; i++) {
			pairA += self.judgeLetterNum(data[i],123);
			pairB += self.judgeLetterNum(data[i],789);
			if(self.judgeLetterNum(data[i],1) >= 2) pairC++;
			if(self.judgeLetterNum(data[i],9) >= 2) pairC++;
			for (var j = 4; j <= 6; j++) {
				if(self.judgeLetterNum(data[i],j) > 0) err++;
			};
		};
		if(pairA + pairB + pairC >= 5 && err == 0){
			result.total += 2;
			result.detail.push({
				type:"幺九",
				val:2
			});
			for (var i = 0; i < result.detail.length; i++) {
				if(result.detail[i].type == "小七对"){
					result.detail.splice(i,1);
					result.total -= 2;
				}
			};
		}
	}//end func

	//判断是否是将对
	self.generalPair = function(data){
		var bpair = 0;
		var pair = 0;
		for (var i = 0; i < data.length; i++) {
			var a = self.judgeLetterNum(data[i],2);
			var b = self.judgeLetterNum(data[i],5);
			var c = self.judgeLetterNum(data[i],8);
			if(a >= 3) bpair++;
			if(b >= 3) bpair++;
			if(c >= 3) bpair++;
			if(a == 2) pair++;
			if(b == 2) pair++;
			if(c == 2) pair++;
		};
		if(bpair == 4 && pair == 1){
			result.total += 3;
			result.detail.push({
				type:"将对",
				val:3
			});
		}
	}//end func

	//判断是否是大对子/小七对
	self.bigPair = function(data,pak){
		var pair = 0;			//小七对
		var bpair = 0;			//大对子
		var str = "";
		
		for (var i = 0; i < data.length; i++) {
			str += data[i] + "";
			for (var j = 1; j <= 9; j++) {
				var x = self.judgeLetterNum(data[i],j);
				if(x == 2) pair++;
				if(x > 2) bpair++;
			};
		};
		if((pair == 7 || pair == 5 || pair == 3) && pak == 0){
			result.total += 2;
			result.detail.push({
				type:"小七对",
				val:2
			});
		}
		if(bpair == 4 && pair == 1){
			result.total += 1;
			result.detail.push({
				type:"大对子",
				val:1
			});
		}
		if(pak == 4){
			result.total += 2;
			result.detail.push({
				type:"金钩钩",
				val:2
			});
		}
	}//end func

	//判断是否是清一色
	self.sameColor = function(data){
		if(data.length == 1){
			result.total += 2;
			result.detail.push({
				type:"清一色",
				val:2
			});
		}
	}//end func

	//判断是否有杠
	self.Kong = function(data){
		var kong = 0;
		var root = 0;
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str += data[i] + "";
			for (var j = 1; j <= 9; j++) {
				if(self.judgeLetterNum(data[i],j) == 4) root++;
			};
		};
		var x = str.length - 14;
		for (var i = 0; i < x; i++) {
			kong++;
			root--;
		};
		if(kong > 0){
			result.total += kong;
			result.detail.push({
				type:"杠",
				val:1,
				num:kong
			});
		}
		if(root > 0){
			result.total += root;
			result.detail.push({
				type:"根",
				val:1,
				num:root
			});
		}
	}//end func

	//判断一副麻将牌是否合法
	self.judgeLegal = function(data){
		var bool = true;
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str += data[i] + "";
			for (var j = 1; j <= 9; j++) {
				if(self.judgeLetterNum(data[i],j) > 4) bool = false;
			};
		};
		if(str.length < 14) bool = false;
		return bool;
	}//end func

	//判断某个字母在字符串中的数量
	self.judgeLetterNum = function(str,l){
		var item = str + "";
		l = l + "";
		var num = item.split(l).length - 1;
		return num;
	}//end func

	//重置一次胡牌的计分
	self.reset = function(){
		result = {
			total:0,
			TotalScore:0,
			detail:[]
		};
	}//end func
}//end func

var imahjong = new mahjong();