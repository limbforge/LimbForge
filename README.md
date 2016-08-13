## LimbForge Web App
Check it out live [HERE](http://limbforge.herokuapp.com/)

### GETTING APP STARTED ON LOCAL

1. You will have to have [Rails installed](http://guides.railsgirls.com/install)
2. Clone this repository
3. To install everything, open up the project in your console and run:
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
