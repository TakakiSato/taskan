$(function(){
  $('body').on('click', '#tutorial', function(){
    var intro= introJs();
    intro
    .setOption('nextLabel','次へ')
    .setOption('prevLabel','戻る')
    .setOption('skipLabel', '終了')
    .setOption('doneLabel', '終了')
    .start();
});

  $('body').on('click', '#team_detail_tutorial', function(){
    var intro= introJs();
    intro
    .setOption('nextLabel','次へ')
    .setOption('prevLabel','戻る')
    .setOption('skipLabel', '終了')
    .setOption('doneLabel', '終了')
    .goToStep(5).start();
});
});