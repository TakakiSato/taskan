//チーム追加フォーム
$(function () {
  $('#create-team-form').toggle();
  $('#create-team').click(function(){
    $('#create-team-form').toggle(true);
    $('#create-team').click(function(){
      $('#create-team-form').toggle();
    });
  });
});

//タスク追加フォーム
$(function () {
  $(document).on('click','.add-task-child',function(){
    $(this).parent().parent().children().toggle();
    $("html,body").animate({scrollTop:$(this).parent().parent().children().offset().top});
  });
});

//案件追加フォーム
$(function () {
  $(document).on('click','.project_add_form_toggle',function(){
    console.log("aaaaaa")
    $("#make_project_" + $(this).attr("id")).toggle(true);
  });
});

//タスクタイプ追加フォーム
$(function () {
  $(document).on('click','.task_type_add_form_toggle',function(){
    $("#make_task_type_" + $(this).attr("id")).toggle(true);
  });
});

