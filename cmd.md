# Correct ownership of the .ssh directory and its contents
chown -R root:root /root/.ssh

# Set permissions for the .ssh directory
chmod 700 /root/.ssh

# Set permissions for the authorized_keys file
chmod 600 /root/.ssh/authorized_keys


docker run -d -p 8080:8080 -p 50000:50000 \
  -v /path/to/.ssh:/var/jenkins_home/.ssh \
  -v jenkins-ssh-keys:/var/jenkins_home \
  --name jenkins jenkins/jenkins:lts


linux:
docker run -d --name jenkins \
  -p 8081:8080 \
  -p 50000:50000 \
  -v /root/.ssh:/var/jenkins_home/.ssh \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
  
mac:
docker run -d --name jenkins \
  -p 8081:8080 \
  -p 50000:50000 \
  -v /Users/apple/.ssh:/var/jenkins_home/.ssh \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts


docker exec -u 0 -it jenkins bash

root@7c7caeaef0f1:/# eval $(ssh-agent -s)
ssh-add /var/jenkins_home/.ssh/id_rsa
Agent pid 328
Identity added: /var/jenkins_home/.ssh/id_rsa (root@scraping-api)
root@7c7caeaef0f1:/# cat /var/jenkins_home/.ssh/known_hosts

Check permissions:
sudo chown -R jenkins:jenkins /var/jenkins_home/.ssh
sudo chmod 700 /var/jenkins_home/.ssh
sudo chmod 600 /var/jenkins_home/.ssh/*

Test SSH Connection:
ssh -i /var/jenkins_home/.ssh/id_rsa git@github.com

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCpMo0bsrJYjBtX6LPqf4NGdAwT7X70oBifv7Fxb7mRQLDvT7Iin2a5Vl0jkUm+8TyivdjCCMb8U6s4s2e/clPuVFLW77H8Uex0krdh0BFspPI1jvpBPWphIrP2nndVCBMOC/FyKCzrBqQX5a17BezlWhMp1zWX3XFH/h+mTbXomOAIXQSnmajSUGwE9EO+fbq4w4plr5HnV3YhsvCrIBId+i4yvQEvQqJifzOx1SMEaMbEP9JzQE7AGF4RvnH2X1v0s9ec4WniI7dHh3E7L4CXNPzkTQdgzXrKiT6iEbyx2BRQZQTFCZ/tvl+exX35FBcEnTAuRtlexv+PNHzfTs89OiExLw2aZAG0CdcC0oxmYG/lgNOs1HvBSUoq7BC4aljm533IKxhToXOEn3F9wiZmCfml4gD4EQTfM70iVU0UZQ5cYuWl91MsikvM8v3dZ2/mNGQHnUzIPcd1VFSENO1YNM4myZWrCjb2G/VNLK/r7YU84Ijhq8/HhafWsuAofu8= apple@MacBook-Pro-4.local
