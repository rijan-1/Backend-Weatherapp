from fastapi import FastAPI, HTTPException, Form
from pydantic import BaseModel
import json
import bcrypt
from fastapi.middleware.cors import CORSMiddleware

#Initilising the fast api
app = FastAPI()
users_file = "users.json"
origins = [

    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# JSON file path for storing user data


class User(BaseModel):
    username: str
    password: str

class UserInDB(User):
    hashed_password: str


@app.post("/register/")
async def register(user: User):
    # Load existing users from the JSON database
    try:
        with open(users_file, "r") as file:
            users = json.load(file)
    except FileNotFoundError:
        users = []

    # Check if the username is already taken
    if any(u["username"] == user.username for u in users):
        raise HTTPException(status_code=400, detail="Username already taken")

    # Hash the password before saving it
    hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())

    # Add the new user with hashed password to the JSON database
    users.append({"username": user.username, "hashed_password": hashed_password.decode("utf-8")})

    # Save updated users to the JSON database file
    with open(users_file, "w") as file:
        json.dump(users, file, indent=2)

    return {"username": user.username}

@app.post("/login/")
async def login(user: User):
    # Load existing users from the JSON database
    try:
        with open(users_file, "r") as file:
            users = json.load(file)  
            print(f"Received request with username: {user.username}, password: {user.password}")
    except FileNotFoundError:
        users = []

    # Find the user with matching username
    user_data = next((u for u in users if u["username"] == user.username), None)

    if user_data is None or not bcrypt.checkpw(user.password.encode("utf-8"), user_data["hashed_password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Authentication failed")

    return {"username": user.username, "message": "Login successful"}
