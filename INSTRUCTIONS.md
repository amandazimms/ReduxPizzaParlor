### link to trello:
- https://trello.com/b/N2R6nvLP/pizza-is-life

### link to Jen's repo:
- https://github.com/jenny-alexander/redux-pizza-parlor


### GIT BRANCHING aka How to work together :)

#### Getting started
- one person should create a new repo from the prime template
- then add the rest of you as collaborators on their repo
- the rest of you can then clone from that person's master repo

#### Making a new feature on its own branch
- git checkout -b <branch name> (makes a branch and brings you to it in one step)
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