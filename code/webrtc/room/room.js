(function () {
    //变量
    var socket = new WebSocket("ws://localhost:8080/ice");
    var peerList={};
    var localStream;
    var localAccount;

    //标签
    var localVideo = document.querySelector("#localVideo");
    var accountInp = document.querySelector("#accountInp");
    var callBtn = document.querySelector("#callBtn");




    //monted
    //socket打开
    //设置turn、RTCPeerConection、本地流、远端流触发绑定、候选者触发绑定
    socket.onopen = function () {
        console.log("socket服务器连接");
        //设置本地视频
        getUserMedia();
    };

    //socket收到消息
    socket.onmessage = function (msg) {
        var data = JSON.parse(msg.data);
        switch (data.type) {
            case "login":
                console.log('login数据', data.account.toString());
                handleLogin(data);
                break;
            case "offer":
                console.log("offer数据", data.account.toString());
                handleOffer(data);
                break;
            case "answer":
                console.log("answer数据", data.account.toString());
                handleAnswer(data);
                break;
            case "candidate":
                handleCandidate(data);
                break;
            default:
                console.log("未知消息");
                break;
        }
    };

    //封装触发函数
    //收到login
    function handleLogin(data) {
        console.log("收到login");

        data.users.forEach(user => {
            let accountTo = {};
            let arr = [user, localAccount];
            accountTo = arr.sort().join('-');
            if (!peerList[accountTo] && user !== localAccount) {
                console.log("其他用户:",user);
                createPeerConnection(accountTo);
            }
        });

        if (localAccount === data.account) {
            for (let k in peerList) {
                console.log('发送一次offer',k);
                createOffer(k, peerList[k]);
            }
        }
    };

    //收到answer
    function handleAnswer(data) {
        console.log("收到answer");
        peerList[data.account] && peerList[data.account].setRemoteDescription(new RTCSessionDescription(data.answer));
    };

    //收到offer
    function handleOffer(data) {

        peerList[data.account] && peerList[data.account].setRemoteDescription(new RTCSessionDescription(data.offer));

        peerList[data.account] && peerList[data.account].createAnswer(function (answer) {
            peerList[data.account].setLocalDescription(answer);
            console.log("发送answer");
            send({
                type: "answer",
                answer: answer,
                account:data.account
            });

        }, function (error) {
            alert("Error when creating an answer");
        });
    };

    //收到网络连接地址
    function handleCandidate(data) {
        //添加RTCIceCandidate
        peerList[data.account] && peerList[data.account].addIceCandidate(new RTCIceCandidate(data.candidate));
    };

    //登录
    callBtn.addEventListener("click", function () {
        localAccount = accountInp.value;
        if (!localAccount) {
            alert("请输入用户名");
            return;
        }
        
        console.log("发送login");
        send({
            type: "login",
            account: localAccount
        });
    });

    //设置本地视频
    function getUserMedia() {

        navigator.webkitGetUserMedia({
            video: true,
            audio: true
        }, function (stream) {
            localVideo.srcObject = stream;
            localStream = stream;

            console.log("获取视频流结束");
        }, function (error) {
            console.log("获取视频流失败", error);
        });
    }

    //socket出错
    socket.onerror = function (err) {
        console.log("socket服务器链接出错", err);
    };

    //发送消息
    function send(message) {
        socket.send(JSON.stringify(message));
    };


    //创建peer对象
    function createPeerConnection(account) {
        let iceServer = {
            "iceServers": [{
                "url": "stun:stun.l.google.com:19302"
            }]
        };

        let PeerConnection = (window.RTCPeerConnection ||
            window.webkitRTCPeerConnection ||
            window.mozRTCPeerConnection);

        // 创建
        let peer = new PeerConnection(iceServer);

        //向PeerConnection中加入需要发送的流
        peer.addStream(localStream);

        //如果检测到媒体流连接到本地，将其绑定到一个video标签上输出
        peer.onaddstream = function (event) {
            // let videos = document.querySelector('#' + account);
            // console.log('获取',videos);
            // if (videos) {
            //     console.log('存在',videos);
            //     videos.srcObject = event.stream;
            // } else {
                let video = document.createElement('video');
                video.controls = true;
                video.autoplay = 'autoplay';
                video.srcObject = event.stream;
                video.id = account;
                document.body.append(video);
            // }
        };
        //收到网络连接地址
        peer.onicecandidate = function (event) {
            if (event.candidate) {
                send({
                    type: "candidate",
                    candidate: event.candidate,
                    account: account
                });
            }
        };
        peerList[account] = peer;
    }

    //创建offer
    function createOffer(account, peer) {
        peer.createOffer(function (offer) {
            //发送offer
            send({
                type: "offer",
                offer: offer,
                account: account
            });
            //设置本地RTCSession
            peer.setLocalDescription(offer);

            console.log("发送offer");
        }, function (error) {
            alert("Error when creating an offer");
        });
    }


})();