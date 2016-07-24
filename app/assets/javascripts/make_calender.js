$(function() {
 function getDateTime(format, add_day,target_date){
    if (format == null) format = null;
    if (add_day == null) add_day = 0;

    var obj = {};
    var dt = new Date(target_date);

    dt.setTime(dt.getTime() + add_day * 60*1000*60*24);
    var week_jp = ['日','月','火','水','木','金','土'];
    obj.Y = dt.getFullYear();
    obj.m = ('0'+(dt.getMonth() + 1)).slice(-2);
    obj.n = dt.getMonth() + 1;
    obj.d = ('0'+dt.getDate()).slice(-2);
    obj.j = dt.getDate();
    obj.H = ('0'+dt.getHours()).slice(-2);
    obj.G = dt.getHours();
    obj.i = ('0'+dt.getMinutes()).slice(-2);
    obj.s = ('0'+dt.getSeconds()).slice(-2);
    obj.w = dt.getDay();
    obj.w_jp = week_jp[dt.getDay()];
    if(format != null){
        var str = format;
        str = str.replace('w_jp', obj.w_jp);
        str = str.replace('Y', obj.Y);
        str = str.replace('m', obj.m);
        str = str.replace('n', obj.n);
        str = str.replace('d', obj.d);
        str = str.replace('j', obj.j);
        str = str.replace('H', obj.H);
        str = str.replace('G', obj.G);
        str = str.replace('i', obj.i);
        str = str.replace('s', obj.s);
        str = str.replace('w', obj.w);
        return str;
    }else{
        return obj;
    }
};

function weekDateGet(target_date){
        // Dateオブジェクトを作成
        //var today = new Date() ;
        var pastDay = -target_date.getDay();
        //今週の経過日数取得
        var targetWeek = new Array( 7 );
        $.each(targetWeek,function(i,item){
            //targetWeek[i]=getDateTime('Y/m/d(w_jp)',pastDay+i);
            targetWeek[i]=getDateTime('Y-m-d',pastDay+i,target_date);
        });
        return targetWeek;
    }


    function createTable(task_lists,week,target_date){
        week.push("未スケジュール");
        //自分を先頭にソート
        $.each(task_lists, function(i, task_list){
            if ($('#user_id').val() == task_list.user_id){
                task_lists.unshift(task_list);
                task_lists.splice(i+1, 1);
            }
        });
        //カレンダー初期化
        $("#calendar").empty();

        //先週来週移動ボタン
        var lastWeek=getDateTime('Y-m-d',0,new Date(target_date.getFullYear(), target_date.getMonth(), target_date.getDate() - 7));
        var nextWeek=getDateTime('Y-m-d',0,new Date(target_date.getFullYear(), target_date.getMonth(), target_date.getDate() +7));

        $("#calendar").append($('<div class="move_week_zone"><a class="move_week btn btn-default" style="float: left" date='+ lastWeek +'>先週へ</a><a class="move_week btn btn-default" style="float: right" date='+ nextWeek +'>来週へ</a></div>'));
        //table作成
        var table=$('<table>');
        //日付列作成
        var th = $('<tr><th class=name_col></th>')
        var dayWeek =["(日)","(月)","(火)","(水)","(木)","(金)","(土)",""]
        $.each(week,function(i,item){
            th.append('<th class=date_col>' + week[i] + dayWeek[i] + '</th>');
        });
        //未スケジュール用のパラメータに書き換え
        week[week.length-1]="notset";
        table.append($('<thead>').append(th));
        var tbody = $('<tbody>');
        $.each(task_lists, function(j, usr_task_list){
            //名前表示
            if (j==0){
                var td = $('<tr><td rowspan=2>' + usr_task_list.user_name + '</td>')
            }else {
                var td = $('<tr><td>' + usr_task_list.user_name + '</td>')
            }
            //タスク表示
            $.each(week, function(k, date){
                var tasktd = $('<td class="'+ date +'" id="'+usr_task_list.user_id+'_'+ date +'" ondrop="onDrop( event, this );"ondragover="onDragOver( event );">')
                $.each(usr_task_list.week_task_list, function(l, task_list){
                    if (task_list.date==date.replace( /\//g , "-" )){
                        $.each(task_list.task_list, function(m, task){
                            if (task.complete_flag == 1){
                                //完了タスクの場合
                                tasktd.append(doneTask(task))
                            }else if(j==0){
                                if (date!="notset" ){
                                //自分のタスクの場合
                                tasktd.append(ownScaduledTask(task,usr_task_list.user_id,week[k]))
                            }else{
                                //未スケジュールの場合完了ボタンを表示しない。
                                tasktd.append(ownNotScaduledTask(task,usr_task_list.user_id,week[k]))
                            }
                        }else{
                                //他人のタスクの場合
                                tasktd.append(memberTask(task,usr_task_list.user_id,week[k]))
                            }
                        });
                    }
                });
                td.append(tasktd);
            });
            tbody.append(td);
            if (j==0){
                var comp_button_tr =$('<tr>');
                $.each(week, function(k, date){
                    //タスク追加ボタン
                    comp_button_tr.append(addTask($('#user_id').val(),week[k],j,k))
                });
                tbody.append(comp_button_tr);
            }
        });
        table.append(tbody);
        $("#calendar").append(table);
    }

    //main処理
    var target_date = new Date();
    weekDate=weekDateGet(target_date);
    sendAjax(weekDate,target_date);

    $(document).on('click','.other-week',function(){
        sendAjax($(this.id,target_date));
    });



    function sendAjax(weekDate,target_date){
       // 送信
       $.ajax({
        url: '/tasks.json',
        type: 'get',
        data: {user_id: $('#user_id').val(),date: weekDate[0]},
        timeout: 10000,
            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                createTable(result.task_list,weekDate,target_date);
                console.log($("#11_2016-07-17").find(".plan_time").text());
                console.log($("#11_2016-07-17").find(".result_time").text());
            },
            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
   }
   //先週、来週ボタンが押されたとき
   $(document).on('click','.move_week',function(){
        // 操作対象のフォーム要素を取得
        target_date=new Date($(this).attr('date'));
        weekDate=weekDateGet(target_date);
        sendAjax(weekDate,target_date);

    });

});


