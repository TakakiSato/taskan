$(function() {
    //メンバー招待入力フォーム表示
    $('.js-form').on('click','.invite_start',function(){
        t_u_id=$(this).attr("id").split(/\s+/)
        var team_id=t_u_id[0]
        var user_id=t_u_id[1]
        $(this).after('<form action="/invite_trans.json" method="post" class="js-submit" id="invite_team" 　="">メールアドレス<br><input id="mail_address" name="mail_address" type="email"><input id="team_id" name="team_id" type="hidden" value="'+team_id+'"><input id="invite_user" name="invite_user" type="hidden" value="'+user_id+'"><input class="btn btn-primary" name="commit" type="submit" value="送信"><br>追加したいメンバーのメールアドレスを<br>入力して送信を押してください。</form>')
    });
});
