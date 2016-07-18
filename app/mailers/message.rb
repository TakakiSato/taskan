class Message < ActionMailer::Base
  default from: "invite@taskan.com"

    def inviteTeamForNotReg(to,url,invite_user,team)
      @url=url
      @invite_user=invite_user
      @team=team
      @to=to
      mail(
       to: to,
       subject: 'taskan 招待メール')do |format|
      format.text
    end
  end
    def inviteTeamForReged(to,url,invite_user,team)
      @url=url
      @invite_user=invite_user
      @team=team
      @to=to
      mail(
       to: to,
       subject: 'taskan チーム招待メール')do |format|
      format.text
    end
  end
end
