# Shared Notepad

A simple shared notepad app where multiple people can create and edit notes together by sharing a note ID.

Built with React (frontend), FastAPI (backend), and PostgreSQL (database). Everything runs in Docker.

---

## What it does

- Create a new empty note with one click
- Edit the title and content
- Share the note ID with someone else so they can open the same note
- Save, update, or delete notes
- View a list of all existing notes on the home page

No login. No access control. Just open and write.

---

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | React + Vite + nginx |
| Backend  | Python + FastAPI    |
| Database | PostgreSQL          |
| Deploy   | Docker + Docker Compose |

---

## Project Structure

```
notepad-app/
├── backend/          # FastAPI app
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/         # React app
│   ├── vite-project/
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml
```

---

## Running the app

Make sure you have Docker and Docker Compose installed, then run this from the project root:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs (Swagger): http://localhost:8000/docs

---

## API Endpoints

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| POST   | /notes          | Create a new empty note  |
| GET    | /notes          | List all notes           |
| GET    | /notes/{id}     | Get a single note by ID  |
| PUT    | /notes/{id}     | Update title and content |
| DELETE | /notes/{id}     | Delete a note            |

---

## How two people collaborate

1. Person A clicks **Create New Note** and shares the note ID shown on the editor page
2. Person B pastes the ID into the **Open by ID** field on the home page and clicks Open
3. Both are now on the same note — whoever saves last wins

---

## Environment Variables

**Backend**
| Variable     | Default                                          |
|--------------|--------------------------------------------------|
| DATABASE_URL | postgresql://postgres:postgres@db:5432/notepad   |

**Frontend**
| Variable      | Default                  |
|---------------|--------------------------|
| VITE_API_URL  | http://localhost:8000    |
