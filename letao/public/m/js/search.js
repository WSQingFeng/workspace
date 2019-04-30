$(function(){
	// 功能分析
	// 1没有搜索历史记录：隐藏 清空按钮 ，改 搜索历史 文本内容
	// 2有历史记录：显示 清空按钮
	// 2.1动态渲染
	// 2.2点击 删除按钮 ，删除该历史记录(1改localStorage 2立即隐藏)
	// 2.3删除完历史记录或点击 清空按钮 ，执行功能1
	// 3添加历史记录：
	// 3.1规范搜索内容：不能有特殊符号
	// 3.2当搜索内容不在历史记录中，添加到历史记录
	


	// localStorage.getItem('history') 为空时，隐藏 清空记录，改 搜索历史
	var hisFunc = function(){
		$('.clearHistory').addClass("mui-hidden");
		$('.top span:first-of-type').text('没有历史搜索记录');
	};

	// 动态加载历史记录
	var historyStr = localStorage.getItem('history');
	if(!historyStr){
		hisFunc();
	}else {
		var historyArr = historyStr.split(',');
		var code = '';
		for(var i = 0; i < historyArr.length; i ++){
			code += '<li id=' + i + '><a href="javascript:;">'+ historyArr[i] +'</a><span class="delete_btn fa fa-remove"></span></li>';
		}
		$('.clearHistory').removeClass('mui-hidden');
		$('.history ul').html(code);
	}

	// 点击 .delete_btn 删除所在的li (事件委托)
	$('.history ul').on('click', 'span', function(){
		var index = $(this).parent().attr('id');
		historyArr.splice(index, 1);
		historyStr = historyArr.join(',');
		localStorage.setItem('history', historyStr);
		$(this).parent().addClass("mui-hidden");
		// console.log(historyArr);
		if(!historyArr.length){
			hisFunc();
		}
	});

	// 点击 清空记录 ，清空localStorage
	$('.clearHistory').on('click', function(){
		localStorage.clear('history');
		$('.history ul').addClass("mui-hidden");
		hisFunc();
	});

	


	// 点击 搜索，如果 input 中有内容，转跳并搜索内容；如果没有，提示请输入内容
	var $input = $('input');
	$('.search a').on('click', function(){
		var key = $input.val().replace(/\s*/g,"");
		if(!key){
			mui.toast('请输入搜索内容');
			return false;
		}
		// 检测key中是否有特殊符号
		var myReg = "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]";
		if(myReg.indexOf(key) != -1){
			mui.toast('输入的内容含有非法字符');
		}

		// 制作历史记录 localStorage
		// console.log(localStorage.getItem('history'));
		var str = '';
		if(localStorage.getItem('history')) {
			str = localStorage.getItem('history');
			var arr = str.split(',');
			if(arr.indexOf(key) == -1){
				arr.push(key);
				str = arr.join(',');
			}
		}else {
			str = key;
		}
		localStorage.setItem('history', str);

		// 跳转页面
		location.href = 'searchList.html?key=' + key;

	});


});