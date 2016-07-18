class InviteTransController < ApplicationController
    protect_from_forgery :except => [:create]

    def create
        begin
            result=Hash.new
            success= true
            if params[:mail_address].blank?
                result[:error_message]="メールアドレスが登録されていません。"
                flash[:notice] = result[:error_message]
                raise
            end

            #登録済みかチェックする。
            if InviteTran.where("mail_address=? and team_id=? and status_code >= 2",params[:mail_address],params[:team_id]).present?
                result[:error_message]="登録済みメールアドレスです。"
                flash[:notice] = result[:error_message]
                raise
            end

            #メール送信が完了したら、パラメータを更新する。 0はメール送信開始
            InviteTran.upsert({:team_id=>params[:team_id],:mail_address => params[:mail_address]},{:status_code=>0,:invite_user=>params[:invite_user]})

            #メール送信パラメータ設定
            url=Taskan::Application.config.url
            invite_user=User.where("id=?",params[:invite_user] )[0]
            team=Team.where("team_id=?",params[:team_id] )[0]

            # deliverメソッドを使って、メールを送信する
            if User.where("email = ? ",params[:mail_address]).present?
                #ユーザが存在する場合のメール
                Message.inviteTeamForReged(params[:mail_address],url,invite_user,team).deliver
            else
                #ユーザが存在しない場合のメール
                Message.inviteTeamForNotReg(params[:mail_address],url,invite_user,team).deliver
            end

            #メール送信が完了したら、パラメータを更新する。 1はメール送信完了
            InviteTran.upsert({:team_id=>params[:team_id],:mail_address => params[:mail_address]},{:status_code=>1,:invite_user=>params[:invite_user]})

        rescue => e
            if result[:error_message].blank?
                result[:error_message]=e.message
            end
            success=false
        ensure
            result[:success] = success
            p result
            respond_to do |format|
                format.html
                format.json {render :json => result}
            end
        end
    end

    def inviteComplete
        begin
            result=Hash.new
            success= true
            child_result=InviteTran.inviteComplete(params[:team_id],params[:mail])
        ensure
            result[:success] = true
            p result
            p child_result
            redirect_to tasks_path, notice: 'チームへの招待が完了しました。'
        end
    end
end
