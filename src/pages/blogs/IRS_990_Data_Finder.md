---
layout: /src/layouts/post.astro
title: "Data Finder Project"
pubDate: 2024-06-24
description: "Explaining the 990 Data Finder Project."
author: "Kunj Patel"
excerpt: This post dives into the 990 Data Finder, a tool for exploring nonprofit data through IRS Form 990s, where nonprofit financial data was extracted from the IRS website using a custom XML scraper and by leveraging APIs. This project successfully organized data to be used for further analysis. This project was done during a Hackathon.
image:
  src:
  alt:
tags: ["Data Extraction", "Web Scraping", "Project Explanation"]
---

## Introduction: Why 990 Data Matters?

Hello and welcome to another project, The 990 Data Finder. This is a hackathon project I worked on where I ended up working on getting the Data requested by the organizers. This blog is where I intend to explore problem-solving and an in-depth look into creating this data set.

This project is meant to bring transparency to non-profit data and show how it was aggregated together, IRS Form 990 serves as a public disclosure from nonprofits, detailing their operational structures and financial statuses.

It provides information on the organization's mission, programs, and finances. Understanding this form is crucial for anyone looking into the nonprofit sector, be it for research, donation, or governance reasons.

## Problem Statement

The hackathon problem group that we were part of needed to find grant-related data from foundations and other nonprofits and the wages that nonprofits pay their employees:

A more technical depth to the problem can be broken into two parts:

**Part 1:** Searching for different foundations, where we would use the Data from 990-PFs, where we look for geographic locations, the grant application process, who it should be addressed to, submission deadlines, restrictions, and limitations, and if the foundations accept unsolicited requests for the fund, along with amounts and types of grants provided.

**Part 2:** Searching for nonprofit salaries, where we would use data from form 990s and 990 EZs, and we would look for Geographic Locations, Annual gross revenue, annual net revenue, Look for the names of people with titles such as Director, Chief Officer, Manager, Coordinator, etc.

## Solution: Code Structure and Explanation

So this was a very interesting and confusing problem as I was not sure where to start or where to even look for the data, fortunately, my Teammate [KlebJ037](https://github.com/KlebJ037) helped me out by finding the IRS link which had all the Form 990 Data along with helping with API documentation.

To get started we ended up finding an API called [Propublica](https://projects.propublica.org/nonprofits/api) which is a nonprofit explorer API, we used this API to get names, previous year revenue and references for NTEE (National Taxonomy of Exempt Entities) codes to categorize based on which type of nonprofit.

Example usage of making API calls:

```py
def fetch_data(ein):
 api_url = f'https://projects.propublica.org/nonprofits/api/v2/organizations/{ein}.json'
    try:
 response = requests.get(api_url)
 response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch data for EIN {ein}: {e}")
        return None

def ein_lookup(eins):
    with concurrent.futures.ThreadPoolExecutor() as executor:
 results = list(executor.map(fetch_data, eins))
    return results
```

After getting this data I saved it to a CSV file so that I could append it with the other data that I got from the IRS.

Now onto the part where we get the rest of the data, I ended up creating an XML Based scraper that extracts the financial data ([IRS Form 990 Series (e-file) XML format for the year 2023](https://www.irs.gov/charities-non-profits/form-990-series-downloads)) from the IRS's Form 990 Series (e-file) for the year 2023, We ended up retrieving Gross Revenue, Total Expenses, Net Revenue, Tax Year, Form Type, Salaries, etc.

Example snippet of the parser:

```py
namespace = {'ns': 'http://www.irs.gov/efile'}

data_directory = "/path/to/xml/data"

extracted_data = []

for xml_file in os.listdir(data_directory):
    if xml_file.endswith(".xml"):
 xml_path = os.path.join(data_directory, xml_file)
 tree = ET.parse(xml_path)
 root = tree.getroot()

        for form in root.findall(".//ns:ReturnTypeCd", namespaces=namespace):
            if form.text in ['990', '990EZ']:
 ein = root.find(".//ns:EIN", namespaces=namespace).text
 gross_revenue = root.find(".//ns:TotalRevenue", namespaces=namespace).text
 total_expenses = root.find(".//ns:TotalExpenses", namespaces=namespace).text
 net_revenue = int(gross_revenue) - int(total_expenses)

 extracted_data.append({
                    "EIN": ein,
                    "Gross_Revenue": gross_revenue,
                    "Total_Expenses": total_expenses,
                    "Net_Revenue": net_revenue
                })

df = pd.DataFrame(extracted_data)
df.to_csv("/path/to/save/financial_data.csv", index=False)

```

I also ended up doing something similar for the 990 PF records which was requested to be separate and ended up getting the data as requested.

## Conclusion

The creation of the XML scraper was a major milestone in our project, and this was what allowed our team to be the best in our section, as we had a very comprehensive data set. This project is also quite significant as it helps bring transparency to the nonprofit world.

If you want to delve a bit further into the code and into contributing to this project feel free to check out the [Github Repo](https://github.com/KunjVPatel/990-Data-Finder).

## Summary

This post dives into the 990 Data Finder, a tool for exploring nonprofit data through IRS Form 990s, where nonprofit financial data was extracted from the IRS website using a custom XML scraper and by leveraging APIs. This project successfully organized data to be used for further analysis. This project was done during a Hackathon.

---
Thank you for reading and look forward to further updates.