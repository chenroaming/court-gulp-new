
//轮播图模块
$(document).ready(function () {
    let mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
          disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable :true
        }
    })

    let wordNews = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pagesize:3,NewsType:2});
    let picNews = ajaxGet('/api/main/homeNews/getHomeNews.jhtml',{pagesize:3,NewsType:1});
    let mySwiper2 = new Swiper('.swiper-container2', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        disableOnInteraction: false,
      },
      // 如果需要分页器
      pagination: {
          el: '.swiper-pagination2',
          clickable :true
      },
      //前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      observeParents: false
    });
    mySwiper2.el.onmouseover = function(){
      mySwiper2.autoplay.stop();
    }
    mySwiper2.el.onmouseleave = function(){
      mySwiper2.autoplay.start();
    }
    console.log(picNews.content);
    let bigDiv = '';
    for(let item of picNews.content){
      bigDiv = ('<div class="swiper-slide"><img src="'+item.home_img_url+'" alt="banner" width="100%" height="100%"></img><div class="news-title"><a href="news.html?id='+item.unique_id+'" target="_Blank">'+item.news_title+'</a></div></div>');
      mySwiper2.appendSlide(bigDiv);
    }
    mySwiper2.updateSlides();
    mySwiper2.pagination.render();
    mySwiper2.pagination.update();
    let holdCourts = ajaxGet('/api/main/homeNews/getHoldCourts.jhtml ');
    for(const item of holdCourts.data){
      let div = ('<div class="notice-item"><img src="../images/way-4.png" alt=""><span>'+item.content+'</span><br><span>特此公告。</span><p>'+item.openTime+'</p></div>');
      $('#box').append(div);
      $('#box2').append(div);
    }
    let top = 0;
    let top2 = 800;
    setInterval(function(){
      top --;
      top2 --;
      $('#box').css('top',top);
      $('#box2').css('top',top2);
      if(top == -$('.info-content-box').height()*1.5){
        top2 = $('.info-content-box').height();
      }
      if(top2 == -$('.info-content-box').height()*1.5){
        top = $('.info-content-box').height();
      }
    },10);
})

//忘记密码步骤条
let steps1 = steps({
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

// 打开登录弹框
function openLogin() {
    $("#login-d").removeClass("hide");
    $(".back-h").removeClass('hide');
    $(".code-ch").attr("src", "/api/main/code.jhtml?tm=" + Math.random())
  }
  //打开注册弹框
  function openSign() {
    $(".signform1").removeClass("hide");
    $(".signform2").addClass("hide");
    $("#signBtn").addClass("hide");
    $("#nextBtn").removeClass("hide");
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
                        '1': '律师 ',
                        '2': '法律工作者',
                        '3': '单位工作人员',
                        '4': '近亲属',
                        '5': '公民',
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
                        $(".back-h").removeClass('hide');
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
      let data = {phone: phoneNum,code: authCode,fir_password: firPwd,sec_password: secPwd};
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
  let tab = 'account_number';
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


  $('#signCompanyBtn').on('click', function () {
    var companyName = $('#companyName').val();
    var companyPassword = $('#companyPassword').val();
    var companyIdCard = $('#companyIdCard').val();
    var companyEmail = $('#companyEmail').val();
    var companyAddress = $('#companyAddress').val();
    var companyLegalName = $('#companyLegalName').val();
    var companyPhone = $('#companyPhone').val();
    var companyLegalId = $('#companyLegalId').val();
    var laborContractUrl = $('#laborContractUrl').attr('src')
    var powerAttorneyUrl = $('#powerAttorneyUrl').attr('src')
    console.log('11')
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
        password: companyPassword,
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
          $('#companyIdCard').val('');
          $('#companyEmail').val('');
          $('#companyAddress').val('');
          $('#companyLegalName').val('');
          v$('#companyPhone').val('');
          $('#companyLegalId').val('');
          $('#laborContractUrl')[0].src = './images/pic.png';
          $('#powerAttorneyUrl')[0].src = './images/pic.png';
          $("#legal").addClass("hide");
          swal({
            title: data.message,
            type: "success",
            confirmButtonText: "好的"
          });
          $(".back-h").addClass('hide');
        } else {
          swal({
            title: data.message,
            type: "error",
            confirmButtonText: "好的"
          });
          $(".back-h").addClass('hide');
          $('.form-data').addClass("hide");
        }
      },
      error: function () {
        status = false;
      }
    });
  })


  $("#nextBtnLawyerBtn").unbind("click").click(function () {
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
  //   $('#phonenumLawyer').val('')
  //         $('#phoneCodeLawyer').val('')
  //         $(".signform1Lawyer").addClass("hide");
  //         $(".signform2Lawyer").removeClass("hide");
  //         $("#signLawyerBtn").removeClass("hide");
  //         $("#nextBtnLawyerBtn").addClass("hide");
  })

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

  function checkPhone(phone) {
    var status = true;
    if (phone == '') {
      $('.num2-err').removeClass('hide').find("em").text('请输入手机号');
      return false;
    }
    var param = /^1[34578]\d{9}$/;
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