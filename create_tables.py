import sqlite3
import csv
import os

print(os.getcwd())
#print(os.listdir())
os.chdir("CSVDataset")
print(os.getcwd())

db_file = "NLionBusiness.db"
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS Category(CategoryID int(50) , CategoryName varchar(255), PRIMARY KEY CategoryID)")
cursor.execute("CREATE TABLE IF NOT EXISTS Tag(TagID int(50), TagName varchar(255), PRIMARY KEY TagID)")
cursor.execute("CREATE TABLE IF NOT EXISTS Registered_User(UserID int(50), Email varchar(255), Password varchar(255), PRIMARY KEY UserID)")
cursor.execute("CREATE TABLE IF NOT EXISTS Business(BusinessID int(50), BusinessName varchar(255), BusinessEmail varchar(255), Phone varchar(20), PRIMARY KEY BusinessID)")
cursor.execute("CREATE TABLE IF NOT EXISTS Buyer(BuyerID int(50), StreetAddress varchar(255), Email varchar(255), Password varchar(255), FName varchar(255), LName varchar(255), RegistrationDate date, PRIMARY KEY BuyerID)")
cursor.execute("CREATE TABLE IF NOT EXISTS Help_Desk(HelpDeskID int(50), PhoneNumber varchar(255), PRIMARY KEY HelpDeskID)")
cursor.execute("CREATE TABLE IF NOT EXISTS Transaction(TransactionID int(50), Transaction_Date date, Total real, BuyerID int(50), PRIMARY KEY TransactionID)")

cursor.execute("CREATE TABLE IF NOT EXISTS Zipcode_Info(zipcode int(5), city varchar(255), state varchar(20), PRIMARY KEY zipcode)")
cursor.execute("CREATE TABLE IF NOT EXISTS Credit_Cards(credit_card_num varchar(20), card_type varchar(20), expire_month varchar(20), expire_year int(4), security_code(3), owner_email varchar(50))")

cursor.execute("CREATE TABLE IF NOT EXISTS Product(ProductID int(50), Name varchar(255), Description varchar(255), Quantity int(50), TagID (50), CategoryID (50), PRIMARY KEY ProductID, FOREIGN KEY TagID REFERENCES Tag(TagID), FOREIGN KEY CategoryID REFERENCES Category(CategoryID))")
cursor.execute("CREATE TABLE IF NOT EXISTS Seller(SellerID int(50), BusinessID int(50), UserID int(50), PRIMARY KEY SellerID, FOREIGN KEY BusinessID REFERENCES Business(BusinessID), FOREIGN KEY UserID REFERENCES Registered_User(UserID))")
cursor.execute("CREATE TABLE IF NOT EXISTS Product_Price(ProductID int(50), Name varchar(255), Description varchar(255), Quantity varchar(255), Price real, PRIMARY KEY ProductID, FOREIGN KEY ProductID REFERENCES Product(ProductID)")
cursor.execute("CREATE TABLE IF NOT EXISTS Ticket(TicketID int(50), Topic varchar(255), Date_Opened date, Description varchar(255), Status varchar(255), UserID int(50), HelpDeskID int(50), PRIMARY KEY TicketID, FOREIGN KEY UserID REFERENCES User(UserID), FOREIGN KEY HelpDeskID REFERENCES Help_Desk(HelpDeskID))")
cursor.execute("CREATE TABLE IF NOT EXISTS Order(OrderID int(50), Quantity int(50), DateCreated date, ProductID int(50), TransactionID int(50), PRIMARY KEY OrderID, FOREIGN KEY ProductID REFERENCES Product(ProductID), FOREIGN KEY TransactionID REFERENCES Transaction(TransactionID))")
cursor.execute("CREATE TABLE IF NOT EXISTS Review(ReviewID int(50), DateCreated date, Text varchar(255), ProductID int(50), BuyerID int(50), PRIMARY KEY ReviewID, FOREIGN KEY ProductID REFERENCES Product(ProductID), FOREIGN KEY BuyerID REFERENCES Buyers(BuyerID))")
cursor.execute("CREATE TABLE IF NOT EXISTS Address(address_id int(20), zipcode int(5), street_num int (10), streetname varchar(255), PRIMARY KEY address_id, FOREIGN KEY zipcode REFERENCES Zipcode_Info(zipcode))")


# Payment(PaymentID int(50), Method varchar(255), CardInfo varchar(255), TransactionID int(50), PRIMARY KEY PaymentID, FOREIGN KEY TransactionID REFERENCES Transaction(TransactionID))")