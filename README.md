# 🧠 Redis Clone Project

A simplified clone of Redis built from scratch in Python — supporting core Redis features like in-memory key-value storage, data structures, and basic persistence. Ideal for learning how Redis works internally.

## 🚀 Features

- **Core Key–Value Operations**: `SET`, `GET`, `DEL`, `EXISTS`, etc.
- **Data Structures**: Strings, Lists, Hashes, Sets
- **Persistence**: Snapshot-based save/load (RDB-like)
- **TTL Support**: Set expiration time on keys
- **Pub/Sub System**: Publish and subscribe to channels
- **Concurrent Clients**: Handle multiple client connections using sockets and threads
- **Command Parsing**: Minimal REPL-style interface

## 🧱 Tech Stack

| Component         | Technology           |
|------------------|----------------------|
| Language          | Python 3.10+         |
| Networking        | `socket`, `threading`|
| Serialization     | `pickle` or `json`   |
| Testing           | `pytest`             |
| Persistence       | File-based RDB-like  |

## 🔧 Prerequisites

- Python 3.10 or higher
- Install dependencies:
  
```bash
pip install -r requirements.txt
```

## ⚙️ Setup Instructions

```bash
git clone https://github.com/Bharath5050/Redis_Clone_Project.git
cd Redis_Clone_Project
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🚀 How to Run

1. **Start the Redis clone server**

```bash
python server.py
```

2. **Run the client to connect**

```bash
python client.py
```

3. **Try some commands**

```bash
SET name Bharath
GET name
DEL name
LPUSH fruits apple
RPUSH fruits mango
LRANGE fruits 0 10
EXPIRE name 60
```

## 🧠 Internal Modules

- `server.py`: Main server loop handling sockets
- `client.py`: CLI interface for issuing commands
- `database.py`: In-memory store & TTL management
- `persistence.py`: Saving and loading data snapshots
- `pubsub.py`: Simple publish-subscribe logic

## 🧪 Running Tests

```bash
pytest tests/
```

## 🛠 Example Commands

```bash
SET mykey hello
GET mykey
DEL mykey
LPUSH colors red
RPUSH colors blue
LRANGE colors 0 -1
EXPIRE mykey 30
PUBLISH news "Redis clone ready"
SUBSCRIBE news
```

## 🧭 Roadmap

- [ ] Implement AOF (Append-Only File) persistence
- [ ] Add sorted sets (ZADD, ZRANGE, etc.)
- [ ] Add clustering / replication support
- [ ] Dockerize for production testing
- [ ] Add user authentication system

## 🤝 Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

✅ Follow consistent code style  
✅ Write test cases for new features

## 📸 Results Screenshot

![Results](https://github.com/Bharath5050/Redis_Clone_Project/blob/main/Output.png)


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
