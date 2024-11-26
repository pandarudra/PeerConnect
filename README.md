# PeerConnect Backend

This is the backend for the PeerConnect application, which provides APIs for user authentication, video call functionality using PeerJS, and real-time communication using Socket.IO.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/pandarudra/PeerConnect-Backend.git
cd peerconnect
```

2. Install the dependencies:

```sh
npm install
```

server/
├── API Test/
│ └── [req.rest](http://_vscodecontentref_/1)
├── controllers/
│ └── [user.ctrl.js](http://_vscodecontentref_/2)
├── db/
│ └── [dbconfig.js](http://_vscodecontentref_/3)
├── [index.js](http://_vscodecontentref_/4)
├── Mail/
│ └── [mail.js](http://_vscodecontentref_/5)
├── middlewares/
│ └── [auth.js](http://_vscodecontentref_/6)
├── models/
│ └── [user.model.js](http://_vscodecontentref_/7)
├── routes/
│ └── [router.js](http://_vscodecontentref_/8)
├── socket.io/
│ └── [socket.js](http://_vscodecontentref_/9)
├── utils/
│ └── [hasher.js](http://_vscodecontentref_/10)
├── webRTC/
│ └── [peerService.js](http://_vscodecontentref_/11)
├── .env
├── .gitignore
├── [package.json](http://_vscodecontentref_/12)
└── [README.md](http://_vscodecontentref_/13)
