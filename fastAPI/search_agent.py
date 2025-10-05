import os
import requests
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.tools import tool as lc_tool
from langchain.tools import StructuredTool
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.prebuilt import create_react_agent
from langgraph.graph import MessagesState, END
from langgraph.types import Command
from langchain_core.messages import HumanMessage
from langgraph.graph import StateGraph, START
import pprint

os.environ["TAVILY_API_KEY"] = "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"
os.environ["GOOGLE_API_KEY"] = "AIzaSyCNgCX_OVqGEMrRNmLOdT4-Hv0X9ls8DV8"
os.environ["NOVADA_API_KEY"] = "05cbcc4f64098ddac08df219ba22af37"

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-preview-04-17",
    api_key=os.environ["GOOGLE_API_KEY"]
)

# Tools setup
TavilySearchResults = TavilySearchResults(max_results=4)

def novada_google_search(query: str) -> dict:
    params = {
        "engine": "google",
        "q": query,
        "no_cache": False,
        "api_key": os.environ["NOVADA_API_KEY"],
    }
    resp = requests.get("https://scraperapi.novada.com/search", params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()

novada_google_search_tool = StructuredTool.from_function(
    novada_google_search,
    name="novada_google_search",
    description="search your query in google via NovaDA."
)

@lc_tool("linkedin_lookup", description="Get company metadata from LinkedIn.")
def linkedin_lookup(domain: str) -> dict:
    headers = {
        "x-rapidapi-key": "af3a7f9a9cmsh9b80fe7a10929e9p1c214cjsnf7ba6e506a5a",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
    }
    resp = requests.get(
        "https://linkedin-data-api.p.rapidapi.com/get-company-by-domain",
        headers=headers,
        params={"domain": domain},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()

@lc_tool(                                  
    "facebook_page_videos",
    description=(
        "search facebook to get details about profiles and pages and posts "
    ),
)
def facebook_page_videos(delegate_page_id: str) -> dict:
    
    url = "https://facebook-scraper3.p.rapidapi.com/page/videos"
    headers = {
        "x-rapidapi-key": "62dfe70d1bmshca50d0c68a6b9ccp131dfcjsn99ff0f64884b",
        "x-rapidapi-host": "facebook-scraper3.p.rapidapi.com",
    }
    resp = requests.get(url, headers=headers, params={"delegate_page_id": delegate_page_id}, timeout=30)
    resp.raise_for_status()
    return resp.json()

@lc_tool(
    "twitter_lookup",
    description=(
        "Retrieve a single tweet’s JSON payload via the RapidAPI twitter241 endpoint. "
        "Input = tweet ID (pid)."
    ),
)
def twitter_lookup(pid: str) -> dict:
    """
    Example
    -------
    >>> twitter_lookup("1631781099415257088")
    {... full tweet JSON ...}
    """
    url = "https://twitter241.p.rapidapi.com/tweet"
    headers = {
        "x-rapidapi-key": "af3a7f9a9cmsh9b80fe7a10929e9p1c214cjsnf7ba6e506a5a",
        "x-rapidapi-host": "twitter241.p.rapidapi.com",
    }
    resp = requests.get(url, headers=headers, params={"pid": pid}, timeout=30)
    resp.raise_for_status()
    return resp.json()


# Create research agent
def make_system_prompt(suffix: str) -> str:
    return f"""You are a comprehensive research agent specializing in corporate intelligence. {suffix}

When researching a company, you must gather ALL of the following information:

1. COMPANY OVERVIEW:
   - Full company name, founding year, headquarters location
   - Business description, mission, and vision
   - CEO and key leadership team
   - Company size (employees, revenue, market cap if public)
   - Stock ticker and exchange if publicly traded

2. BUSINESS OPERATIONS:
   - Core services and solutions offered
   - Key industry verticals served
   - Main competitors and market position
   - Recent acquisitions, mergers, or partnerships
   - Major clients and case studies

3. GLOBAL PRESENCE:
   - Complete list of countries and regions of operation
   - Number of offices and locations worldwide
   - Regional headquarters and key facilities
   - Local market presence and employee distribution

4. FINANCIAL INFORMATION:
   - Annual revenue and growth trends
   - Profitability and key financial metrics
   - Recent financial performance and quarterly results
   - Investment and funding history

5. DIGITAL PRESENCE & MARKETING:
   - Official website and digital properties
   - Social media presence (LinkedIn, Twitter, Facebook, Instagram)
   - Recent marketing campaigns and initiatives
   - Thought leadership and content strategy
   - Awards and recognitions

6. TECHNOLOGY & INNOVATION:
   - Technology stack and platforms used
   - Innovation labs and R&D initiatives
   - Patents and intellectual property
   - Digital transformation capabilities
   - AI and emerging technology adoption

7. SUSTAINABILITY & CSR:
   - ESG initiatives and sustainability programs
   - Corporate social responsibility activities
   - Environmental commitments and certifications
   - Diversity and inclusion programs

8. RECENT NEWS & DEVELOPMENTS:
   - Latest news articles and press releases
   - Recent strategic announcements
   - Market expansion and new ventures
   - Leadership changes and organizational updates

Use ALL available tools to gather this comprehensive information. Search multiple times with different queries to ensure complete coverage."""

research_agent = create_react_agent(
    llm,
    tools=[novada_google_search_tool, TavilySearchResults, linkedin_lookup, twitter_lookup, facebook_page_videos],
    prompt=make_system_prompt("Research all company details exhaustively with focus on Inetum or any requested company.")
)

# Workflow nodes
def get_next_node(last_message, goto):
    if "FINAL ANSWER" in last_message.content:
        return END
    return goto

def research_node(state: MessagesState) -> Command:
    result = research_agent.invoke(state)
    goto = get_next_node(result["messages"][-1], "verifier_agent")
    result["messages"][-1] = HumanMessage(content=result["messages"][-1].content, name="researcher")
    return Command(update={"messages": result["messages"]}, goto=goto)

# Build workflow graph
workflow = StateGraph(MessagesState)
workflow.add_node("researcher", research_node)
workflow.add_edge(START, "researcher")
graph = workflow.compile()

# MAIN FUNCTION — used by your API
def run_search_agent(company_name: str) -> str:
    detailed_query = f"""
    Research {company_name} comprehensively. I need complete information including:
    
    1. Company overview, history, and leadership
    2. Business operations, services, and market position
    3. Global presence and locations worldwide
    4. Financial performance and recent results
    5. Digital presence and social media activity
    6. Technology capabilities and innovation
    7. Recent news, announcements, and developments
    8. Sustainability initiatives and corporate responsibility
    
    Use multiple search queries and all available tools to gather exhaustive information.
    Provide a detailed, well-structured report with all findings.
    """
    
    events = graph.stream(
        {"messages": [("user", detailed_query)]},
        {"recursion_limit": 50},
    )

    final_results = []
    for state in events:
        if 'researcher' in state and 'messages' in state['researcher']:
            content = state['researcher']['messages'][-1].content
            final_results.append(content)

    return "\n\n".join(final_results)
