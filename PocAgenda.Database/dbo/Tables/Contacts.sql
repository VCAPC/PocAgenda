CREATE TABLE [dbo].[Contacts]
(
	[Id] INT NOT NULL IDENTITY(1,1),
    [FirstName] NVARCHAR(64) NOT NULL, 
    [MiddleName] NVARCHAR(64) NULL, 
    [LastName] NVARCHAR(128) NOT NULL,
	[UserId] NVARCHAR(450) NOT NULL, 
    CONSTRAINT [PK_Contacts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Contacts_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id])
);
