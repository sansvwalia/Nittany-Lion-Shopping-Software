import sqlite3
import csv
import os

print("Starting directory:", os.getcwd())



db_file = "NLionBusiness.db"
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Move into CSV folder
os.chdir("csv_files")
print("Now in:", os.getcwd())

# ---------------------------
# CREATE TABLES
# ---------------------------

cursor.execute("""
CREATE TABLE IF NOT EXISTS Category(
    CategoryID INTEGER PRIMARY KEY,
    CategoryName TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Tag(
    TagID INTEGER PRIMARY KEY,
    TagName TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Registered_User(
    Email TEXT PRIMARY KEY,
    Password TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Business(
    BusinessID INTEGER PRIMARY KEY,
    BusinessName TEXT,
    BusinessEmail TEXT,
    Phone TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Buyer(
    BuyerEmail TEXT PRIMARY KEY,
    StreetAddress TEXT,
    FName TEXT,
    LName TEXT,
    RegistrationDate TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Help_Desk(
    HelpDeskEmail TEXT PRIMARY KEY,
    PhoneNumber TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS "Transaction"(
    TransactionID INTEGER PRIMARY KEY,
    Transaction_Date TEXT,
    Total REAL,
    BuyerEmail TEXT,
    FOREIGN KEY (BuyerEmail) REFERENCES Buyer(BuyerEmail)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Zipcode_Info(
    zipcode INTEGER PRIMARY KEY,
    city TEXT,
    state TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Credit_Cards(
    credit_card_num TEXT PRIMARY KEY,
    card_type TEXT,
    expire_month TEXT,
    expire_year INTEGER,
    security_code TEXT,
    owner_email TEXT NOT NULL,
    FOREIGN KEY (owner_email) REFERENCES Registered_User(email)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Product(
    ProductID INTEGER PRIMARY KEY,
    Name TEXT,
    Description TEXT,
    Quantity INTEGER,
    TagID INTEGER,
    CategoryID INTEGER,
    Price REAL,
    FOREIGN KEY (TagID) REFERENCES Tag(TagID),
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Seller(
    BusinessID INTEGER,
    UserEmail TEXT PRIMARY KEY,
    FOREIGN KEY (BusinessID) REFERENCES Business(BusinessID),
    FOREIGN KEY (UserEmail) REFERENCES Registered_User(Email)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Product_Price(
    ProductID INTEGER PRIMARY KEY,
    Name TEXT,
    Description TEXT,
    Quantity INTEGER,
    Price REAL,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Ticket(
    TicketID INTEGER PRIMARY KEY,
    Topic TEXT,
    Date_Opened TEXT,
    Description TEXT,
    Status TEXT,
    UserEmail TEXT NOT NULL,
    HelpDeskEmail TEXT NOT NULL,
    FOREIGN KEY (UserEmail) REFERENCES Registered_User(Email),
    FOREIGN KEY (HelpDeskEmail) REFERENCES Help_Desk(HelpDeskEmail)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Orders(
    OrderID INTEGER PRIMARY KEY,
    Quantity INTEGER,
    DateCreated TEXT,
    ProductID INTEGER,
    TransactionID INTEGER,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (TransactionID) REFERENCES "Transaction"(TransactionID)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Review(
    ReviewID INTEGER PRIMARY KEY,
    DateCreated TEXT,
    Text TEXT,
    ProductID INTEGER,
    BuyerEmail TEXT,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (BuyerEmail) REFERENCES Buyer(BuyerEmail)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Address(
    address_id INTEGER PRIMARY KEY,
    zipcode INTEGER,
    street_num INTEGER,
    streetname TEXT,
    FOREIGN KEY (zipcode) REFERENCES Zipcode_Info(zipcode)
)
""")

conn.commit()
print("Tables created successfully!")

# ----------------------------------------
# CSV IMPORT FUNCTION
# ----------------------------------------

def import_csv(table_name, csv_file):
    print(f"Importing {csv_file} into {table_name}...")

    with open(csv_file, "r", newline="", encoding="utf-8") as file:
        reader = csv.reader(file)
        columns = next(reader)  # header row
        
        placeholders = ",".join(["?"] * len(columns))
        query = f"INSERT INTO {table_name} ({','.join(columns)}) VALUES ({placeholders})"

        for row in reader:
            cursor.execute(query, row)

    conn.commit()
    print(f"✔ Loaded {csv_file}")


# ----------------------------------------
# IMPORT IN CORRECT ORDER (FK safe)
# ----------------------------------------

import_csv("Category", "Category.csv")
import_csv("Tag", "Tag.csv")
import_csv("Zipcode_Info", "Zipcode_Info.csv")
import_csv("Help_Desk", "Help_Desk.csv")

import_csv("Registered_User", "Registered_User.csv")
import_csv("Business", "Business.csv")
import_csv("Seller", "Seller.csv")

import_csv("Buyer", "Buyer.csv")
import_csv("Product", "Product.csv")


import_csv('"Transaction"', "Transaction.csv")
import_csv("Orders", "Orders.csv")
import_csv("Review", "Review.csv")

import_csv("Credit_Cards", "Credit_Cards.csv")
import_csv("Ticket", "Ticket.csv")
import_csv("Address", "Address.csv")

print("\nALL CSV FILES IMPORTED SUCCESSFULLY!")
conn.close()
