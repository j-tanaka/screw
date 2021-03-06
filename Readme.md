INTRODUCTION
============

What's "screw"
--------------

 screw is web crawler for saving screenshots following url lists.
 screw is named after "SCreen REcorder for Websites".

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

`sudo yum -y install google-chrome-stable` 

### Use NodeJS v14 with nvm

`nvm install v14`

`nvm use v14`

### Install Local Fonts (for Japanese)

`yum -y install ipa-gothic-fonts ipa-mincho-fonts ipa-pgothic-fonts ipa-pmincho-fonts` 

`npm install` 


Usage
-----
### get one screenshot with command line
`node path/to/main.js -u https://example.com -o example.png`

### get multiple screenshots with url list
`node path/to/main.js -l list.csv`

### Delete captured history (delete message digests) 
`rm -rf /var/tmp/screw/`

### command options

| op | option         | default        | description                                           |
|----|----------------|----------------|-------------------------------------------------------|
| -u | --url          |                | A url for getting screenshot                          |
| -o | --output       | screenshot.png | File name of screenshot                               |
| -w | --width        | 1280           | Width of screenshot                                   |
| -h | --height       | 800            | Height of screenshot                                  |
| -l | --list         |                | Filepath to url list written in csv                   | 
| -m | --multiple     | 10             | Number of concurrent processes                        |
| -d | --createdir    | false          | Create directory for saving files with timestamp (*1) |
| -t | --usetimestamp | false          | Append timestamp (YYYYMMDDHHMMSS) as suffix           |
| -f | --forcecapture | false          | Force capture in spite of no change                   | 

(*1) apply only with -t (--usetimestamp) option.

### url list format written in CSV
* No header row 
* UTF-8 without BOM
* Url for 1col, filename for 2col

```urllist.csv
https://www.google.com,google.png
https://www.msn.com,msn.png
```