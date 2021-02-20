INTRODUCTION
============

What's "screw"
--------------

 Screw is web crawler for saving screenshots following url lists.

Install
-------

 This instruction is for CentOS7, Amazon Linux2. 

### Install Google Chrome

`vi /etc/yum.repos.d/google-chrome.repo `

```
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/x86_64
enabled=1
gpgcheck=1
gpgkey=https://dl.google.com/linux/linux_signing_key.pub
```

### Install NodeJS



### Install Local Fonts (for Japanese)

`yum -y install ipa-gothic-fonts ipa-mincho-fonts ipa-pgothic-fonts ipa-pmincho-fonts` 

`npm install` 


Usage
-----
### get one screenshot with command line
`node path/to/main.js -u https://example.com -o example.png`

### get multiple screenshots with url list
`node path/to/main.js -l list.csv`