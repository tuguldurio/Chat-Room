import os
import subprocess

# navigate into the build output directory
os.chdir('dist')

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# if you are using SSH key authentication
# git push -f git@github.com:<USER-NAME>/<REPO>.git master:gh-pages
subprocess.run(['git', 'init'], shell=True)
subprocess.run(['git', 'add', '-A'], shell=True)
subprocess.run(['git', 'commit', '-m', '\'deploy\''], shell=True)
subprocess.run(['git', 'push', '-f', 'https://github.com/tuguldurio/chat-room.git', 'master:gh-pages'], shell=True)