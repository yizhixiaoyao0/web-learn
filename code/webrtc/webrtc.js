(function () {
  //变量
  var socket = new WebSocket("ws://localhost:9090");
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

      //stun服务器
      var configuration = {
          "iceServers": [{
              "url": "stun:stun2.1.google.com:19302"
          }]
      };

      pc = new webkitRTCPeersocketection(configuration);

      //当远程用户向对等连接添加流时，绑定到本地
      pc.onaddstream = function (e) {
          remoteVideo.srcObject = e.stream;
      };

      pc.onicecandidate = function (event) {
          if (event.candidate) {
              send({
                  type: "candidate",
                  candidate: event.candidate
              });
          }
      };

      navigator.webkitGetUserMedia({
          video: true,
          audio: true
      }, function (myStream) {
          //stream = myStream;
          //显示本地视频
          localVideo.srcObject = stream;
          //向pc添加本地流
          pc.addStream(stream);

      })
  };


  //socket出错
  socket.onerror = function (err) {
      console.log("socket服务器链接出错", err);
  };

  //封装触发函数
  //收到offer 
  function handleOffer(offer) {

      //设置要连接的远端
      pc.setRemoteDescription(new RTCSessionDescription(offer));

      //创建
      pc.createAnswer(function (answer) {
          pc.setLocalDescription(answer);

          send({
              type: "answer",
              answer: answer
          });

      }, function (error) {
          alert("Error when creating an answer");
      });
  };

  //收到answer
  function handleAnswer(answer) {
      //设置远端RTCSession
      pc.setRemoteDescription(new RTCSessionDescription(answer));
  };

  //收到网络连接地址
  function handleCandidate(candidate) {
      //添加RTCIceCandidate
      pc.addIceCandidate(new RTCIceCandidate(candidate));
  };

  //发送消息
  function send(message) {
      //选择要发送的人
      // if (connectedUser) { 
      //    message.name = connectedUser; 
      // }
      conn.send(JSON.stringify(message));
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
      }, function (error) {
          alert("Error when creating an offer");
      });
  });

})();