# cloud_demo

# Goods Management System – Group5_COMPS350F

## Project Description

- **Project Background**: In the modern logistics industry, goods management is a crucial link. However, many small and medium-sized enterprises still rely on traditional paper records or simple spreadsheets for goods management. This method is not only inefficient but also prone to data loss and inaccurate information. To help enterprises solve these pain points, we developed a goods management website, aiming to provide an efficient and intelligent goods management solution.

- **Project Objectives**: The goal of this project is to design and implement a goods management website linked to a MongoDB database, helping enterprises optimize their goods management processes and meet basic management functions.

- **Website Functions**:

1. **User Login:**

- Login using a given nickname and password.

2. **Goods Information Management:**

- This function has five sub-pages, supporting the addition, editing, deletion, querying, and viewing of goods lists.

- On the **Inbound Sub-page**, users can add goods names, goods numbers, goods quantities, and goods remarks. (Only the quantity of goods is "numerical," everything else is "string." Goods numbers must begin with a letter followed by numbers, such as "C001.")

- On the **Outbound Subpage**, users only need to enter the goods number to delete all goods with altered numbers.

- On the **Edit Subpage**, users can change the name, quantity, and remarks of goods by their goods number.

- On the **Search Subpage**, users can search by goods name or goods number and receive four pieces of information about the goods. (Searching by goods name will only return information for the goods with the first-place number.)

- On the **List Subpage**, users can see four detailed details for all goods, arranged by goods number.

3. **User Logout:**

- Clicking the logout button will return the user to the login page.

#### **Technical Implementation**

1. **Front-end Technology:**

- The user interface is built using CSS and JavaScript.

2. **Back-end Technology:**

- The server-side logic is built using server.js and the Express framework.

3. **Database:**

- Uses MongoDB to store product information, supporting efficient data querying and updating.

4. **Deployment:**

- Uses Render cloud service for website hosting, supporting access via links.

## Project File Structure

| File or Folder Name | Purpose |

|------|------|

| HTML | Static draft of website pages |

| public | Stores background image resources for the website |

| views | Contains .ejs files, which are the final website pages |

| README.md | Project introduction file |

| package.json | Used to manage project metadata, dependencies, and script commands |

| server.js | The project's main server file, typically used to define server logic and behavior |
