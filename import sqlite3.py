import sqlite3
import csv
import os

# -------------------------------
# 1. MOVE INTO CSVDataset FOLDER
# -------------------------------
print("Starting directory:", os.getcwd())
os.chdir("CSVDataset")
print("Now in:", os.getcwd())

# -------------------------------
# 2. CONNECT TO DATABASE
# -------------------------------
db_file = "../NLionBusiness.db"      # database is outside the folder
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# --------------------------------
# 3. CREATE TABLES
# --------------------------------

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
    UserID INTEGER PRIMARY KEY,
    Email TEXT,
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
    BuyerID INTEGER PRIMARY KEY,
    StreetAddress TEXT,
    Email TEXT,
    Password TEXT,
    FName TEXT,
    LName TEXT,
    RegistrationDate TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Help_Desk(
    HelpDeskID INTEGER PRIMARY KEY,
    PhoneNumber TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Transaction(
    TransactionID INTEGER PRIMARY KEY,
    Transaction_Date TEXT,
    Total REAL,
    BuyerID INTEGER,
    FOREIGN KEY (BuyerID) REFERENCES Buyer(BuyerID)
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
    owner_email TEXT
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
    FOREIGN KEY (TagID) REFERENCES Tag(TagID),
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Seller(
    SellerID INTEGER PRIMARY KEY,
    BusinessID INTEGER,
    UserID INTEGER,
    FOREIGN KEY (BusinessID) REFERENCES Business(BusinessID),
    FOREIGN KEY (UserID) REFERENCES Registered_User(UserID)
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
    UserID INTEGER,
    HelpDeskID INTEGER,
    FOREIGN KEY (UserID) REFERENCES Registered_User(UserID),
    FOREIGN KEY (HelpDeskID) REFERENCES Help_Desk(HelpDeskID)
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
    FOREIGN KEY (TransactionID) REFERENCES Transaction(TransactionID)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS Review(
    ReviewID INTEGER PRIMARY KEY,
    DateCreated TEXT,
    Text TEXT,
    ProductID INTEGER,
    BuyerID INTEGER,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (BuyerID) REFERENCES Buyer(BuyerID)
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


# --------------------------------
# 4. FUNCTION TO LOAD ANY CSV FILE
# --------------------------------

def load_csv(table_name, csv_file, column_count):
    print(f"Loading {csv_file} into {table_name}...")

    with open(csv_file, encoding="utf-8") as file:
        reader = csv.reader(file)
        next(reader)     # skip header

        placeholders = ",".join(["?"] * column_count)
        query = f"INSERT INTO {table_name} VALUES ({placeholders})"

        for row in reader:
            cursor.execute(query, row)

    conn.commit()
    print(f"✔ Loaded: {table_name}")


# --------------------------------
# 5. LOAD TABLES IN SAFE ORDER
# --------------------------------

load_csv("Category", "Category.csv", 2)
load_csv("Tag", "Tag.csv", 2)
load_csv("Zipcode_Info", "Zipcode_Info.csv", 3)
load_csv("Help_Desk", "Help_Desk.csv", 2)

load_csv("Registered_User", "Registered_User.csv", 3)
load_csv("Business", "Business.csv", 4)
load_csv("Buyer", "Buyer.csv", 7)
load_csv("Seller", "Seller.csv", 3)

load_csv("Product", "Product.csv", 6)
load_csv("Product_Price", "Product_Price.csv", 5)

load_csv("Transaction", "Transaction.csv", 4)
load_csv("Orders", "Orders.csv", 5)
load_csv("Review", "Review.csv", 5)

load_csv("Credit_Cards", "Credit_Cards.csv", 6)
load_csv("Address", "Address.csv", 4)
load_csv("Ticket", "Ticket.csv", 7)

# --------------------------------
# 6. DONE!
# --------------------------------
conn.close()
print("\nALL CSV DATA LOADED SUCCESSFULLY!")
