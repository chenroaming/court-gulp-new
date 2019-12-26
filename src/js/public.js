//轮播图
$(document).ready(function () {
  const mySwiper = new Swiper ('.pic-box', {
    autoplay:{
      delay: 2500,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    loop: true, // 循环模式选项
  })
})
//忘记密码步骤条
const steps1 = steps({
    el: "#steps1",
    data: [
        { title:"", description: "验证手机号" },
        { title:"", description: "设置新密码" },
        { title:"", description: "重置密码完成" }, 
    ],
    center:true,
    active: 0,
    dataOrder: ["line","description"]
});

$('.login-wrapper').hover(function() {
  // 鼠标移入时添加hover类
  $(this).addClass('login-wrapper-hover')
  }, function() {
  // 鼠标移出时移出hover类
  $(this).removeClass('login-wrapper-hover')
});
function jumpBigData(e) {
  if (e && e.preventDefault)
    e.preventDefault();
  else
    window.event.returnValue = false;
  if (getUserInfo())
    window.open(window.event.target)
  else
    openLogin()
}

$('#opinion').click(function(){
  sweetAlert({
    type:'warning',
    title:'该功能暂未开通！',
    timer: 1500
  })
})

$(function () {
  getUserInfo()
})

function noIn(e){
  if (e && e.preventDefault)
    e.preventDefault();
  else
    window.event.returnValue = false;
    alert('你好！系统正在优化升级中')

}
function getUserInfo() {
  var hasLogin = false
  $.ajax({
    url: '/api/main/getUserInfo.jhtml',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      if (data.state == 100) {
        $(".login-wrapper").addClass('hide');
        $(".user-wrapper").removeClass('hide');
        if (data.result.name == null) {
          $('#userName').attr('title','欢迎您，' + data.result.name);
          $('#userName').text('欢迎您！' + data.result.username);
        } else {
          $('#userName').attr('title','欢迎您，' + data.result.name);
          $('#userName').text('欢迎您！' + data.result.name)
          $(".topli").removeClass('disabled');
          hasLogin = true
        }

      }
    }
  })
  return hasLogin
}

function logout() {
  $.ajax({
    url: '/api/main/loginOut.jhtml',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      if (data.state == 100) {
        $(".login-wrapper").removeClass('hide');
        $(".user-wrapper").addClass('hide');
        sweetAlert({
          title: data.message,
          type: "success",
          timer: 1500
        });
      }
    }
  })
}

function openNotice(){
  swal({
      width:800,
      padding:100,
      // type: 'info',
      title: '在线诉讼指南',
      html: "<p class='noticeTit' style='    margin-top: 25px;'>登录平台</p>\
      <p class='noticeCon'>1.平台网址为（https://dq.hlcourt.gov.cn）。为保证用户信息安全和在线操作流畅性，建议使用谷歌chrome 浏览器(69以上版本)，或QQ、 火 狐、搜狗最新版本浏览器登录平台。</p>\
      <p class='noticeCon'>2.点击平台首页右上角注册按钮，进入用户注册界面；输入手机号获取验证码，进入身份信息填写界面；按页面提示录入身份信息，并上传证件照片，完成初始注册。</p>\
      <p class='noticeCon'>3.登录账号为身份证号码，密码随机生成并通过短信发送到注册登记的手机号码上，密码为初始密码，请及时修改，保护个人信息安全。</p>\
      <p class='noticeCon' style='margin-bottom:30px'>4.用户首次登录平台需进行实名认证。请按系统提示使用手机微信扫描登录界面的二维码，进行人脸识别并输入短信验证码后即完成实名认证。</p>\
      <p class='noticeTit'>在线立案</p>\
      <p class='noticeCon'>1.用户登录平台后，选择“在线立案”，选择身份为当事人或代理人。</p>\
      <p class='noticeCon'>2.按页面提示填写立案要素，上传起诉状、身份证明及授权委托材料、证据材料，点击确认提交。</p>\
      <p class='noticeCon'>3.平台会自动生成立案回执编号，请妥善保管此编号，以便于后续查询立案信息。</p>\
      <p class='noticeCon' style='margin-bottom:30px'>4.经法院审查予以立案，平台以短信通知原告，原告可登录平台扫码缴费。</p>\
      <p class='noticeTit'>在线送达</p>\
      <p class='noticeCon' style='margin-bottom:30px'>1.登录平台后，选择“易送达”可查看案件流程信息，或在线提交案件材料，选择文件类型(如证据、申请书等)并上传相应文件(文件格式支持：doc、docx、xls、xlsx、jpg、png、jpeg、bmp) 。</p>\
      <p class='noticeTit'>在线质证</p>\
      <p class='noticeCon'>1.登录平台后，选择“在线质证”。</p>\
      <p class='noticeCon'>2.选择案号，点击进入举证页面。填写证据名称、来源、证明对象，并上传证据。经核对无误后，点击确认提交，完成在线举证。（提示：点击“确认提交”前， 可对填写内容进行修改，或撤回证据；点击“确认提交”后不可修改或删除）。</p>\
      <p class='noticeCon'>3.一方当事人在线举证后，平台以短信自动通知其他各方当事人。</p>\
      <p class='noticeCon' style='margin-bottom:30px'>4.选择案号，点击进入质证页面。对对方上传的证据发表质证意见，也可查看对方对已方证据的质证意见。</p>\
      <p class='noticeTit'>在线庭审</p>\
      <p class='noticeCon'>1.参加在线庭审需具备可上网电脑、摄像头、耳麦等硬件设备。开庭前，先进行调试设备，请勿在暄闹或人流较多的场所参加在线庭审。</p>\
      <p class='noticeCon'>2.登录平台后，选择“在线庭审”，点击相应案号中的“进入庭审”，进行人脸识别，经验证无误后即可进入在线法庭。</p>\
      <p class='noticeCon'>3.在线庭审时，当事人应遵从法庭指挥，如有证据材料需当庭提交，经法官同意后，可点击庭审界面右侧证据列表中的“上传证据”，上传证据材料。</p>\
      <p class='noticeCon'>4.在线庭审过程通过AI语音识别，同步记录，并录音录像，如庭审过程中出现网络中断等情况，请及时与法官联系。除经查明确属网络故障、设备损坏、\
              电力中断或者不可抗力等原因外，当事人不按时参加在线庭审的，视为“拒不到庭”，庭审中擅自退出的，视为“中途退庭”，分别按照《中华人民共和\
              国民事诉讼法》及相关司法解释的规定处理。</p>\
      ",
      confirmButtonText: '确定',
      confirmButtonColor: '#4cd964'
  });
}
//ajax的小封装
function ajaxGet(url,data =''){
    let response = '';
    $.ajax({
      url: url,
      type: 'get',
      async: false,
      data:data,
      success: (res)=> {
        response = res;
      },
      error: ()=> {
        sweetAlert({
            title: '网络错误，请重试！',
            type: "warning",
            timer: 1500
          });
      }
    });
    return response;
  }

  function ajaxPost(url,data){
    let response = '';
    $.ajax({
      url: url,
      type: 'post',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      data:JSON.stringify(data),
      success:(res)=> {
        response = res;
      },
      error: ()=> {
        sweetAlert({
            title: '网络错误，请重试！',
            type: "warning",
            timer: 1500
          });
      }
    });
    return response;
  }

  function previewImage(target) {
    console.log($(target).prev().children('img'))
    console.log(target.files[0])
    if (target.files[0]) {
      var formData = new FormData()
      formData.append('file', target.files[0])
      $.ajax({
        url: '/api/main/registerUpload.jhtml',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
          console.log(res)
          
          if (res.messge=="上传成功") {
            $(target).prev().children('img')[0].src = res.url
          }else{
            sweetAlert({
        title: res.message,
        type: 'error',
        confirmButtonText: "好的"
      })
          }
        }
      })
    } else {
      sweetAlert({
        title: '请选择正确文件',
        type: 'error',
        confirmButtonText: "好的"
      })
    }
  }

// 打开登录弹框
function openLogin() {
    $("#login-d").removeClass("hide");
    $("#lawyer").addClass("hide");
    $(".back-h").removeClass('hide');
    $(".code-ch").attr("src", "/api/main/code.jhtml?tm=" + Math.random())
  }
  //打开注册弹框
  function openSign() {
    $(".signform1").removeClass("hide");
    $(".signform2").addClass("hide");
    $("#signBtn").addClass("hide");
    $("#nextBtn").removeClass("hide");
    $('label').show();
    $('.swal2-checkbox').hide();
    // sweetAlert({
    //   title: '请选择注册角色',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: '自然人',
    // //   confirmButtonText: '律师',
    //   cancelButtonText: '法人/非法人',
    //   allowOutsideClick: false
    // }).then((result) => {
    //   if (result.value) {
    //     $("#sine").removeClass("hide");
    //     $(".back-h").removeClass('hide');
    //   } else {
    //     $("#legal").removeClass("hide");
    //     $(".back-h").removeClass('hide');
    //   }
    // })
    // $("#select").on("click", function() {
        
		swal({
			title: '请选择您的身份',
			input: 'select',
			inputOptions: {
				'sine': '自然人',
				'legal': '法人/非法人',
				'lawyer': '代理人'
			},
			inputPlaceholder: '选择你的身份',
			showCancelButton: true,
			confirmButtonText: '确定',
            confirmButtonColor: '#4cd964',
            cancelButtonText: '取消',
			preConfirm: function() {
				return new Promise(function(resolve) {
					 resolve();
				});
			}
		}).then(function(result) {
			console.log(result)
            if (result.value=='sine') {
                $("#sine").removeClass("hide");
                $(".back-h").removeClass('hide');
            } else if (result.value=='legal') {
                $("#legal").removeClass("hide");
                $(".back-h").removeClass('hide');
            }else if (result.value=='lawyer') {
                swal({
                    title: '请选择您代理人的身份',
                    input: 'select',
                    inputOptions: {
                        1: '律师 ',
                        2: '法律工作者',
                        3: '单位工作人员',
                        4: '近亲属',
                        5: '公民',
                    },
                    inputPlaceholder: '请选择您代理人的身份',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    confirmButtonColor: '#4cd964',
                    cancelButtonText: '取消',
                    preConfirm: function() {
                        return new Promise(function(resolve) {
                            resolve();
                        });
                    }
                }).then(function(result) {
                    console.log(result)
                    if (result.value) {
                        LawyerState=result.value
                        console.log(LawyerState)
                        $("#lawyer").removeClass("hide");
                        $('.signform1Lawyer').removeClass('hide');
                        $('.signform2Lawyer').addClass('hide');
                        $('label').show();
                        $('.swal2-checkbox').hide();
                        $(".back-h").removeClass('hide');
                        $('#nextBtnLawyerBtn').removeClass('hide');
                        if (LawyerState==1) {
                            $('#lawerNumBox').removeClass("hide");
                            $('#lawFirmBox').removeClass("hide");
                            $('#lawerImgBox').removeClass("hide");
                        }else{
                            $('#lawerNumBox').addClass("hide");
                            $('#lawFirmBox').addClass("hide");
                            $('#lawerImgBox').addClass("hide");
                        }
                    }else if (result.value=='') {
                        swal({
                            type: 'warning',
                            html: '未选取代理人身份',
                            confirmButtonText: '确定',
                            confirmButtonColor: '#4cd964'
                        });
                    }
                });
            }else if (result.value=='') {
                swal({
					type: 'warning',
					html: '未选取身份',
					confirmButtonText: '确定',
					confirmButtonColor: '#4cd964'
				});
            }
		});

  }


  //关闭注册登录弹框
  $(".quit-b").on("click", function () {
    $('.form-data').addClass("hide");
    $(".back-h").addClass('hide');
    steps1.setActive(0);
    $('.rsPwdPhone').removeClass('hide');
    $('.newPwd').addClass('hide');
  })
  //切换注册页面
  function changeSign() {
    $("#login-d").addClass('hide');
    $("#sine").removeClass("hide");
    $('#forgetPwd-d').addClass('hide');
    steps1.setActive(0);
    $('.rsPwdPhone').removeClass('hide');
    $('.newPwd').addClass('hide');
  }

  //开启忘记密码弹框
  function forgetPwd() {
    $('#login-d').addClass('hide');
    $('#sine').addClass('hide');
    $('#forgetPwd-d').removeClass('hide');
  }
  

  //忘记密码提交表单
  let resetPwdChkCode = '';//忘记密码验证码临时存储
  function resetPwd(){
    let phoneNum = $('#phoneNum').val();
    let authCode = $('#forgetPwd-cd').val();
    if(steps1.getActive() == 0){
      if(!checkPhoneNum(phoneNum)){
        return sweetAlert({
          title: '请输入正确的手机号码！',
          type: "warning",
          timer: 1500
        });
      }
      if(authCode == ''){
        return sweetAlert({
          title: '验证码不为空！',
          type: "warning",
          timer: 1500
        });
      }
      if($('#sending').hasClass('hide')){
        return sweetAlert({
          title: '请先获取验证码！',
          type: "warning",
          timer: 1500
        });
      }
      let data = {phone: phoneNum,code: authCode};
      let res = ajaxGet('/api/main/verifyCode.jhtml',data);
      if(res.state == 100){
        sweetAlert({
          title: res.message,
          type: "success",
          timer: 1500
        });
        resetPwdChkCode = authCode;
        $('.rsPwdPhone').addClass('hide');
        $('.newPwd').removeClass('hide');
        steps1.setActive(steps1.getActive()+1);
        $('#forgetPwd-cd').val('');
      }else{
        sweetAlert({
          title: res.message,
          type: "warning",
          timer: 1500
        });
      }
    }else if(steps1.getActive() == 1){
      let firPwd = $('#forgetPwd1').val();
      let secPwd = $('#forgetPwd2').val();
      if(firPwd == '' || secPwd == ''){
        return sweetAlert({
          title: '输入的密码为空！',
          type: "warning",
          timer: 1500
        });
      }
      if(firPwd !== secPwd){
        return sweetAlert({
          title: '两次输入的密码不一致！',
          type: "warning",
          timer: 1500
        });
      }
      const regx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if(!regx.test(firPwd) || !regx.test(secPwd)){
        return sweetAlert({
          title: '密码需为8-16位的数字和英文字母组合！',
          type: "warning",
          timer: 3000
        });
      }
      let data = {phone: phoneNum,code: resetPwdChkCode,fir_password: MD5(firPwd),sec_password: MD5(secPwd)};
      let res = ajaxPost('/api/main/resetPassword.jhtml',data);
      if(res.state == 100){
        sweetAlert({
          title: res.message,
          type: "success",
          timer: 1500
        });
        let count = 5;
        $('#forgetPwd-d button').addClass('hide');
        steps1.setActive(steps1.getActive()+1);
        $('.tips').removeClass('hide');
        $('.tips').text('将在'+count+'秒钟后跳转至登录页面');
        $('.newPwd').addClass('hide');
        let timer = setInterval(function(){
          count --;
          $('.tips').text('将在'+count+'秒钟后跳转至登录页面');
        },1000);
        setTimeout(function(){
          $('#login-d').removeClass('hide');
          $('#forgetPwd-d').addClass('hide');
          steps1.setActive(0);
          $('.tips').addClass('hide');
          clearInterval(timer);
          $('#forgetPwd-d button').removeClass('hide');
          $('.rsPwdPhone').removeClass('hide');
        },5000);
      }else{
        sweetAlert({
          title: res.message,
          type: "warning",
          timer: 1500
        });
      }
    }else{
      $('#forgetPwd-d button').addClass('hide');
      let count = 5;
      $('.tips').removeClass('hide');
      $('.tips').text('将在'+count+'秒钟后跳转至登录页面');
      $('.newPwd').addClass('hide');
      let timer = setInterval(function(){
        count --;
        $('.tips').removeClass('hide');
        $('.tips').text('将在'+count+'秒钟后跳转至登录页面');
      },1000);
      setTimeout(function(){
        $('#login-d').removeClass('hide');
        $('#forgetPwd-d').addClass('hide');
        steps1.setActive(0);
        clearInterval(timer);
        $('.tips').addClass('hide');
        $('#forgetPwd-d button').removeClass('hide');
        $('.rsPwdPhone').removeClass('hide');
      },5000);
    }
  }

  //忘记密码手机号正则校验
  function checkPhoneNum(num){
    let phone = $.trim(num);
    let param = /^1[3456789]\d{9}$/;
    if(param.test(phone)){
      return true;
    }else{
      return false;
    }
  }

  //忘记密码模块手机号码输入验证

  $('#phoneNum').keyup(function(){
    $('#forgetPwd-phone').addClass('hide');
  })

  //忘记密码模块获取验证码按钮
  $('#sendAutdCode').click(function(){
    let phoneNum = $.trim($('#phoneNum').val());
    if (!checkPhoneNum(phoneNum)) {
      $('#forgetPwd-phone').removeClass('hide');
      return;
    }
    let data = {phone:phoneNum};
    let res = ajaxGet('/api/main/getBackPassword.jhtml',data);
    if(res.state == 100){
      sweetAlert({
        title: res.message,
        type: "warning",
        timer: 1500
      });
      let countText = 59;
      $("#sendAutdCode").addClass('hide');
      $('#sending').removeClass('hide');
      $("#sending").html(countText);
      let timmer = setInterval(function () {
        countText --;
        $("#sending").html(countText);
        if (countText == 0) {
          $('#sending').addClass('hide');
          $("#sendAutdCode").removeClass('hide');
          clearInterval(timmer);
        }
      }, 1000);
    }else{
      sweetAlert({
        title: res.message,
        type: "warning",
        timer: 1500
      });
    }
  })
  
  //切换登录页面
  function changeLogin() {
    $("#legal").addClass('hide');
    $("#sine").addClass('hide');
    $("#lawyer").addClass('hide');
    $("#login-d").removeClass("hide");
  }

  var tab = 'account_number';
  // 选项卡切换
  $(".account_number").click(function () {
    $('.log-btn').removeClass('hide')
    $('.tel-warn').addClass('hide');
    tab = $(this).attr('class').split(' ')[0];
    $(this).addClass("on");
    checkBtn()
    $(".message").removeClass("on");
    $(".codeWeiXin").removeClass("on");
    $(".form2").addClass("hide");
    $(".form1").removeClass("hide");
    $(".form3").addClass("hide");
  });
  // 选项卡切换
  $(".message").click(function () {
    $('.log-btn').removeClass('hide')
    $('.tel-warn').addClass('hide');
    tab = $(this).attr('class').split(' ')[0];
    $(this).addClass("on");
    checkBtn()
    $(".account_number").removeClass("on");
    $(".codeWeiXin").removeClass("on");
    $(".form2").removeClass("hide");
    $(".form1").addClass("hide");
    $(".form3").addClass("hide");

  });
  $('.weiXinCodeImg').click(function(){
    $.ajax({
      url: '/api/main/wxScanLoginEncoder.jhtml',
      type: 'get',
      dataType: 'json',
      async: false,
      success: function (data) {
        // if (data.state == 100) {
          
          $('.weiXinCodeImg').attr('src','/' +  data.path)
            window.setTimeout(function(){
                
                // console.log(that.isLoginS)
                // if(that.isLoginS == false){
                //     console.log(777)
                //     that.overShow = true;
                //     // that.websocketclose();
                // }
            }
            , 1000 * 100);
        // }
      }
    })
  })
  // 选项卡切换
  $(".codeWeiXin").click(function () {
      $('.log-btn').addClass('hide')
    $('.tel-warn').addClass('hide');
    tab = $(this).attr('class').split(' ')[0];
    $(this).addClass("on");
    checkBtn()
    $(".account_number").removeClass("on");
    $(".message").removeClass("on");
    $(".form2").addClass("hide");
    $(".form1").addClass("hide");
    $(".form3").removeClass("hide");
    $.ajax({
      url: '/api/main/wxScanLoginEncoder.jhtml',
      type: 'get',
      dataType: 'json',
      async: false,
      success: function (data) {
        // if (data.state == 100) {
          console.log(data)
            var path = window.location.host
            var httpNm =  document.location.protocol;
            var wsuri = "";
            if(httpNm == 'https:'){
                wsuri = 'wss://' + path + '/api/login/scan.jhtml';
            }else{
                wsuri = 'ws://' + path + '/api/login/scan.jhtml';
            }
            var websock = new WebSocket(wsuri);
            websock.onopen = function (event) {
                console.log('WebSocket:已连接');
                console.log(event);
            };
            websock.onmessage = function (event) {
                console.log(event)
                var data = JSON.parse(event.data);
                let newList = [];
                let readList = [];
                if(data.loginId){
                    var loginId = data.loginId;
                    console.log(data)
                    if(data.roles.length >1){
                        var arr = data.roles;
                        getRole(arr);
                    }else if(data.roles.length == 1){
                        let ary = data.roles[0].split(',');
                        // selRole(loginId,ary[2])
                        $.ajax({
                        url: '/api/main/optionRole.jhtml',
                        type: 'get',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        async: false,
                        data: {
                            roleType:ary[2],
                            loginId:loginId
                        },
                        success: function (data) {
                            if (data.state == 100) {
                            swal({
                                title: data.message,
                                type: "success",
                                confirmButtonText: "好的"
                            });
                            localStorage.setItem('roleIdToken',loginId);
                            getUserInfo();
                            } else {
                            swal({
                                title: data.message,
                                type: "error",
                                confirmButtonText: "好的"
                            });
                            }
                        },
                        error: function () {

                        }
                        });
                    }
                }
            }
            websock.onerror = function (event) {
                console.log('WebSocket:发生错误 ');
                console.log(event);
            };
            // this.websock.onclose = function (event) {
                
            //     console.log(event);
            // }
            websock.onclose = this.websocketclose;
          $('.weiXinCodeImg').attr('src','/' +  data.path)
            window.setTimeout(function(){
                
                // console.log(that.isLoginS)
                // if(that.isLoginS == false){
                //     console.log(777)
                //     that.overShow = true;
                //     // that.websocketclose();
                // }
            }
            , 1000 * 100);
        // }
      }
    })
  });

  //隐藏字体
  $('#num').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });

  $('#pass').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });

  $('#veri1').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });

  $('#num1').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });

  $('#pass1').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });

  $('#veri2').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });
  $('#veri2').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });
  $('#veri2').keyup(function (event) {
    $('.tel-warn').addClass('hide');
    checkBtn();
  });

  $('#idCard').keyup(function (event) {
    $('#idCardWarn').addClass('hide');
  });
  $('#password').keyup(function (event) {
    $('#passWarn').addClass('hide');
  });
  $('#password2').keyup(function (event) {
    $('#pass2Warn').addClass('hide');
  });
  $('#phonenum').keyup(function (event) {
    $('#phoneWarn').addClass('hide');
  });
  $('#phonenumLawyer').keyup(function (event) {
    $('#phoneWarnLawyer').addClass('hide');
  });

  // 按钮是否可点击
  function checkBtn() {
    $(".log-btn").off('click');
    if (tab == 'account_number') {
      var inp = $.trim($('#num').val());
      var pass = $.trim($('#pass').val());
      var veri1 = $.trim($('#veri1').val());
      if (inp != '' && pass != '' && veri1 != '') {
        $(".log-btn").removeClass("off");
        sendBtn();
      } else {
        $(".log-btn").addClass("off");
      }
    } else {
      var inp1 = $.trim($('#num1').val());
      var pass1 = $.trim($('#pass1').val());
      var veri2 = $.trim($('#veri2').val());
      if (inp1 != '' && pass1 != '' && veri2 != '') {
        $(".log-btn").removeClass("off");
        sendBtn();
      } else {
        $(".log-btn").addClass("off");
      }
    }
  }

  //更改验证码
  function changeCode() {
    $(".code-ch").attr("src", "/api/main/code.jhtml?tm=" + Math.random())
  }

  function checkAccount(username) {
    if (username == '') {
      $('.num-err').removeClass('hide').find("em").text('请输入账户');
      return false;
    } else {
      $('.num-err').addClass('hide');
      return true;
    }
  }

  function checkPass(pass) {
    if (pass == '') {
      $('.pass-err').removeClass('hide').text('请输入密码');
      return false;
    } else {
      $('.pass-err').addClass('hide');
      return true;
    }
  }

  // 登录点击事件
  function sendBtn() {
    if (tab == 'account_number') {
      $(".log-btn").click(function () {
        var inp = $.trim($('#num').val());
        var pass = $.trim($('#pass').val());
        var veri1 = $.trim($('#veri1').val());
        if (checkAccount(inp) && checkPass(pass)) {
          var ldata = {
            'idCard': inp,
            'password': MD5(pass),
            'code': veri1
          };
          console.log(989)
          $.ajax({
            url: '/api/main/login.jhtml',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data:{
              username: inp,
              password: MD5(pass),
              code: veri1,
              loginType:'litigant'
            },
            success: function (data) {
              let ele = data.data;
              if (data.state == 100) {
                $('.form-data').addClass("hide");
                $(".back-h").addClass('hide');
                $('.user-wraapper').removeClass('hide');
                $('.login-wrapper').addClass('hide');
                if(ele.roles.length == 1){
                  selRole(ele.roles[0].id,ele.roles[0].type);
                }else{
                  var arr = ele.roles;
                  getRole(arr);
                }
                
              } else if (data.state == 102) {
                swal({
                  title: '请用微信扫码进行实名认证',
                  imageUrl: ele.imagePath,
                  imageWidth: 300,
                  imageHeight: 300,
                  confirmButtonText: "好的"
                });
              } else if (data.state == 103){
                swal({
                  type: "info",
                  html:data.message,
                  confirmButtonText: "点击进行微信扫码实名认证"
                }).then(function(result) {
                    console.log(result)
                    if (result) {
                        swal({
                        title: '请用微信扫码进行实名认证',
                        imageUrl: ele.imagePath,
                        imageWidth: 300,
                        imageHeight: 300,
                        confirmButtonText: "好的"
                        });
                    }
                });
              }else {
                swal({
                //   title: data.message,
                  type: "warning",
                  html:data.message,
                  confirmButtonText: "好的"
                })
              }
              changeCode()
            },
            error: function () {

            }
          });
        } else {
          return false;
        }
      });
    } else {
      $(".log-btn").click(function () {
        var inp1 = $.trim($('#num1').val());
        var pass1 = $.trim($('#pass1').val());
        var veri2 = $.trim($('#veri2').val());
        if (checkAccount(inp1) && checkPass(pass1)) {
          $.ajax({
            url: '/api/main/login.jhtml',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data:{
              username: inp1,
              password: MD5(pass1),
              code: veri2,
              loginType:'court'
            },
            //  JSON.stringify({
            //   username: inp1,
            //   password: MD5(pass1),
            //   code: veri2,
            //   loginType:'court'
            // }),
            success: function (data) {
              if (data.state == 100) {
                swal({
                  title: data.message,
                  type: "success",
                  confirmButtonText: "好的"
                });
                $('.form-data').addClass("hide");
                $(".back-h").addClass('hide');
                $('.user-wrapper').removeClass('hide');
                $('.login-wrapper').addClass('hide');
                let ele = data.data;
                if(ele.roles){
                  if(ele.roles.length == 1){
                    selRole(ele.roles[0].id,ele.roles[0].type);
                  }else{
                    var arr = ele.roles;
                    getRole(arr);
                  }
                }
              } else {
                swal({
                  title: data.message,
                  type: "error",
                  confirmButtonText: "好的"
                });
              }
              changeCode()
            },
            error: function () {

            }
          });
        } else {
          $(".log-btn").off('click').addClass("off");
          // $('.tel-warn').removeClass('hide').text('登录失败');
          return false;
        }
      });
    }
  }


  //输入框输入时模拟placeholder效果
  var oInput = $(".form-data input");
  oInput.focus(function () {
    $(this).siblings("label").hide();
  });
  oInput.blur(function () {
    if ($(this).val() == "") {
      $(this).siblings("label").show();
    }
  });
  sign();
  //注册
  function sign() {
    $("#nextBtn").unbind("click").click(function () {
      var phone = $.trim($('#phonenum').val());
      var phoneCode = $.trim($('#phoneCode').val());
      if (phone == '') {
        $("#phoneWarn").removeClass('hide').find("em").text('手机号不能为空');
        return false;
      }
      $.ajax({
        url: '/api/main/registerPhone.jhtml',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: JSON.stringify({
          phone: phone,
          mcode: phoneCode
        }),
        success: function (data) {
          if (data.state == 100) {
            $('#phonenum').val('')
            $('#phoneCode').val('')
            $(".signform1").addClass("hide");
            $(".signform2").removeClass("hide");
            $("#signBtn").removeClass("hide");
            $("#nextBtn").addClass("hide");
          } else {
            sweetAlert({
              title: data.message,
              type: "error",
              confirmButtonText: "好的"
            });
          }
        },
        error: function () {
          status = false;
        }
      });
    })
    $("#signBtn").unbind("click").click(function () {
      var phone = $.trim($('#phonenum').val());
      var idCard = $.trim($('#idCard').val());
      var name = $('#name').val()
      var idCardUrl = $('#idCardUrl').attr('src')
      var holdIdCardUrl = $('#holdIdCardUrl').attr('src')
      if (idCardUrl == './images/pic.png' || holdIdCardUrl == './images/pic.png') {
        sweetAlert({
          title: '前上传相应图片',
          type: 'error',
          confirmButtonText: "好的"
        })
        return
      }
      if (idCard == '') {
        $("#idCardWarn").removeClass('hide').find("em").text('身份证号码不能为空');
        return false;
      }
      var password = $.trim($('#password').val());
      if (password == '') {
        $('#passWarn').removeClass('hide').find("em").text('密码不能为空');
        return false;
      }
      var password2 = $.trim($('#password2').val());
      if (password != password2) {
        $('#pass2Warn').removeClass('hide').find("em").text('密码不一致');
        return false;
      }
      var email = $.trim($('#email').val());
      var trueAddress = $.trim($('#trueAddress').val());
      $.ajax({
        url: '/api/main/registerAdmin.jhtml',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: JSON.stringify({
          idCard: idCard,
          phone: phone,
          name: name,
          password: password,
          email: email,
          trueAddress: trueAddress,
          idCardUrl: idCardUrl,
          holdIdCardUrl: holdIdCardUrl,
          litigantType: 0
        }),
        success: function (data) {
          if (data.state == 100) {
            console.log(data)
            $('#phonenum').val('')
            $('#idCard').val('')
            $('#name').val('')
            $('#password').val('')
            $('#password2').val('')
            $('#email').val('')
            $('#trueAddress').val('')
            $('#idCardUrl')[0].src = './images/pic.png';
            $('#holdIdCardUrl')[0].src = './images/pic.png';
            swal({
              title: data.message,
              type: "success",
              confirmButtonText: "好的"
            });
            $(".back-h").addClass('hide');
          } else {
            console.log(data)
            swal({
              title: data.message,
              type: "error",
              confirmButtonText: "好的"
            });
            // $(".back-h").addClass('hide');
          }
        },
        error: function () {
          status = false;
        }
      });
    })
  }


  // $('#signCompanyBtn').on('click', function () {
  //   var companyName = $('#companyName').val();
  //   var companyPassword = $('#companyPassword').val();
  //   var companyIdCard = $('#companyIdCard').val();
  //   var companyEmail = $('#companyEmail').val();
  //   var companyAddress = $('#companyAddress').val();
  //   var companyLegalName = $('#companyLegalName').val();
  //   var companyPhone = $('#companyPhone').val();
  //   var companyLegalId = $('#companyLegalId').val();
  //   var laborContractUrl = $('#laborContractUrl').attr('src')
  //   var powerAttorneyUrl = $('#powerAttorneyUrl').attr('src')
  //   console.log('11')
  //   if (laborContractUrl == './images/pic.png' || powerAttorneyUrl == './images/pic.png') {
  //     sweetAlert({
  //       title: '前上传相应图片',
  //       type: 'error',
  //       confirmButtonText: "好的"
  //     })
  //     return
  //   }
  //   $.ajax({
  //     url: '/api/main/registerAdmin.jhtml',
  //     type: 'post',
  //     dataType: 'json',
  //     contentType: 'application/json; charset=utf-8',
  //     dataType: 'json',
  //     async: false,
  //     data: JSON.stringify({
  //       name: companyName,
  //       password: companyPassword,
  //       idCard: companyIdCard,
  //       email: companyEmail,
  //       trueAddress: companyAddress,
  //       legalManName: companyLegalName,
  //       legalManPhone: companyPhone,
  //       legalManId: companyLegalId,
  //       laborContractUrl: laborContractUrl,
  //       powerAttorneyUrl: powerAttorneyUrl,
  //       litigantType: 1
  //     }),
  //     success: function (data) {
  //       if (data.state == 100) {
  //         $('#companyName').val('');
  //         $('#companyPassword').val('');
  //         $('#companyIdCard').val('');
  //         $('#companyEmail').val('');
  //         $('#companyAddress').val('');
  //         $('#companyLegalName').val('');
  //         v$('#companyPhone').val('');
  //         $('#companyLegalId').val('');
  //         $('#laborContractUrl')[0].src = './images/pic.png';
  //         $('#powerAttorneyUrl')[0].src = './images/pic.png';
  //         $("#legal").addClass("hide");
  //         swal({
  //           title: data.message,
  //           type: "success",
  //           confirmButtonText: "好的"
  //         });
  //         $(".back-h").addClass('hide');
  //       } else {
  //         swal({
  //           title: data.message,
  //           type: "error",
  //           confirmButtonText: "好的"
  //         });
  //         $(".back-h").addClass('hide');
  //         $('.form-data').addClass("hide");
  //       }
  //     },
  //     error: function () {
  //       status = false;
  //     }
  //   });
  // })


  // $("#nextBtnLawyerBtn").unbind("click").click(function () {
  //   var phone = $.trim($('#phonenumLawyer').val());
  //   var phoneCode = $.trim($('#phoneCodeLawyer').val());
  //   if (phone == '') {
  //     $("#phoneWarnLawyer").removeClass('hide').find("em").text('手机号不能为空');
  //     return false;
  //   }
  //   $.ajax({
  //     url: '/api/main/registerPhone.jhtml',
  //     type: 'post',
  //     contentType: 'application/json; charset=utf-8',
  //     dataType: 'json',
  //     async: false,
  //     data: JSON.stringify({
  //       phone: phone,
  //       mcode: phoneCode
  //     }),
  //     success: function (data) {
        
  //       if (data.state == 100) {
  //         $('#phonenumLawyer').val('')
  //         $('#phoneCodeLawyer').val('')
  //         $(".signform1Lawyer").addClass("hide");
  //         $(".signform2Lawyer").removeClass("hide");
  //         $("#signLawyerBtn").removeClass("hide");
  //         $("#nextBtnLawyerBtn").addClass("hide");
  //       } else {
  //         sweetAlert({
  //           title: data.message,
  //           type: "error",
  //           confirmButtonText: "好的"
  //         });
  //       }
  //     },
  //     error: function () {
  //       status = false;
  //     }
  //   });
  // })

  $(".send").click(function () {
    var phone = $.trim($('#phonenum').val());
    if (checkPhone(phone)) {
      sign();
      $(".time").removeClass('hide');
      $(".send").addClass('hide');
      var countText = 59;
      $("#miao").html(countText);
      var timmer = setInterval(function () {
        countText -= 1;
        $("#miao").html(countText);
        if (countText == 0) {
          $(".time").addClass('hide');
          $(".send").removeClass('hide');
          clearInterval(timmer);
        }
      }, 1000);
    }
  })

  $(".sendLawyer").click(function () {
    var phone = $.trim($('#phonenumLawyer').val());
    if (checkPhone(phone)) {
      sign();
      $(".timeLawyer").removeClass('hide');
      $(".sendLawyer").addClass('hide');
      var countText = 59;
      $("#miaoLawyer").html(countText);
      var timmer = setInterval(function () {
        countText -= 1;
        $("#miaoLawyer").html(countText);
        if (countText == 0) {
          $(".timeLawyer").addClass('hide');
          $(".sendLawyer").removeClass('hide');
          clearInterval(timmer);
        }
      }, 1000);
    }
  })

  function checkPhone(phone) {
    var status = true;
    if (phone == '') {
      $('.num2-err').removeClass('hide').find("em").text('请输入手机号');
      return false;
    }
    var param = /^1[3456789]\d{9}$/;
    if (!param.test(phone)) {
      // globalTip({'msg':'手机号不合法，请重新输入','setTime':3});
      $('.num2-err').removeClass('hide');
      $('.num2-err').text('手机号不合法，请重新输入');
      return false;
    }
    $.ajax({
      url: '/api/main/phoneCode.jhtml',
      type: 'post',
      dataType: 'json',
      async: false,
      data: {
        phone: phone
      },
      success: function (data) {
        if (data.state == 100) {
          $('.num2-err').addClass('hide');
          status = true;
        } else {
          sweetAlert({
            title: data.message,
            type: "warning",
            timer: 1500
          });
          $('.num2-err').removeClass('hide').text(data.message);
          status = false;
        }
      },
      error: function () {
        status = false;
      }
    });
    return status;
  }

  //输入框输入时模拟placeholder效果
  var oInput = $(".form-data input");
  oInput.focus(function () {
    $(this).siblings("label").hide();
  });
  oInput.blur(function () {
    if ($(this).val() == "") {
      $(this).siblings("label").show();
    }
  });

  $('.tab-btn > div').on('click', function () {
    $('.tab-btn > div').removeClass()
    $('.tab-content > img').removeClass()
    $($('.tab-content > img')[$(this).addClass('active').data('value')]).addClass('show')
  })

  sign()

  $('#signCompanyBtn').on('click', function () {
    var companyName = $('#companyName').val();
    var companyPassword = $('#companyPassword').val();
    var companyPassword2 = $('#companyPassword2').val();
    var companyIdCard = $('#companyIdCard').val();
    var companyEmail = $('#companyEmail').val();
    var companyAddress = $('#companyAddress').val();
    var companyLegalName = $('#companyLegalName').val();
    var companyPhone = $('#companyPhone').val();
    var companyLegalId = $('#companyLegalId').val();
    var laborContractUrl = $('#laborContractUrl').attr('src')
    var powerAttorneyUrl = $('#powerAttorneyUrl').attr('src')
    console.log('11')
    if(companyPassword != companyPassword2){
      return sweetAlert({
        title: '两次输入的密码不一致！',
        type: 'error',
        confirmButtonText: "好的"
      })
    }
    const regx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if(!regx.test(companyPassword)){
      return sweetAlert({
        title: '密码需为8-16位的数字和英文字母组合！',
        type: "warning",
        timer: 3000
      });
    }
    if (laborContractUrl == './images/pic.png' || powerAttorneyUrl == './images/pic.png') {
      sweetAlert({
        title: '前上传相应图片',
        type: 'error',
        confirmButtonText: "好的"
      })
      return
    }
    $.ajax({
      url: '/api/main/registerAdmin.jhtml',
      type: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      data: JSON.stringify({
        name: companyName,
        password: MD5(companyPassword),
        idCard: companyIdCard,
        email: companyEmail,
        trueAddress: companyAddress,
        legalManName: companyLegalName,
        legalManPhone: companyPhone,
        legalManId: companyLegalId,
        laborContractUrl: laborContractUrl,
        powerAttorneyUrl: powerAttorneyUrl,
        litigantType: 1
      }),
      success: function (data) {
        if (data.state == 100) {
          $('#companyName').val('');
          $('#companyPassword').val('');
          $('#companyPassword2').val('');
          $('#companyIdCard').val('');
          $('#companyEmail').val('');
          $('#companyAddress').val('');
          $('#companyLegalName').val('');
          $('#companyPhone').val('');
          $('#companyLegalId').val('');
          $('#laborContractUrl')[0].src = './images/pic.png';
          $('#powerAttorneyUrl')[0].src = './images/pic.png';
          $("#legal").addClass("hide");
          $('label').show();
          $('.swal2-checkbox').hide();
          swal({
            title: data.message,
            type: "success",
            confirmButtonText: "好的"
          });
          $(".back-h").addClass('hide');
          // $('#legal').addClass('hide');
        } else {
          swal({
            title: data.message,
            type: "error",
            confirmButtonText: "好的"
          });
          // $(".back-h").addClass('hide');
          // $('.form-data').addClass("hide");
        }
      },
      error: function () {
        status = false;
      }
    });
  })
  $("#nextBtnLawyerBtn").unbind("click").click(function () {
      // $('#phonenumLawyer').val('')
      // $('#phoneCodeLawyer').val('')
      // $(".signform1Lawyer").addClass("hide");
      // $(".signform2Lawyer").removeClass("hide");
      // $("#signLawyerBtn").removeClass("hide");
      // $("#nextBtnLawyerBtn").addClass("hide");


      var phone = $.trim($('#phonenumLawyer').val());
      var phoneCode = $.trim($('#phoneCodeLawyer').val());
      if (phone == '') {
        $("#phoneWarnLawyer").removeClass('hide').find("em").text('手机号不能为空');
        return false;
      }
      $.ajax({
        url: '/api/main/registerPhone.jhtml',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: JSON.stringify({
          phone: phone,
          mcode: phoneCode
        }),
        success: function (data) {
          if (data.state == 100) {
            $('#phonenumLawyer').val('')
            $('#phoneCodeLawyer').val('')
            $(".signform1Lawyer").addClass("hide");
            $(".signform2Lawyer").removeClass("hide");
            $("#signLawyerBtn").removeClass("hide");
            $("#nextBtnLawyerBtn").addClass("hide");
          } else {
            sweetAlert({
              title: data.message,
              type: "error",
              confirmButtonText: "好的"
            });
          }
        },
        error: function () {
          status = false;
        }
      });
    })
    $('#signLawyerBtn').on('click',function(){
        var lawyerName = $.trim($('#lawyerName').val());
        var lawyerPassword = $.trim($('#lawyerPassword').val());
        var lawyerPassword2 = $.trim($('#lawyerPassword2').val());
        var lawyerIdCard = $.trim($('#lawyerIdCard').val());
        var lawyerEmail = $.trim($('#lawyerEmail').val());
        var lawerNum = $.trim($('#lawerNum').val());
        var lawFirm = $.trim($('#lawFirm').val());
        var lawerCardUrl = $('#idCardUrlLawyer').attr('src')
        if (lawyerName == '') {
            swal({
                title: '姓名不能为空',
                type: "warning",
                confirmButtonText: "好的"
            });
            return false;
        }
        if (lawyerPassword == '') {
            swal({
                title: '密码不能为空',
                type: "warning",
                confirmButtonText: "好的"
            });
            return false;
        }
        if (lawyerPassword != lawyerPassword2) {
            swal({
                title: '两次密码不一致',
                type: "warning",
                confirmButtonText: "好的"
            });
            return false;
        }
        const regx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        if(!regx.test(lawyerPassword)){
          return sweetAlert({
            title: '密码需为8-16位的数字和英文字母组合！',
            type: "warning",
            timer: 3000
          });
        }
        if (lawyerIdCard == '') {
            swal({
                title: '身份证号码不能为空',
                type: "warning",
                confirmButtonText: "好的"
            });
            return false;
        }
        var lawyerData={

        }
        if (LawyerState==1) {
            if (lawerNum == '') {
                swal({
                    title: '律师证件号码不能为空',
                    type: "warning",
                    confirmButtonText: "好的"
                });
                return false;
            }
            if (lawFirm == '') {
                swal({
                    title: '律师事务所不能为空',
                    type: "warning",
                    confirmButtonText: "好的"
                });
                return false;
            }
            if (lawerCardUrl == './images/pic.png') {
                swal({
                    title: '请上传正确的律师证件照',
                    type: "warning",
                    confirmButtonText: "好的"
                });
                return false;
            }
            lawyerData={
                agentType:Number(LawyerState),
                name: lawyerName,
                idCard: lawyerIdCard,
                password: MD5(lawyerPassword),
                email: lawyerEmail,
                lawerNum: lawerNum,
                lawFirm: lawFirm,
                lawerCardUrl:lawerCardUrl
            }
        }else{
            lawFirm = ''
            lawerNum = ''
            lawerCardUrl=''
            lawyerData={
                agentType:Number(LawyerState),
                name: lawyerName,
                idCard: lawyerIdCard,
                password: MD5(lawyerPassword),
                email: lawyerEmail,
            }
        }
        
        $.ajax({
            url: '/api/main/registerLawyer.jhtml',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data: JSON.stringify(lawyerData),
            success: function (data) {
            if (data.state == 100) {
                console.log(data)
                $('#lawyerName').val('')
                $('#lawyerIdCard').val('')
                $('#lawyerPassword').val('')
                $('#lawyerPassword2').val('')
                $('#lawyerEmail').val('')
                $('#lawerNum').val('')
                $('#lawFirm').val('')
                $('#lawerCardUrl').val('')
                $('#idCardUrlLawyer').attr('src',"./images/pic.png")
                swal({
                    title: data.message,
                    type: "success",
                    confirmButtonText: "好的"
                });
                $(".back-h").addClass('hide');
                $('label').show();
                $('.swal2-checkbox').hide();
            } else {
                console.log(data)
                swal({
                    title: data.message,
                    type: "error",
                    confirmButtonText: "好的"
                });
                // $(".back-h").addClass('hide');
            }
            },
            error: function () {
                status = false;
            }
      });

    })
  //注册
  function sign() {
    $("#nextBtn").unbind("click").click(function () {
      var phone = $.trim($('#phonenum').val());
      var phoneCode = $.trim($('#phoneCode').val());
      if (phone == '') {
        $("#phoneWarn").removeClass('hide').find("em").text('手机号不能为空');
        return false;
      }
      $.ajax({
        url: '/api/main/registerPhone.jhtml',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: JSON.stringify({
          phone: phone,
          mcode: phoneCode
        }),
        success: function (data) {
          if (data.state == 100) {
            $('#phonenum').val('')
            $('#phoneCode').val('')
            $(".signform1").addClass("hide");
            $(".signform2").removeClass("hide");
            $("#signBtn").removeClass("hide");
            $("#nextBtn").addClass("hide");
          } else {
            sweetAlert({
              title: data.message,
              type: "error",
              confirmButtonText: "好的"
            });
          }
        },
        error: function () {
          status = false;
        }
      });
    })
    $("#signBtn").unbind("click").click(function () {
      var phone = $.trim($('#phonenum').val());
      var idCard = $.trim($('#idCard').val());
      var name = $('#name').val()
      var idCardUrl = $('#idCardUrl').attr('src')
      var holdIdCardUrl = $('#holdIdCardUrl').attr('src')
      if (idCardUrl == './images/pic.png' || holdIdCardUrl == './images/pic.png') {
        sweetAlert({
          title: '前上传相应图片',
          type: 'error',
          confirmButtonText: "好的"
        })
        return
      }
      if (idCard == '') {
        $("#idCardWarn").removeClass('hide').find("em").text('身份证号码不能为空');
        return false;
      }
      var password = $.trim($('#password').val());
      if (password == '') {
        $('#passWarn').removeClass('hide').find("em").text('密码不能为空');
        return false;
      }
      var password2 = $.trim($('#password2').val());
      if (password != password2) {
        $('#pass2Warn').removeClass('hide').find("em").text('密码不一致');
        return false;
      }
      const regx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if(!regx.test(password)){
        return sweetAlert({
          title: '密码需为8-16位的数字和英文字母组合！',
          type: "warning",
          timer: 3000
        });
      }
      var email = $.trim($('#email').val());
      var trueAddress = $.trim($('#trueAddress').val());
      $.ajax({
        url: '/api/main/registerAdmin.jhtml',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        data: JSON.stringify({
          idCard: idCard,
          phone: phone,
          name: name,
          password: password,
          email: email,
          trueAddress: trueAddress,
          idCardUrl: idCardUrl,
          holdIdCardUrl: holdIdCardUrl,
          litigantType: 0
        }),
        success: function (data) {
          if (data.state == 100) {
            console.log(data)
            $('#phonenum').val('')
            $('#idCard').val('')
            $('#name').val('')
            $('#password').val('')
            $('#password2').val('')
            $('#email').val('')
            $('#trueAddress').val('')
            $('#idCardUrl')[0].src = './images/pic.png';
            $('#holdIdCardUrl')[0].src = './images/pic.png';
            swal({
              title: data.message,
              type: "success",
              confirmButtonText: "好的"
            });
            $(".back-h").addClass('hide');
          } else {
            console.log(data)
            swal({
              title: data.message,
              type: "error",
              confirmButtonText: "好的"
            });
            // $(".back-h").addClass('hide');
          }
        },
        error: function () {
          status = false;
        }
      });
    })
  }

  // 登录点击事件
  function sendBtn() {
    if (tab == 'account_number') {
      $(".log-btn").click(function () {
        var inp = $.trim($('#num').val());
        var pass = $.trim($('#pass').val());
        var veri1 = $.trim($('#veri1').val());
        if (checkAccount(inp) && checkPass(pass)) {
          var ldata = {
            'idCard': inp,
            'password': MD5(pass),
            'code': veri1
          };
          console.log(989)
          $.ajax({
            url: '/api/main/login.jhtml',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data:{
              username: inp,
              password: MD5(pass),
              code: veri1,
              loginType:'litigant'
            },
            success: function (data) {
              let ele = data.data;
              if (data.state == 100) {
                $('.form-data').addClass("hide");
                $(".back-h").addClass('hide');
                if(ele.roles.length == 1){
                  selRole(ele.roles[0].id,ele.roles[0].type);
                }else{
                  var arr = ele.roles;
                  getRole(arr);
                }
                
              } else if (data.state == 102) {
                swal({
                  title: '请用微信扫码进行实名认证',
                  imageUrl: ele.imagePath,
                  imageWidth: 300,
                  imageHeight: 300,
                  confirmButtonText: "好的"
                });
              } else if (data.state == 103){
                swal({
                  type: "info",
                  html:data.message,
                  confirmButtonText: "点击进行微信扫码实名认证"
                }).then(function(result) {
                    console.log(result)
                    if (result) {
                        swal({
                        title: '请用微信扫码进行实名认证',
                        imageUrl: ele.imagePath,
                        imageWidth: 300,
                        imageHeight: 300,
                        confirmButtonText: "好的"
                        });
                    }
                });
              }else {
                swal({
                //   title: data.message,
                  type: "warning",
                  html:data.message,
                  confirmButtonText: "好的"
                })
              }
              changeCode()
            },
            error: function () {

            }
          });
        } else {
          return false;
        }
      });
    } else {
      $(".log-btn").click(function () {
        var inp1 = $.trim($('#num1').val());
        var pass1 = $.trim($('#pass1').val());
        var veri2 = $.trim($('#veri2').val());
        if (checkAccount(inp1) && checkPass(pass1)) {
          $.ajax({
            url: '/api/main/login.jhtml',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data:{
              username: inp1,
              password: MD5(pass1),
              code: veri2,
              loginType:'court'
            },
            //  JSON.stringify({
            //   username: inp1,
            //   password: MD5(pass1),
            //   code: veri2,
            //   loginType:'court'
            // }),
            success: function (data) {
              if (data.state == 100) {
                swal({
                  title: data.message,
                  type: "success",
                  confirmButtonText: "好的"
                });
                $('.form-data').addClass("hide");
                $(".back-h").addClass('hide');
                let ele = data.data;
                if(ele.roles){
                  if(ele.roles.length == 1){
                    selRole(ele.roles[0].id,ele.roles[0].type);
                  }else{
                    var arr = ele.roles;
                    getRole(arr);
                  }
                }
              } else {
                swal({
                  title: data.message,
                  type: "error",
                  confirmButtonText: "好的"
                });
              }
              changeCode()
            },
            error: function () {

            }
          });
        } else {
          $(".log-btn").off('click').addClass("off");
          // $('.tel-warn').removeClass('hide').text('登录失败');
          return false;
        }
      });
    }
  }
  $(document).on("click",".sButton",function(){
      var fileId=$(this).attr("fileId");
      var roleType=$(this).attr("roleType");
      cliSur(fileId,roleType);
  })
  function getHtmlBtton(ary){
    let str = '';
    
    for(let i=0;i<ary.length;i++){
      str = str + "<Button fileId='"+ ary[i].id+"' roleType='"+ary[i].type+"' class='sButton' type='primary' >"+ ary[i].name + "</Button>"
    }
    return str;
  }
  function cliSur(id,type){
    var buttons = $(".sButton");
    for(let i=0;i<buttons.length;i++){
      if($(buttons[i]).attr("fileId") == id){
        $(buttons[i]).addClass("sel");
      }else{
        $(buttons[i]).removeClass("sel");
      }
    }
    $("#dex").remove()
    selRole(id,type);
  }
  function selRole(id,type){
    $.ajax({
      url: '/api/main/optionRole.jhtml',
      type: 'get',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      data: {
        roleType:type
      },
      success: function (data) {
        if (data.state == 100) {
          swal({
            title: data.message,
            type: "success",
            confirmButtonText: "好的"
          });
          localStorage.setItem('roleIdToken',id);
          getUserInfo();
        } else {
          swal({
            title: data.message,
            type: "error",
            confirmButtonText: "好的"
          });
        }
      },
      error: function () {

      }
    });
  }

  function getRole(ary) {
    // var ary = ['自然人','法人/非法人','律师','法官'];
    console.log(ary)
    var role_div = document.createElement("div");
    role_div.id="dex";
    role_div.innerHTML = getHtmlBtton(ary);
    document.body.appendChild(role_div);
    swal({
      title: '请选择角色身份',
      html:role_div,
      // confirmButtonText: "关闭",
      // allowOutsideClick:false,
      showCancelButton: false,
      showConfirmButton:false,
    })
  }

  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      $("#back-to-top").fadeIn(1500);
    } else {
      $("#back-to-top").fadeOut(1500);
    }
  });