---
layout: /src/layouts/post.astro
title: "Money Mentor"
pubDate: 2024-06-30
description: "Explaining the Money Mentor Project"
author: "Kunj Patel"
excerpt: This post delves into the backend development of the Money Mentor project, a financial mentorship application built for the TIAA Hackathon. This initiative intends to gamify the retirement and savings planning process for Generation Z to solve the issues they confront. The backend uses the Plaid API for data retrieval and GPT for data summarizing.
image:
  src:
  alt:
tags: ["Data Analysis", "Fin-tech", "OpenAI", "Project Explanation"]
---

## Introduction

Welcome to another project explanation blog. This was a hackathon project that I participated in, where my teammates ([KlebJ037](https://github.com/KlebJ037), [Dubcfrito](https://github.com/Dubcfrito), [Sadzhamo](https://github.com/sadzhamo)) ended up creating an application known as Money Mentor.

Money Mentor is an application that was designed to assist Gen Z in their retirement and make it a bit less mundane while doing so. Our approach makes it into a game with points based on spending habits.

This post is mostly intended to discuss the backend work I completed for this hackathon, including the essential components and concepts that make the solution workable, even though this project was more of a proof of concept. I am also proud to announce that we won third place in this competition.

[TIAA Hackathon Blog from ASU](https://news.wpcarey.asu.edu/20231106-asu-students-use-tiaa-tech-and-generative-ai-create-retirement-savings-app)

## Problem Statement

My generation, Gen Z, has had a pretty massive challenge in this economy of trying to plan for retirement and savings for the future. A lot of the time, it's not even something that is considered, and this poses an issue. 

Although the more bog-standard methods may be difficult and oftentimes tracking items that we buy can be a hassle, this application, Money Mentor, tries to make it easier for users to understand their data and to reduce redundant spending to save money.

## Backend Overview

The backend of Money Mentor fetches financial data and generates a scorecard by passing this data into a pre-trained model and a scoring formula to create scorecards.

The three main components are:

- **Plaid API Integration**: Fetches transaction data.
- **Data Processing**: Classifies transactions and calculates financial scores.
- **GPT Integration**: Summarizes financial data into scorecards.

## Plaid API Integration

To show the proof of concept, we use the dummy data that we retrieve from Plaid's API to analyze and use for this project.

### Plaid API Call

The code used to fetch the Plaid API is:

```py
sys.path.append('../KeysPlaid')
import Plaid_Keys

PLAID_CLIENT_ID = Plaid_Keys.PLAID_CLIENT_ID
PLAID_SECRET = Plaid_Keys.PLAID_SECRET
PLAID_ENV = Plaid_Keys.PLAID_ENV

def get_transactions(access_token, start_date, end_date):
 payload = {
        'client_id': PLAID_CLIENT_ID,
        'secret': PLAID_SECRET,
        'access_token': access_token,
        'start_date': start_date,
        'end_date': end_date,
        'options': {'count': 500}
    }
 response = requests.post(f'{PLAID_ENV}/transactions/get', json=payload)
    return response.json()
```

Please check out the [github repo](https://github.com/sadzhamo/money_mentor) if you want to see the entire code. The above snippet is mainly to serve as an example of how data was requested from the API.

## Data Processing and Classification

The next step is to analyze the transaction data and separate it into important and non-essential groups. This categorization is useful in determining financial scores.

This phase prompted me to hardcode the essential and non-essential categories rather than develop a more acceptable model for distinguishing essential from non-essential due to time constraints.

### Transaction Classification

```py
user = pd.read_csv(path)

essential_categories = ['Payment', 'Transfer', 'Deposit', 'Credit Card']
non_essential_categories = ['Travel', 'Recreation', 'Gyms and Fitness Centers', 'Fast Food']

def classify_transaction(category):
    if not isinstance(category, (list, str)):
        return 'Unknown'
    
    if isinstance(category, str):
        try:
 category_list = eval(category)
        except:
            return 'Unknown'
    else:
 category_list = category
    
 is_essential = any(essential in category_list for essential in essential_categories)
 is_non_essential = any(non_essential in category_list for non_essential in non_essential_categories)
    
    if is_essential:
        return 'Essential'
    elif is_non_essential:
        return 'Non-Essential'
    else:
        return 'Other'

user['classification'] = user['category'].apply(lambda x: classify_transaction(x))
```

### Score Calculation and Summarization

The last step was where the transactions were passed through a formula to create a score and then passed through GPT to create an explanation of the scorecard.

## Summary.

This post delves into the backend development of the Money Mentor project, a financial mentorship application built for the TIAA Hackathon. This initiative intends to gamify the retirement and savings planning process for Generation Z to solve the issues they confront. The backend uses the Plaid API for data retrieval and GPT for data summarizing.

---
Thank you for reading, and I look forward to further updates.