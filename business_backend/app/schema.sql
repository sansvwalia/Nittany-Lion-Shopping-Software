

CREATE TABLE IF NOT EXISTS Category(
    CategoryID INTEGER PRIMARY KEY, 
    CategoryName TEXT,
    ParentCategoryID INTEGER,
    FOREIGN KEY (ParentCategoryID) REFERENCES Category(CategoryID)
);


CREATE TABLE IF NOT EXISTS Zipcode_Info(
    zipcode INTEGER PRIMARY KEY,
    city TEXT NOT NULL,
    state TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Address(
    address_id INTEGER PRIMARY KEY,
    zipcode INTEGER NOT NULL,
    street_num INTEGER,
    streetname TEXT NOT NULL,
    FOREIGN KEY (zipcode) REFERENCES Zipcode_Info(zipcode)
);

CREATE TABLE IF NOT EXISTS Tag(
    TagID INTEGER PRIMARY KEY, 
    TagName TEXT NOT NULL
);



CREATE TABLE IF NOT EXISTS Registered_User(
    Email TEXT PRIMARY KEY,
    Password TEXT NOT NULL
);



CREATE TABLE IF NOT EXISTS Business(
    BusinessID INTEGER PRIMARY KEY,
    BusinessName TEXT NOT NULL,
    BusinessEmail TEXT,
    AccountBalance REAL DEFAULT 0,
    address_id INTEGER NOT NULL,
    Phone TEXT,
    FOREIGN KEY (address_id) REFERENCES Address(address_id)
);



CREATE TABLE IF NOT EXISTS Buyer(
    BuyerEmail TEXT PRIMARY KEY,
    address_id INTEGER NOT NULL,
    FName TEXT NOT NULL,
    LName TEXT NOT NULL,
    RegistrationDate TEXT,
    FOREIGN KEY (BuyerEmail) REFERENCES Registered_User(Email),
    FOREIGN KEY (address_id) REFERENCES Address(address_id)
);


CREATE TABLE IF NOT EXISTS Help_Desk(
    HelpDeskEmail TEXT PRIMARY KEY,
    PhoneNumber TEXT,
    FOREIGN KEY (HelpDeskEmail) REFERENCES Registered_User(Email)
);



CREATE TABLE IF NOT EXISTS Transactions(
    TransactionID INTEGER PRIMARY KEY,
    Transaction_Date TEXT,
    Total REAL DEFAULT 0,
    BuyerEmail TEXT NOT NULL,
    Status TEXT NOT NULL,
    FOREIGN KEY (BuyerEmail) REFERENCES Buyer(BuyerEmail)
);




CREATE TABLE IF NOT EXISTS Credit_Cards(
    credit_card_num TEXT PRIMARY KEY,
    card_type TEXT,
    expire_month TEXT,
    expire_year INTEGER,
    security_code TEXT,
    owner_email TEXT NOT NULL,
    FOREIGN KEY (owner_email) REFERENCES Registered_User(Email)
);



CREATE TABLE IF NOT EXISTS Product(
    ProductID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT,
    Quantity INTEGER DEFAULT 0,
    TagID INTEGER,
    CategoryID INTEGER NOT NULL,
    Price REAL DEFAULT 1,
    BusinessID INTEGER NOT NULL,
    FOREIGN KEY (BusinessID) REFERENCES Business(BusinessID),
    FOREIGN KEY (TagID) REFERENCES Tag(TagID),
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);


CREATE TABLE IF NOT EXISTS Seller(
    BusinessID INTEGER NOT NULL,
    UserEmail TEXT PRIMARY KEY,
    FOREIGN KEY (BusinessID) REFERENCES Business(BusinessID),
    FOREIGN KEY (UserEmail) REFERENCES Registered_User(Email)
);




CREATE TABLE IF NOT EXISTS Ticket(
    TicketID INTEGER PRIMARY KEY,
    Topic TEXT NOT NULL,
    Date_Opened TEXT,
    Description TEXT,
    Status TEXT NOT NULL,
    UserEmail TEXT NOT NULL,
    HelpDeskEmail TEXT NOT NULL,
    FOREIGN KEY (UserEmail) REFERENCES Registered_User(Email),
    FOREIGN KEY (HelpDeskEmail) REFERENCES Help_Desk(HelpDeskEmail)
);



CREATE TABLE IF NOT EXISTS Orders(
    OrderID INTEGER PRIMARY KEY,
    Quantity INTEGER NOT NULL DEFAULT 1,
    DateCreated TEXT,
    ProductID INTEGER NOT NULL,
    TransactionID INTEGER NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (TransactionID) REFERENCES Transactions(TransactionID)
);


CREATE TABLE IF NOT EXISTS Review(
    ReviewID INTEGER PRIMARY KEY,
    Rating INTEGER CHECK (Rating <= 5 AND Rating >0),
    DateCreated TEXT,
    Text TEXT,
    ProductID INTEGER NOT NULL,
    BuyerEmail TEXT NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (BuyerEmail) REFERENCES Buyer(BuyerEmail)
);





