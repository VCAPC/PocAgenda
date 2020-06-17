CREATE TABLE [dbo].[ContactPhones]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	[ContactId] INT NOT NULL, 
    [PhoneNumber] NVARCHAR(10) NOT NULL, 
    [Code] NCHAR(3) NULL, 
    [Address] NVARCHAR(128) NULL, 
    [ZipCode] NVARCHAR(5) NULL, 
    [PhoneTypeId] INT NOT NULL, 
    CONSTRAINT [PK_ContactPhones] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ContactPhones_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contacts]([Id]), 
    CONSTRAINT [UK_ContactPhones_ContactId_PhoneTypeId] UNIQUE ([ContactId], [PhoneTypeId])
);