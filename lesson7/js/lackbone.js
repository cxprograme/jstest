!function(){
    function $(arg){
      var typeA=(typeof arg).toLowerCase();
      if(typeA=='string'||typeA=='object'){
        return new Init(arg);
      }
    }

    function Init(arg){
        this.init(arg);
        // this.jsObj=this.init(arg);
        // this.length=this.jsObj.length;
    }
    Init.prototype={
      init:function(arg){
        var typeO=(typeof arg).toLowerCase();
        var arr=[];
        if(typeO=='string'){
          var firstIndex=arg[0];

          switch (firstIndex) {
            case '#':var obj=document.getElementById(arg.replace(/#/,''));
                    arr.push(obj);
            break;
            case '.':var classN=arg.replace(/\./,'');
                    if(document.getElementsByClassName){
                      var obj=document.getElementsByClassName(classN);
                      for(var i=0;i<obj.length;i++){
                        arr.push(obj[i]);
                      }
                    }else{

                      var all=document.getElementsByTagName("*");
                      var len=all.length;
                      for(var i=0;i<len;i++){
                        var className=all[i].className;
                        var arrClass=className.split(' ');
                        for(var j=0;j<arrClass.length;j++){
                          if(arrClass[i]==classN){
                            arr.push(all[i]);
                          }
                        }
                      }
                    }

              break;
            default:
                var tag=document.getElementsByTagName(arg);
                var len=tag.length;
                for(var i=0;i<len;i++){
                  arr.push(tag[i]);
                }
                break;

          }
        }
        //将js对象装换为jquery对象
        else if(typeO=='object'){
          // console.log(arg);
          // console.log(arg.length);
          //当个对象  var box=document.getElementById("box");
          if(arg.length==undefined){
            arr.push(arg);
          }
          //对象数组  var demo=document.getElementsByClassName("demo");
          else{
            for(var i=0;i<arg.length;i++){
              arr.push(arg[i]);
            }
          }
        }

        var len=arr.length;
        for (var i = 0; i < len; i++) {
              this[i]=arr[i]
        }
        this.length=len;
        // return arr;
      },

      // size
      size:function(){
        // return this.jsObj.length;
        return this.length;
      },

      //Get
      get:function(i){
        // return this.jsObj[i];
        return this[i];
      },

      //each 循环
      each:function(fn){
        for(var i=0;i<this.length;i++){
          fn.call(this[i],i);           //call指向当前的js对象，i表示对象的下标
        }
      },
      css:function(){
        var arg=arguments;

        //对于css("color",'red')格式
        if(arg.length==2){

          this.each(function(){
            this.style[arg[0]]=arg[1];
          })

          //
          // for(var i=0;i<this.length;i++){
          //   // this.jsObj[i].style[arg[0]]=arg[1];
          //   this[i].style[arg[0]]=arg[1]
          // }
        }else if(arg.length==1){
          var typeArg=(typeof arg[0]).toLowerCase();
          //获取样式，获取第一个元素的样式
          if(typeArg=='string'){
            var styles=this[0].currentStyle?this[0].currentStyle[arg[0]]:getComputedStyle(this[0])[arg[0]];
            return styles;
          }
          //json格式修改样式
          else if(typeArg=='object'){
            var json=arg[0];
            for(var key in json){
              // for (var i = 0; i < this.length; i++) {
              //     // this.jsObj[i].style[key]=json[key];
              //     this[i].style[key]=json[key];
              // }

              this.each(function(){
                this.style[key]=json[key];
              })
            }

            return this;
          }
        }
      },
      eq:function(xy){
        var xy=xy||0;
        // return $(this.jsObj[xy]);
        return $(this[xy]);
      },

      //类似于innerHTML  如果没有参数则是获取，如果有参数则是给每一个元素添加
      html:function(arg){

          if(arg==undefined){
            return this[0].innerHTML;
          }else{
            this.each(function(){
                this.innerHTML=arg;
            });
            return this;
          }

      },

      //相当于innerText  如果没有参数，则是所有的元素内容拼接，如果有，则是添加内容
      text:function(arg){
          console.log(this);
        if(arg==undefined){
          var str="";
          this.each(function(){
            str+=$(this).html();
          })
          return str;
        }else{
          this.each(function(){
            this.innerText=arg;
          })
          console.log(this);
          return this;
        }
      }


    }
    window.$=$;
}();
