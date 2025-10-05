from fastapi import FastAPI, Query
from pydantic import BaseModel
from search_agent import run_search_agent
from fastapi.middleware.cors import CORSMiddleware

class SearchRequest(BaseModel):
    company: str

app = FastAPI()

# CORS configuration to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def root():
    return {"message": "Web Search Agent API is running!"}

@app.post("/search")
def search(request: SearchRequest = None, company: str = Query(None)):
    # Handle both body request and query parameter
    if request and request.company:
        company_name = request.company
    elif company:
        company_name = company
    else:
        return {"error": "Company name is required either in body as 'company' or as query parameter 'company'"}
    
    result = run_search_agent(company_name)
    
    # Return structured response that matches frontend expectations
    return {
        "query": company_name,
        "report": result,
        "overview": f"Comprehensive analysis for {company_name}",
        "strategy": "Strategic insights extracted from research",
        "products": "Products and services information",
        "financials": "Financial data and performance metrics"
    }
