### link to trello:
- https://trello.com/b/N2R6nvLP/pizza-is-life



### GIT BRANCHING aka How to work together :)

#### making a new feature = make a new branch & go to that branch
- git checkout -b <branch name>
- (work on your feature)
- git add .
- git commit -m "bla"
- git push origin <branch name>
- on github, do a pull request
  - may need to communicate with group and resolve conflicts
  - now if it gives you the option, you can delete the branch safely
- git checkout master/main
- git pull
- now you're up to date

#### to delete a branch locally:
- git branch -d <branch name>

#### to delete a branch remotely:
- git push origin --delete <branch name>

#### force to to delete a branch completely, even if changes aren't integrated: 
- git branch -D <branch name>

