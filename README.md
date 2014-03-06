ambi-tv-remote
==============

ambi-tv web remote

## Setup

### Installing Node.JS
```
wget http://nodejs.org/dist/v0.11.10/node-v0.11.10-linux-arm-pi.tar.gz
tar xvfz node-v0.11.10-linux-arm-pi.tar.gz
sudo mkdir /opt/node
sudo cp -r node-v0.11.10-linux-arm-pi/* /opt/node
sudo ln -s /opt/node/bin/node /usr/local/bin/node
sudo ln -s /opt/node/bin/npm /usr/local/bin/npm
```

### Compiling ambi-tv
```
cd ambi-tv
make
sudo cp ambi-tv/bin/ambi-tv /usr/local/bin/
sudo cp ambi-tv/sample.conf /etc/ambi-tv.conf
```
