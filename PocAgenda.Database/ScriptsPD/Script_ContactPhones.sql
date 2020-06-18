SET IDENTITY_INSERT [dbo].[ContactPhones] ON;

INSERT INTO [dbo].[ContactPhones] ([Id], [ContactId], [PhoneTypeId], [PhoneNumber], [Code], [Address], [ZipCode])
VALUES (1, 1, 1, '1234567890', '845', NULL, NULL);

SET IDENTITY_INSERT [dbo].[ContactPhones] OFF;