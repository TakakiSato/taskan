$(function () {
    $('#js__sideMenuBtn').on('click', function(){
        var $body = $('body');
        $body.toggleClass('side-open');
        searchTeamName();
    }
    );
});

function searchTeamName() {
    var $body = $('body');
    $.ajax({
        url: "/teams.json",
        type: "GET",
        data: {user_id: $('#user_id').val()},
        timeout: 10000,
            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                //チームの一覧を表示する。
                $('#belong_team').empty();
                $.each(result.belong_teams, function(i, item){
                    $('#belong_team').append('<form action="/member_teams.json" class="js-submit" id= "' + item.team_id + '" method="get"><input id="team_id" name="team_id" type="hidden" value="' + item.team_id + '" /><input class="btn btn-default btn-team-size" name="commit" type="submit" value="' +item.team_name +'" /></form>');
                });
            },
            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {}
        });
    $('#js__overlay').on('click', function () {
        $body.removeClass('side-open');
    });
}
