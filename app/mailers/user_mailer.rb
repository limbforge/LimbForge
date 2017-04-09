class UserMailer < ApplicationMailer
  default from: 'admin@limbforge.org'

  def request_access(user)
    @user = user
    mail(to: 'admin@limbforge.org', subject: 'Limbforge app access request')
  end

  def access_granted(user)
    @user = user
    mail(to: @user.email, subject: 'Limbforge app access granted!')
  end
end
