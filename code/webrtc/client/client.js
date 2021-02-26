(function () {
    //变量
    var socket = new WebSocket("ws://192.168.1.48:8888/kurento");
    var pc;

    var stream;

    //标签
    var localVideo = document.querySelector("#localVideo");
    var remoteVideo = document.querySelector("#remoteVideo");
    var callBtn = document.querySelector("#callBtn");

    //monted
    //socket打开
    //设置turn、RTCPeerConection、本地流、远端流触发绑定、候选者触发绑定
    socket.onopen = function () {
        console.log("socket服务器连接");

        navigator.webkitGetUserMedia({
            video: true,
            audio: true
        }, function (stream) {

            //显示本地视频
            console.log("添加视频流");
            localVideo.srcObject = "rtsp://192.168.1.172:8554/test";
            
            //stun服务器
            var configuration = {
                "iceServers": [{
                    "url": "stun:stun2.1.google.com:19302"
                }]
            };

            pc = new webkitRTCPeerConnection(configuration);

            //向pc添加本地流
            console.log("向pc添加本地流");
            pc.addStream(stream);


            //当远程用户向对等连接添加流时，绑定到本地
            pc.onaddstream = function (e) {
                remoteVideo.srcObject=e.stream;
            };
            //收到网络连接地址
            pc.onicecandidate = function (event) {
                if (event.candidate) {
                    send({
                        type: "candidate",
                        candidate: event.candidate
                    });
                }
            };
            console.log("获取视频流结束");
        }, function (error) {
            console.log("获取视频流失败", error);
        });

    };

    //socket收到消息
    socket.onmessage = function (msg) {

        var data = JSON.parse(msg.data);
        switch (data.type) {
            case "offer":
                console.log("offer数据",msg.data.session);
                handleOffer(data.offer);
                break;
            case "answer":
                console.log("answer数据",msg.data.session);
                handleAnswer(data.answer);
                break;
            case "candidate":
                handleCandidate(data.candidate);
                break;
            default:
                console.log("未知消息");
                break;
        }
    };

    //封装触发函数
    //收到answer
    function handleAnswer(answer) {
        //设置远端RTCSession
        console.log("收到answer");
        pc.setRemoteDescription(new RTCSessionDescription(answer));
    };

    //收到offer
    function handleOffer(offer) {
        console.log("收到offer");
        pc.setRemoteDescription(new RTCSessionDescription(offer));

        //create an answer to an offer 
        pc.createAnswer(function (answer) {
            pc.setLocalDescription(answer);
            console.log("发送answer");
            send({
                type: "answer",
                answer: answer
            });

        }, function (error) {
            alert("Error when creating an answer");
        });
    };

    //收到网络连接地址
    function handleCandidate(candidate) {
        //添加RTCIceCandidate
        // console.log("收到candidate");
        pc.addIceCandidate(new RTCIceCandidate(candidate));
    };

    //发送消息
    function send(message) {
        //选择要发送的人
        // if (connectedUser) { 
        //    message.name = connectedUser; 
        // }
        socket.send(JSON.stringify(message));
    };

    //initiating a call
    callBtn.addEventListener("click", function () {
        // create an offer 
        pc.createOffer(function (offer) {
            //发送offer
            send({
                type: "offer",
                offer: offer
            });
            //设置本地RTCSession
            pc.setLocalDescription(offer);

            console.log("发送offer");
        }, function (error) {
            alert("Error when creating an offer");
        });
    });

    //socket出错
    socket.onerror = function (err) {
        console.log("socket服务器链接出错", err);
    };


})();