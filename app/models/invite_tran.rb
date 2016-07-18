class InviteTran < ActiveRecord::Base
    belongs_to :team
    belongs_to :user
    validates :team_id, presence: true
    validates :user_id, presence: true

    def self.inviteComplete(team_id,mail_address)
        begin
            result=Hash.new
            success= true
            #引数で指定されたパラメータが存在するか。
            if InviteTran.where("team_id=? and mail_address=? and status_code = 1",team_id,mail_address).present?
                #招待処理を完了させる。 2は招待完了
                InviteTran.upsert({:team_id=>team_id,:mail_address => mail_address},{:status_code=>2})
                #メンバー チームテーブル作成
                user_id=User.where("email=?",mail_address).select(:id)[0]
                p "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                p user_id.id
                MemberTeam.create(:team_id=>team_id,:user_id=>user_id.id)
            else
                result[:error_message]="招待された履歴が存在しないか登録済みです。"
                flash[:notice] = result[:error_message]
                raise
            end
        rescue => e
            if result[:error_message].blank?
                result[:error_message]=e.message
            end
            success=false
        ensure
            p result
            return result
        end
    end
end