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

### Intalling ambi-tv-remote
```
cd /home/pi
clone git@github.com:fluxa/ambi-tv-remote.git
cd ambi-tv-remote
git submodule update --init
npm install
```

### Compiling ambi-tv
```
cd ambi-tv
make
cd ..
```

### Fixing STK1160 gray stripes
```
sudo sh -c "echo 'options easycap bars=0' >> /etc/modprobe.d/easycap.conf"
```

### If you are using the USB Wifi Dongle (RTL8188CUS/RTL8192cu family) you can disable power management by doing 
```
sudo nano /etc/modprobe.d/8192cu.conf
```
Then copy/paste
```
# Disable power management
options 8192cu rtw_power_mgnt=0 rtw_enusbss=0
```

### Setup init.d service
First make sure to take a look at the init script and make changes according to your settings (APP_DIR)
```
sudo cp init.d/ambi-tv-remote /etc/init.d/
```

### Test if it works
```
/etc/init.d/ambi-tv-remote start
/etc/init.d/ambi-tv-remote status
/etc/init.d/ambi-tv-remote restart
/etc/init.d/ambi-tv-remote stop
```

### Add it to the defaults and reboot
```
sudo update-rc.d ambi-tv-remote defaults
sudo reboot
```
