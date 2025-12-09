

CREATE TABLE IF NOT EXISTS Category(
    CategoryID INTEGER PRIMARY KEY, 
    CategoryName TEXT,
    ParentCategoryID INTEGER,
    FOREIGN KEY ParentCategoryID REFERENCES Category(CategoryID)
)



CREATE TABLE IF NOT EXISTS Tag(
    TagID INTEGER PRIMARY KEY, 
    TagName TEXT
)



CREATE TABLE IF NOT EXISTS Registered_User(
    Email TEXT PRIMARY KEY,
    Password TEXT
)



CREATE TABLE IF NOT EXISTS Business(
    BusinessID INTEGER PRIMARY KEY,
    BusinessName TEXT,
    BusinessEmail TEXT,
    address_id INTEGER,
    Phone TEXT,
    FOREIGN KEY address_id REFERENCES Address(address_id)
)



CREATE TABLE IF NOT EXISTS Buyer(
    BuyerEmail TEXT PRIMARY KEY,
    StreetAddress TEXT,
    FName TEXT,
    LName TEXT,
    RegistrationDate TEXT
)


CREATE TABLE IF NOT EXISTS Help_Desk(
    HelpDeskEmail TEXT PRIMARY KEY,
    PhoneNumber TEXT,
    FORIEGN KEY HelpDeskEmail REFERENCES Registered_User(Email)
)



CREATE TABLE IF NOT EXISTS Transactions(
    TransactionID INTEGER PRIMARY KEY,
    Transaction_Date TEXT,
    Total REAL,
    email TEXT,
    FOREIGN KEY (email) REFERENCES Buyer(email)
)



CREATE TABLE IF NOT EXISTS Zipcode_Info(
    zipcode INTEGER PRIMARY KEY,
    city TEXT,
    state TEXT
)


CREATE TABLE IF NOT EXISTS Credit_Cards(
    credit_card_num TEXT PRIMARY KEY,
    card_type TEXT,
    expire_month TEXT,
    expire_year INTEGER,
    security_code TEXT,
    owner_email TEXT NOT NULL,
    FOREIGN KEY (owner_email) REFERENCES Registered_User(email)
)



CREATE TABLE IF NOT EXISTS Product(
    ProductID INTEGER PRIMARY KEY,
    Name TEXT,
    Description TEXT,
    Quantity INTEGER,
    TagID INTEGER,
    CategoryID INTEGER,
    Price REAL,
    BusinessID TEXT,
    FOREIGN KEY (BusinessID) REFERENCES Business(BusinessID) 
    FOREIGN KEY (TagID) REFERENCES Tag(TagID),
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
)


CREATE TABLE IF NOT EXISTS Seller(
    BusinessID INTEGER,
    UserEmail TEXT PRIMARY KEY,
    FOREIGN KEY (BusinessID) REFERENCES Business(BusinessID),
    FOREIGN KEY (UserEmail) REFERENCES Registered_User(Email)
)




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



CREATE TABLE IF NOT EXISTS Orders(
    OrderID INTEGER PRIMARY KEY,
    Quantity INTEGER,
    DateCreated TEXT,
    ProductID INTEGER,
    TransactionID INTEGER,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (TransactionID) REFERENCES Transactions(TransactionID)
)


CREATE TABLE IF NOT EXISTS Review(
    ReviewID INTEGER PRIMARY KEY,
    DateCreated TEXT,
    Text TEXT,
    ProductID INTEGER,
    BuyerEmail TEXT,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (BuyerEmail) REFERENCES Buyer(BuyerEmail)
)



CREATE TABLE IF NOT EXISTS Address(
    address_id INTEGER PRIMARY KEY,
    zipcode INTEGER,
    street_num INTEGER,
    streetname TEXT,
    FOREIGN KEY (zipcode) REFERENCES Zipcode_Info(zipcode)
)

