class ApplicationController < ActionController::Base
  require 'upsert/active_record_upsert'

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :flash_to_headers

  protect_from_forgery with: :exception

  protected

  def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up,keys: [:user_name, :email, :password, :password_confirmation])
      devise_parameter_sanitizer.permit(:account_update,keys: [:user_name, :email, :password, :password_confirmation])
  end


  private

#flashメッセージをajaxに渡す処理
  def flash_to_headers
    return unless request.xhr?
    response.headers['X-Flash-Messages'] = flash_json
    # ページをリロードした際に flash メッセージが残ってしまうのを防ぐ。
    flash.discard
  end

  def flash_json
    flash.inject({}) do |hash, (type, message)|
      # XSS 対策を施す。
      message = "#{ERB::Util.html_escape(message)}"
      # 日本語のメッセージをレスポンスヘッダに含めるために URL エンコードしておく。
      message = URI.escape(message)
      hash[type] = message
      hash
    end.to_json
  end
end
