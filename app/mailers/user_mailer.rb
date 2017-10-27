class UserMailer < ApplicationMailer
  default from: 'learnmore@limbforge.org'

  def request_access(user)
    @user = user
    mail(to: 'learnmore@limbforge.org', subject: 'LimbForge app access request')
  end

  def access_granted(user)
    @user = user
    mail(to: @user.email, subject: 'LimbForge app access granted!')
  end
end
