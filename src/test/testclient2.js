import io from 'socket.io-client';


import $ from  'jquery';

import 'jquery';

//服务端js在 private_materials/node/test17/service.js
// WebSocket协议-Socket.io 客户端API https://www.jianshu.com/p/d5616dc471b9   https://www.w3cschool.cn/socket/socket-k49j2eia.html
// WebSocket协议-Socket.io 服务端API https://www.jianshu.com/p/8d28d3e0b43e   https://www.w3cschool.cn/socket/socket-odxe2egl.html

/**
 * options （对象）path （字符串） 命名路径，用来捕获服务器端的服务，默认为socket.io
 * reconnection （布尔型）是否自动重新建立连接，默认为true
 * reconnectionAttempts （Number） 尝试重连的次数，默认为无限次
 * reconnectionDelay （数值型） 重寻创建连接的延迟时长，默认为1000毫秒，受randomizationFactor正负加减的影响。
 * 比如默认的初始化延迟将在500至1500毫秒之间。reconnectionDelayMax （数值型）最大的重连等待时间，默认为5000毫秒。每一次尝试都会以两倍的增量增加重连的时间。
 * randomizationFactor （数值型）默认为0.5，最小为0，最大为1
 * timeout （数值型） connect_error和connect_timeout事件触发前的延迟时间，默认为20000毫秒
 * autoConnect （布尔型） 如果设置为fasle，你不得不手动调用manage.open函数
 * query （对象）：当连接到一个命名空间，额外的查询参数将被发送（随后可以到服务器端查找socket.handshake.query对象）
 * parser （解析器）：默认的为一个Parser实例
 * 断开连接后等待首次尝试重连的时间最大为10秒，超出以10秒计算，第一次重连失败开始到第二次重连开始的间隔时间最大为10秒，超出以10秒计算，之后的每次重连间隔等待时间均为上一次间隔时间的2倍，
 */
const socket =  io('http://localhost:5000');

// 连接成功监听
socket.on('connect', function () {
    console.log( 'socket 已连接啦' );
    console.log( socket.id );   // 标识socket session独一无二的符号，在客户端连接到服务端被设置
});

// 监听服务器端触发 serviceEventA 事件，并接收发来的数据
socket.on( "serviceEventA", function( data ){
    console.log( data );
} )
// 监听服务器端触发 serviceEventC 事件，并接收发来的多个参数数据
socket.on( "serviceEventC", function( data1, data2, data3 ){
    console.log( data1 );
    console.log( data2 );
    console.log( data3 );
} )
// 监听服务器端触发 serviceEventB 事件，并接收发来的数据，再将获取的数据发送回服务器端
socket.on( "serviceEventB", function( data, fn ){
    console.log( data );
    fn( data + ' aaaa' )
} )

socket.on( "message", function( data ){
    console.log(  "服务器发送的send事件：" + data );
} )

setTimeout( function(){
    // 客户端主动向服务器端发送数据
    socket.emit( "clientEventA", "i am clientA" )
    socket.emit( "clientEventB", "i am clientB", function( data ){
        console.log( data );
    } )
    socket.send( "这是一个客户端发送的send操作，由服务器端监听message事件获取此消息" )
}, 5000 )



// 连接错误触监听
socket.on('connect_error', function(error){
    socket.send( {userName: 'zh', message: '9999'} )
    console.log( error );
});

// 断开连接监听
socket.on( "disconnect", function( reason ){
    console.log( reason );
    console.log( 'socket已断开连接' );
} )

// 页面关闭时手动关闭客户端对服务器的链接               
$(window).on('beforeunload unload', function() {  
    socket.send( {userName: 'nitx1', message: '9999'} ); 
    socket.close();
}); 

// 重连API
socket.on('reconnecting', function( attempt ){
    console.log('reconnecting尝试重连时触发事件');
    console.log( '重连次数：' + attempt );
});
socket.on('reconnect_attempt', function( attempt ){
    console.log('reconnect_attempt尝试重连时触发事件');
    console.log( '重连次数：' + attempt );
});
socket.on('reconnect', function( attempt ) {
    console.log('成功重新连接到服务器');
    console.log( '重连次数：' + attempt );
});
socket.on('reconnect_error', function(error){
    console.log( "重连错误" );
    console.log( error );
});
socket.on('reconnect_failed', function(){
    console.log( "重连失败" );
});