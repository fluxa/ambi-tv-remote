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
```

### Setup as a service
First make sure to take a look at the init script and make changes according to your settings (APP_DIR)
```
sudo cp init.d/ambi-tv-remote /etc/init.d/
```

### Test if it works
```
sudo /etc/init.d/ambi-tv-remote start
sudo /etc/init.d/ambi-tv-remote status
sudo /etc/init.d/ambi-tv-remote restart
sudo /etc/init.d/ambi-tv-remote stop
```

### Add it to the defaults and reboot
```
sudo update-rc.d ambi-tv-remote defaults
sudo reboot
```