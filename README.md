# Todoist Linux

## What is it ?

Todoist Linux is an unofficial desktop application of Todoist.
It provides Linux users access to the Todoist without using a web browser.
It offers every features of the web version of Todoist including notifications.
It use nwjs to embed the web version in a window container and
some scripts to improve the user experience like loader, shortcuts, etc...

## Features

⋅⋅* Hide To Tray
⋅⋅* Global Shortcuts
⋅⋅* Zoom (Shortcut with Ctrl + + to zoom, Ctrl + - to unzoom, Ctrl + 0 to reset)

## Download

Todoist Linux is available for download via the [releases](https://github.com/kamhix/todoist-linux/releases) .

## Run it yourself

if you want to run it by yourself, please follow the following instructions.

### Clone the repo

    $ git clone https://github.com/kamhix/todoist-linux.git
    $ cd todoist-linux

### Install nodejs

    Follow instructions to install nodejs and npm.

### Install gulp

    $ npm install gulp-cli -g

### Install Dev Dependencies

    $ npm install

### Run project

    $ gulp start

### Build project
    
    $ gulp package
