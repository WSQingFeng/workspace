$(function(){
	// 区域滚动初始化
	mui('.mui-scroll-wrapper').scroll({
		indicators: false
	});

	render();
});
// 1.ajax获取所有一级分类并默认获取第一个一级分类下的二级分类
var render = function(){
	getFirstCate(function(data){
		$('.lt_cateLeft ul').html(template('firstCate', data))
	});

	getSecondCate({'id': 1}, function(data){
		$('.lt_cateRight ul').html(template('secondCate', data));
	});
};
// 2.点击一级分类，加载对应的二级分类(li时动态生成的，不能直接绑定事件,事件委托)
$('.lt_cateLeft ul').on('tap', 'li', function(){
	// 触发事件一级目录的 data-id
	var categoryId = $(this).data('id');
	getSecondCate({'id': categoryId}, function(data){
		$('.lt_cateRight ul').html(template('secondCate', data));
	});
	$(this).parent().find('li').removeClass("now");
	$(this).addClass("now");

});


// ajax获取所有一级分类
var getFirstCate = function(callback){
	$.ajax({
		url: '/category/queryTopCategory',
		type: 'get',
		data: '',
		dataType: 'json',
		success: function(data){
			console.log(data);
			// 渲染一级分类
			callback && callback(data);

		}
	});
};
// ajax获取对应的二级分类
var getSecondCate = function(param, callback){
	$.ajax({
		url: '/category/querySecondCategory',
		type: 'get',
		data: param,
		dataType: 'json',
		success: function(data){
			console.log(data);
			callback && callback(data);
		}
	});
};