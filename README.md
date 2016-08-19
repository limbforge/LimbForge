## LimbForge Web App
Check it out live [HERE](http://limbforge.herokuapp.com/)

### GETTING APP STARTED ON LOCAL

1.You will first have to have [Rails installed](http://guides.railsgirls.com/install)
    - Install Ruby version 2.3.0
    - Install Rails version 4.2.5
    
2.You will need to have the most reccent version of xcode & xcode developer tools installed.

3.You will also need to have [Postgres installed](http://postgresapp.com/) on your local before starting step 4. Run:

```
brew install libpqxx
 ```
```
sudo ARCHFLAGS="-arch x86_64" gem install pg
```
4.Clone this repository

5.To install everything in the project, open up the project in your console and run:
```
bundle install
```
*Create your database & migrate it. In your console, run:
```
rake db:create
rake db:migrate
```
*start your server in your console:
```
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
