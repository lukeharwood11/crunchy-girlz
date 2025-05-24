from fastapi import FastAPI

app = FastAPI(title="Crunchy Girlz API")

@app.get("/")
async def root():
    return {"message": "Welcome to Crunchy Girlz API"}

@app.get("/health")
async def health():
    return {"status": "healthy"}