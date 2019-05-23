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

2.You will need to have [Rails](http://guides.railsgirls.com/install) and [Postgres](http://postgresapp.com/) installed

```bash
brew update
brew install libpqxx imagemagick rbenv ruby-build postgresql
rbenv init >> ~/.bashrc
# Log out and log back in
rbenv install 2.3.3
rbenv global 2.3.3
gem install rails --no-document
ARCHFLAGS="-arch x86_64" gem install pg
```

3. Clone this repository and run the following commands at the root of the repository.

```bash
bundle install
```

4. Create the database.

```bash
brew services start postgresql
# starts pg now and restart at login. To manage this, use `brew services stop postgresql`
# Or, if you don't want/need pg always running as a background service you can just run:
#  pg_ctl -D /usr/local/var/postgres start
rake db:create
rake db:migrate
#if db:migrate did not populate the seed data, then run
rake db:seed 
pg_restore -cOd limbforge_development ~/Desktop/latest.dump
```

4. Start the Limbforge App and check it out in your browser at [localhost:3000](http://localhost:3000)

```bash
rails s
```

5. Environment Variables

S3_BUCKET_NAME
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION

DATABASE_URL
LIMBFORGE_DATABASE_PASSWORD

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

demo

```
git remote add demo https://git.heroku.com/limbforge-demo.git
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
