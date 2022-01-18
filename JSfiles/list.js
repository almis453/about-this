

//どうしてかわからんけどfirebaseが宣言されていないとなるが、参考資料は全てこの部分の宣言が見当たらないので良くわからんです
// Initialize Firebase
var someName, randomId;
var config = {
    apiKey: "AIzaSyA9fx1y13A1O2dBo4xNEuxug4ixwOkthRk",
    authDomain: "firetest-818d1.firebaseapp.com",
    databaseURL: "https://firetest-818d1-default-rtdb.firebaseio.com",
    projectId: "firetest-818d1",
    storageBucket: "firetest-818d1.appspot.com",
    messagingSenderId: "330170996226",
};
firebase.initializeApp(config);

someUser = document.querySelector("#someUser");
var UserRef = firebase.database().ref().child('users/3/username');
UserRef.on('value',
    function (snap) {
        someUser.innerText = snap.val();
    }
);

function changeData(userId) {
    var someName = document.querySelector("input").value
    firebase.database().ref('users/' + userId).set({
        username: someName,
    });
};
// function rand(){
// //randomId =  Math.random()*100;
// }


/*モジュール外でimport は使えないと文句言われるので不適（らしい）
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
    apiKey: "AIzaSyA9fx1y13A1O2dBo4xNEuxug4ixwOkthRk",
    authDomain: "firetest-818d1.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://firetest-818d1-default-rtdb.firebaseio.com",
    storageBucket: "firetest-818d1.appspot.com"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

*/

//データを仮入れするためのの配列を宣言
var date = ["2021年12月14日", "2021年12月15日", "2021年12月22日"];
var timest = ["15時00分", "10時00分", "13時15分"];
var timeed = ["16時45分", "13時30分", "15時30分"];
var room = [2, 2, 4];

//確認画面でデータベースが使えないので表示用に仮置きしている部分のメソッド
function loop() {
    for (var i = 0; i < date.length; i++) {
        document.write(date[i] + "<br>");
        document.write(timest[i] + "～" + timeed[i] + "<br>");
        document.write("room" + room[i] + "<br>");
        document.write("<div onclick=\"location.href='./home.html'\" style='text-align: right; margin-right:  5px ; margin-bottom: 5px ;'>変更</div>");
        document.write("<div onclick=\"location.href='./home.html'\" style='text-align: right; margin-right:  5px ; margin-bottom: 5px ;'>取消</div>");
        document.write("<hr>")
    }


    var links = document.getElementById("sells");
    links.innerHTML = "クリックしたよ。";
}


//登録画面で用いられるメソッド群
const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () {
    showProcess(today, calendar);
};
// 前の月表示
function prev() {
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next() {
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#selectedtitle').innerHTML = "予約する日付を選択してください。";
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate = new Date(year, month + 1, 0).getDate();
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    switch (Math.floor((endDate - today.getDate()) / week.length)) {
        case 0:
            var row = Math.ceil((startDayOfWeek + endDate) / week.length) + 2;
            break;
        case 1:
            var row = Math.ceil((startDayOfWeek + endDate) / week.length) + 1;
            break;
        default:
            var row = Math.ceil((startDayOfWeek + endDate) / week.length);
    }
    var rangecnt = 14;
    //来月、来年の日付を設定するための変数を宣言
    nextmonth = 0;
    nextyear = year;

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'> " + (lastMonthEndDate - startDayOfWeek + j + 1) + " </td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                if (year == today.getFullYear()
                    && month == (today.getMonth())
                    && rangecnt > 0) {
                    if (month + 2 > 12) {
                        nextyear = year + 1;
                        nextmonth = 1;
                    } else {
                        nextmonth = month + 2;
                    }
                    calendar += "<td class='future' onclick='selecttime(" + nextyear + "," + nextmonth + "," + (count - endDate) + ")'>" + (count - endDate) + "</td>";
                    rangecnt--;
                } else {
                    calendar += "<td class='disabled'> " + (count - endDate) + " </td>";
                }
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if (year == today.getFullYear()
                    && month == (today.getMonth())
                    && count == today.getDate()) {
                    calendar += "<td class='today' onclick='selecttime(" + year + "," + (month + 1) + "," + count + ")'>" + count + "</td>";
                    rangecnt--;
                } else if (year == today.getFullYear()
                    && month == (today.getMonth())
                    && count > today.getDate()
                    && rangecnt > 0) {
                    calendar += "<td class='links' onclick='selecttime(" + year + "," + (month + 1) + "," + count + ")'>" + count + "</td>";
                    rangecnt--;
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar + "</table>";
}


//ここまでカレンダー用


//ここから時間選択用のjs
//テキストを保存して入れておくための変数を宣言
var pointer = "";

//部屋を予約する際に使う変数の宣言
var sth = "";
var stm = "";
var edh = "";
var edm = "";
var usetime = 0;


//選択した年月日を保存しておくための変数を宣言
var sday = 0;
var smonth = 0;
var syear = 0;

function selecttime(year, month, day) {

    document.getElementById('timeselector').style.display = 'block';

    syear = year;
    smonth = month;
    sday = day;

    document.querySelector('#selectedtitle').innerHTML = "予約する時刻を選択してください。";
    document.querySelector('#header').innerHTML = syear + "年" + smonth + "月" + sday + "日";

    document.querySelector('#calendar').innerHTML = pointer // + "" + textadvance();

}

/*
function textadvance() {

    texts = "<div class='reload' onclick='window.location.reload()'>日付を変更する</div>";
    texts += "<br /><br />"

    // 
    // ラジオボタンを実装して、「開始時間と終了時間を入力することで、使用できる部屋を絞る」形式と
    // 「開始時間と部屋の使用時間を入力することで、使用できる部屋を絞る」形式の2つから選択できるようにする。
    // 図形を使ったものを作ろうと考えたが、タッチ機能がないと、あまり使いにくいのと、ドラッグをして直観的な操作はちょっとわかりにくいかもしれないので却下
    // 
    texts += "<label><input type='radio' name='select' value='sted' onchange='sltradio(this.value)'>終了時間を入力する。</label><br />";
    texts += "<label><input type='radio' name='select' value='time' onchange='sltradio(this.value)'>使用時間を入力する。</label>";

    let elements = document.getElementsByName('select');
    let len = elements.length;
    let checkValue = '';

    for (let i = 0; i < len; i++) {
        if (elements.item(i).checked) {
            //ラジオボタンにチェックが入っているデータを変化させる
            checkValue = elements.item(i).value;
            texts += checkValue + "<br />";
        }
    }



// 入力するところは基本的にテキストボックスを用意して入力するか、ドロップダウン型の選択肢で15分単位で選択できるようにすることとする。
// せっかくのPC等の大き目の画面でも操作できるようにするので、細かいコメントや注意書きを画面にも盛り込んでもよいかもしれない。
// ※ここでは9時から19時までを予約することができます。
// みたいな感じに。



// ドロップダウンが選択を終えた場合、どこかに○○時○○分～○○時○○分の予約を行う
// みたいなことを表示すること
// また、時間と分が入力が全て終わっている場合に限り、予約可能な部屋番号を表示する機能を実装しよう
// 予約するボタンもそこに到達した場合にのみクリック可能にする
// 選択できる部屋がない場合には赤文字で、「申し訳ありませんが、ご要望を満たすことのできる部屋がありません。」
// と表示する


return texts;
}
*/

//カレンダーの日付選択後に表示される部分を構成するメソッド
function sltradio(val) {
    var coment = "";

    //ラジオボタンを押した際にデータを初期化する処理
    sth = "";
    stm = "";
    edh = "";
    edm = "";
    usetime = 0;

    switch (val) {
        //開始時間と終了時間を入力するタイプ
        case 'sted':
            coment = "<br />開始予定時間";
            coment += "<select id='sth' onchange='chgsth(this.value)'>";
            coment += "<option value=''></option>";
            for (var i = 8; i <= 20; i++) {
                coment += "<option value=" + i + ">" + i + "</option>";
            }
            coment += "</select>";
            coment += "時"
            coment += "<select id='stm' onchange='chgstm(this.value)'>";
            coment += "<option value=''></option>";
            for (var i = 0; i < 4; i++) {
                coment += "<option value=" + 15 * i + ">" + 15 * i + "</option>";
            }
            coment += "</select>";
            coment += "分　から<br />";

            coment += "<br />終了予定時間";
            coment += "<select id='edh' onchange='chgedh(this.value)'>";
            coment += "<option value='' ></option>";
            for (var i = 8; i <= 21; i++) {
                coment += "<option value=" + i + ">" + i + "</option>";
            }
            coment += "</select>";
            coment += "時"
            coment += "<select class='edm' onchange='chgedm(this.value)'>";
            coment += "<option value=''></option>";
            for (var i = 0; i < 4; i++) {
                coment += "<option value=" + 15 * i + ">" + 15 * i + "</option>";
            }
            coment += "</select>";
            coment += "分　まで<br />";
            break;

        //開始時間と使用時間を入力するタイプ
        case 'time':
            coment = "<br />開始予定時間";
            coment += "<select id='sth' onchange='chgsth(this.value)'>";
            coment += "<option value=''></option>";
            for (var i = 8; i <= 20; i++) {
                coment += "<option value=" + i + ">" + i + "</option>";
            }
            coment += "</select>";
            coment += "時"
            coment += "<select id='stm' onchange='chgstm(this.value)'>";
            coment += "<option value=''></option>";
            for (var i = 0; i < 4; i++) {
                coment += "<option value=" + 15 * i + ">" + 15 * i + "</option>";
            }
            coment += "</select>";
            coment += "分　から<br />";

            coment += "<br />使用時間は<input type='number' id='number' onchange='chgnum(this.value)' step='15' min='0' max='300' value=>分"
            break;
    }
    coment += "<div class='gray'>※終了予定時間は21時を超えることはできません。<br />※部屋の連続使用は5時間までです。</div><br />";

    coment += "<button type='submit' id='button' onclick='function check(){document.getElementsByName(\"select\").disabled = true;";
    coment += "document.getElementsById(\"sth\").disabled = true; document.getElementsById(\"stm\").disabled = true;"
    coment += "document.getElementsById(\"edh\").disabled = true; document.getElementsById(\"edm\").disabled = true;}'>確認</button>";


    document.querySelector('#calendar2').innerHTML = coment;


    //ボタン押下時に入力されている数値が条件を満たしているかどうかを確認するメソッド
    function checker() {
        // var score = "";

        // texts = "<div class='reload' onclick='window.location.reload()'>日付を変更する</div>";
        // texts += "<br /><br />"

        // texts += "<label><input type='radio' name='select' value='sted' disabled checked>終了時間を入力する。</label><br />";
        // texts += "<label><input type='radio' name='select' value='time' disabled>使用時間を入力する。</label>";



        // document.querySelector('#calendar').innerHTML = texts;
        // document.querySelector('#calendar2').innerHTML = "";



        //開始時間と終了時間の入力が正常値の場合の処理
        if (sth != "" && stm != "" &&
            edh != "" && edm != "") {
            document.getElementsByName("select").disabled = true;
            document.getElementsById("sth").disabled = true;
            document.getElementsById("stm").disabled = true;
            document.getElementsById("edh").disabled = true;
            document.getElementsById("edm").disabled = true;


            //開始時間と使用時間の入力が正常値の場合の処理
        } else if (sth != "" && stm != "" &&
            usetime > 0) {
            location.href = './login.html'
            //入力が不正である場合の処理
        } else {
            window.location.reload()
        }

    }


}

//データを格納するために起動するメソッド群
function chgsth(val) {
    sth = val;
}

function chgstm(val) {
    stm = val;
}

function chgedh(val) {
    edh = val;
}

function chgedm(val) {
    edm = val;
}

function chgnum(val) {
    usetime = val;
}


//入力値が正しい場合の予約の確認の文面を表示するためのメソッド
function chrecord() {

}

//入力値が不正の場合のダイアログ表示を行うメソッド
function alertlog() {

}