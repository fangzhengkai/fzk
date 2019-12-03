window.onload=function(){
    // 切换icon
    document.getElementById('usernum').onfocus=function(){
        document.getElementById('icon1').style.background="url('img/icon_username_input.png')";
    }
    document.getElementsByClassName('autocode')[0].onfocus=function(){
        document.getElementById('icon2').style.background="url('img/icon_password_input.png')";
    }

    // 验证码功能
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    drawPic(); //初始化
    document.getElementById("codebox").onclick = function(e) {
        /*e.preventDefault();*/
        /*阻止a标签的默认的点击事件*/
        drawPic();
    }

    /**绘制验证码图片**/
    function drawPic() {
        var canvas = document.getElementById("canvas");
        var widthh = canvas.width;
        var height = canvas.height; //获取高度
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top'; //文本基线是 em 方框的底端

        /**绘制背景色**/
        ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
        ctx.fillRect(0, 0, widthh, height); //绘制一个填充的矩形
        /**绘制文字**/
        var str = 'ABCDEFGHIJKLMNOPQRSTWXYqwertuyuiopasdfghjklzxcvbnm123456789';
        var ttt;
        for(var i = 0; i < 4; i++) {
            var txt = str[randomNum(0, str.length)];
            ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
            ctx.font = randomNum(60,80) + 'px YaHei'; //随机生成字体大小
            var x = 40 + i * 75;
            var y = randomNum(10, 45);
            var deg = randomNum(20, 25);
            //修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            //恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
            ttt+=txt;
        }

        var verify = ttt.substr(9,13);
        document.getElementById('vercode').onblur= function(){
            if(this.value.toLowerCase() !=verify.toLowerCase()){
                alert('输入错误')
            }
        }
        /**绘制干扰线**/
        for(var i = 0; i < 3; i++) {
            ctx.strokeStyle = randomColor(40, 180); //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式。
            ctx.beginPath();
            ctx.moveTo(randomNum(0, widthh), randomNum(0, height));
            ctx.lineTo(randomNum(0, widthh), randomNum(0, height));
            ctx.stroke();
        }
        /**绘制干扰点**/
        for(var i = 0; i < 2; i++) {
            ctx.fillStyle = randomColor(0, 255);
            ctx.beginPath(); //arc() 方法创建弧/曲线（用于创建圆或部分圆）。
            ctx.arc(randomNum(0, widthh), randomNum(0, height), 1, 0, 2 * Math.PI);
            ctx.fill();
            /*x 圆的中心的 x 坐标。
            y 圆的中心的 y 坐标。
                r    圆的半径。
                            sAngle    起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
                    eAngle 结束角，以弧度计。
                    counterclockwise 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
                    */
        }
        }
// 换一张添加点击事件

        var ina = document.getElementById('ina')
        ina.addEventListener('click',function(){
            drawPic();
        })
}