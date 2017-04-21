class UserMailer < ApplicationMailer
  default from: 'kaitlynhova@gmail.com'

  def request_access(user)
    @user = user
    mail(to: 'kaitlynhova@gmail.com', subject: 'Limbforge app access request')
  end

  def access_granted(user)
    @user = user
    mail(to: @user.email, subject: 'Limbforge app access granted!')
  end
end
