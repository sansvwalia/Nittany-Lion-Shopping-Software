import sqlite3
import csv
import os


APP_DIR = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
DATABASE = os.path.join(APP_DIR, "database", "NLionBusiness.db")
CSV = os.path.join(APP_DIR, "database", "csv_files")
SCHEMA = os.path.join(APP_DIR, "schema.sql")


print("Starting directory:", os.getcwd())



db_file = DATABASE
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Move into CSV folder
os.chdir(CSV)
print("Now in:", os.getcwd())

# ---------------------------
# CREATE TABLES
# ---------------------------

# Read the .sql file
with open(SCHEMA, "r") as f:
    sql_script = f.read()

# Execute the SQL script
cursor.executescript(sql_script)


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


import_csv('Transactions', "Transactions.csv")
import_csv("Orders", "Orders.csv")
import_csv("Review", "Review.csv")

import_csv("Credit_Cards", "Credit_Cards.csv")
import_csv("Ticket", "Ticket.csv")
import_csv("Address", "Address.csv")

print("\nALL CSV FILES IMPORTED SUCCESSFULLY!")
conn.close()
