## LimbForge Web App
Check it out live [HERE](http://limbforge.herokuapp.com/)

### GETTING APP STARTED ON LOCAL
The following instructions worked on MacOS 10.12 with Xcode v8.2.1

1.You will need to have the most reccent version of xcode & xcode developer tools installed.
	- Install XCode from the Mac App Store.
	- Install the command line tools.
```bash
xcode-select --install
```

2.You will need to have [Rails installed](http://guides.railsgirls.com/install)
    - Install Ruby version 2.3.4
    - Install Rails version 4.2.5
```bash
brew update
brew install rbenv ruby-build imagemagick
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.bash_profile
# Log out and log back in
rbenv install 2.3.3
rbenv global 2.3.3
gem install rails --no-document
```

3.You will also need to have [Postgres installed](http://postgresapp.com/) on your local before starting step 4. In your project's folder run:

```bash
brew install postgresql
brew services start postgresql # starts pg now and restart at login
# Or, if you don't want/need pg always running as a background service you can just run:
#  pg_ctl -D /usr/local/var/postgres start
# every time you want to start Limbforge.
brew install libpqxx
ARCHFLAGS="-arch x86_64" gem install pg
```

4.Clone this repository

5. Environment Variables
S3_BUCKET_NAME
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
DATABASE_URL
LIMBFORGE_DATABASE_PASSWORD

5.To install everything in the project, open up the project in your console and run:
```bash
bundle install
```
*Create your database & migrate it. In your console, run:
```bash
rake db:create
rake db:migrate
```
*start your server in your console:
```bash
rails s
```
check it out in your browser at:
```
localhost:3000
```

### PUSHING CODE TO STAGING ENVIRONMENTS
Email Hova or Andreas to get added to the heroku apps. Once you are added, you can add remotes by running these commands in your console:

staging 1

```
git remote add staging1 https://git.heroku.com/limbforge-staging1.git
```

to push to it on local:

```
git push staging1 name-of-your-branch:master
```

staging 2

```
git remote add staging2 https://git.heroku.com/limbforge-staging2.git
```

```
git push staging2 name-of-your-branch:master
```

Make sure you are logged into heroku in your console:

```
heroku login
```

^^ fill it out, then run this line in your console (using staging1/staging2 and replacing your branch name):
```
git push staging1 name-of-your-branch:master
```
