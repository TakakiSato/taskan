$(function() {
    //メンバー招待入力フォーム表示
    $(document).on('click','.invite_start',function(){
        t_u_id=$(this).attr("id").split(/\s+/)
        var team_id=t_u_id[0]
        var user_id=t_u_id[1]
        $(this).after('<form action="/invite_trans.json" method="post" class="js-submit" id="invite_team" 　="">メールアドレス<br><input id="mail_address" name="mail_address" type="email"><input id="team_id" name="team_id" type="hidden" value="'+team_id+'"><input id="invite_user" name="invite_user" type="hidden" value="'+user_id+'"><input class="btn btn-primary" name="commit" type="submit" value="送信"><br>追加したいメンバーのメールアドレスを<br>入力して送信を押してください。</form>')
    });

});

function memberListAdd(team_id,members,invite_user_id){
        //メンバー一覧初期化
        $('#team_' +team_id+ '_member').empty();
        //メンバー一覧表示
        $('#'+team_id).after("<div id=team_"+team_id+"_member></div>");
        $('#team_' +team_id+ '_member').append("所属メンバー <br><ul>");
        $.each(members, function(i, item){
            $('#team_' +team_id+ '_member').append('<li>' + item.user_name +'</li>');
        });
        $('#team_' +team_id+ '_member').append("</ul>");
        //招待処理ボタン表示
        $('#team_' +team_id+ '_member').append('\
            <div data-intro="「メンバーを招待する」を押すとメールアドレス入力フォームが表示されます。<br>チームに招待したい人のメールアドレスを入力して送信ボタンを押してください<br><strong>※送信ボタンを押してもフォームのクリアはされませんがメールの送信はされています。</strong><br>" data-step="6">\
            <div class="btn btn-default invite_start" id="' + team_id + ' '+ invite_user_id + '" ><p class="fa fa-user-plus"> メンバーを招待する</p></div>\
            </div>');
    }
