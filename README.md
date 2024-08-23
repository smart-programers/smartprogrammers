
## Getting Started
```bash
git clone https://github.com/TZYOUNGDEVELOPERS/smartprogrammers

```
## Install Dependencies
```bash
npm install
```
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## To commit
 create new branch

 ```bash

 git checkout -b branch_name

 ```

 Add Changes

 ```bash

 git add .

 ```
Remove .env from Staged Commit
```bash
git rm --cached .env
```

OR

```bash
git restore --staged .env
``` 

 Commit

 ```bash

 git commit -m "Message"

 ```

 Pull

 ```bash

 git pull origin main

 ```

 Push

 ```bash

 git push

 ```

 ## Advanced Merge

 For Both Professionals and Beginners but if you are new into Git please don't use it if you feel uncomfortable

 Add Changes

 ```bash

 git add .

 ```

 Commit

 ```bash

 git commit -m "Message"

 ```

 Pull

 ```bash

 git pull origin main

 ```

 Push

 ```bash

 git push

 ```

 ```bash
 git checkout main  # or the branch you want to merge into
 ```

Pull Changes From Origin Branch and Solve COnflicts if they exist
 ```bash
 git pull origin main
```
Now, merge the branch with the changes you want to incorporate. Replace feature-branch with the name of the branch you're merging from.
```bash
git merge feature-branch
```

Now Push Your Local Changes on Main to remote Main
```bash
git push
```

## After Merge Remember to Switch to Your Branch Again
```bash
git checkout main
```